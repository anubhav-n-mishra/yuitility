"""Read-only public HTML audit; four workers, only site sitemap URLs and internal links."""
import concurrent.futures, collections, csv, hashlib, json, pathlib, re, time
import urllib.request, urllib.error, urllib.parse, xml.etree.ElementTree as ET
from html.parser import HTMLParser

ROOT=pathlib.Path(__file__).parent
BASE='https://www.yuitility.app'
class Page(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.meta={}; self.links=[]; self.images=[]; self.scripts=[]; self.schemas=[]; self.headings=[]; self.title=''; self.text=[]; self.stack=[]; self.cap=None; self.buf=[]; self.skip=0
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if tag=='meta': self.meta[a.get('name',a.get('property',''))]=a.get('content','')
        if tag=='link' and a.get('rel')=='canonical': self.canonical=a.get('href')
        if tag=='a' and a.get('href'): self.links.append(a['href'])
        if tag=='img': self.images.append(a)
        if tag=='script' and a.get('src'): self.scripts.append(a['src'])
        if tag in ('script','style'): self.skip+=1
        if tag=='script' and a.get('type')=='application/ld+json': self.cap='json';self.buf=[]
        elif tag=='title' or re.fullmatch('h[1-6]',tag): self.cap=tag;self.buf=[]
    def handle_endtag(self,tag):
        if self.cap and (tag==self.cap or (self.cap=='json' and tag=='script')):
            s=' '.join(''.join(self.buf).split())
            if self.cap=='json':
                try:self.schemas.append(json.loads(s))
                except Exception:self.schemas.append({'parseError':s[:200]})
            elif self.cap=='title':self.title=s
            else:self.headings.append([tag,s])
            self.cap=None;self.buf=[]
        if tag in ('script','style'):self.skip=max(0,self.skip-1)
    def handle_data(self,s):
        if self.cap:self.buf.append(s)
        if not self.skip:self.text.append(s)

def fetch(url,save=True):
    start=time.monotonic()
    try:
        req=urllib.request.Request(url,headers={'User-Agent':'YuitilityOwnerSEOAudit/1.0','Accept':'text/html,application/xml,text/plain'})
        try:r=urllib.request.urlopen(req,timeout=35)
        except urllib.error.HTTPError as e:r=e
        data=r.read(); headers=dict(r.headers); raw=data.decode('utf-8','replace')
        result={'url':url,'finalUrl':r.url,'status':r.status,'bytes':len(data),'seconds':round(time.monotonic()-start,3),'headers':headers}
        if 'text/html' in r.headers.get('Content-Type',''):
            p=Page();p.feed(raw)
            result.update(title=p.title,description=p.meta.get('description',''),canonical=getattr(p,'canonical',None),robots=p.meta.get('robots',''),googlebot=p.meta.get('googlebot',''),headings=p.headings,meta=p.meta,images=p.images,scripts=p.scripts,schemas=p.schemas,links=sorted(set(p.links)),words=len(' '.join(p.text).split()),text=' '.join(' '.join(p.text).split()))
        if save:
            name=urllib.parse.urlparse(url).path.strip('/').replace('/','__') or 'home'
            (ROOT/'html').mkdir(exist_ok=True)
            (ROOT/'html'/f'{name}.html').write_text(raw,encoding='utf8')
        return result
    except Exception as e:return {'url':url,'error':str(e)}

if __name__=='__main__':
    sitemap=ET.parse(ROOT/'sitemap.xml')
    urls=[e.text for e in sitemap.iter() if e.tag.endswith('}loc')]
    print(f'Crawling {len(urls)} sitemap URLs with 4 workers',flush=True)
    results=[]
    with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
        for i,r in enumerate(pool.map(fetch,urls)):
            results.append(r)
            if (i+1)%40==0:print(f'Completed {i+1}/{len(urls)}',flush=True)
    (ROOT/'crawl.json').write_text(json.dumps(results,indent=2,ensure_ascii=False),encoding='utf8')
    fields=['url','finalUrl','status','title','description','canonical','robots','googlebot','bytes','seconds','words','error']
    with (ROOT/'url-inventory.csv').open('w',newline='',encoding='utf-8-sig') as f:
        w=csv.DictWriter(f,fields,extrasaction='ignore');w.writeheader();w.writerows(results)
    issues={'sitemapCount':len(urls),'statuses':dict(collections.Counter(str(r.get('status',r.get('error'))) for r in results))}
    for key in ['title','description','canonical']:
        groups=collections.defaultdict(list)
        for r in results:groups[r.get(key,'')].append(r['url'])
        issues['duplicate_'+key]={k:v for k,v in groups.items() if len(v)>1}
    issues['nonSelfCanonical']=[{k:r.get(k) for k in ['url','canonical']} for r in results if r.get('canonical')!=r['url']]
    issues['noindex']=[r['url'] for r in results if 'noindex' in r.get('robots','')]
    issues['h1Anomalies']=[{'url':r['url'],'h1':[h[1] for h in r.get('headings',[]) if h[0]=='h1']} for r in results if len([h for h in r.get('headings',[]) if h[0]=='h1'])!=1]
    issues['missingAlt']=[{'url':r['url'],'images':[im for im in r.get('images',[]) if 'alt' not in im]} for r in results if any('alt' not in im for im in r.get('images',[]))]
    issues['longTitles']=[{'url':r['url'],'length':len(r.get('title','')),'title':r.get('title')} for r in results if len(r.get('title',''))>60]
    known=set(urls); inbound=collections.defaultdict(set); extra=set()
    for r in results:
        for href in r.get('links',[]):
            u=urllib.parse.urldefrag(urllib.parse.urljoin(r['url'],href))[0]
            if u.startswith(BASE+'/'):
                inbound[u].add(r['url'])
                if u not in known:extra.add(u)
    issues['orphanInSitemapCrawl']=[u for u in urls if not inbound[u]]
    issues['extraInternalUrls']=sorted(extra)
    issues['inboundCounts']={u:len(inbound[u]) for u in urls}
    (ROOT/'summary.json').write_text(json.dumps(issues,indent=2,ensure_ascii=False),encoding='utf8')
    print(json.dumps({k:v for k,v in issues.items() if k not in ['inboundCounts','longTitles','extraInternalUrls']},indent=2),flush=True)
