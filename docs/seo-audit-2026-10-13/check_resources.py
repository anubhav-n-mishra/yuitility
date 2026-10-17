import collections, concurrent.futures, json, pathlib, urllib.request, urllib.error, urllib.parse, time
from crawl import fetch, BASE, ROOT

def resource(url):
    try:
        req=urllib.request.Request(url,headers={'User-Agent':'YuitilityOwnerSEOAudit/1.0','Accept-Encoding':'gzip'})
        try:r=urllib.request.urlopen(req,timeout=30)
        except urllib.error.HTTPError as e:r=e
        b=r.read()
        return {'url':url,'finalUrl':r.url,'status':r.status,'transferredBytes':len(b),'headers':dict(r.headers)}
    except Exception as e:return {'url':url,'error':str(e)}

pages=json.loads((ROOT/'crawl.json').read_text(encoding='utf8'))
summary=json.loads((ROOT/'summary.json').read_text(encoding='utf8'))
extras=summary['extraInternalUrls']+[BASE+'/robots.txt',BASE+'/rss.xml',BASE+'/manifest.webmanifest',BASE+'/seo-audit-nonexistent-20261013',BASE+'/tools/seo-audit-nonexistent-20261013']
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool: results=list(pool.map(fetch,extras))
(ROOT/'extra-pages.json').write_text(json.dumps(results,indent=2,ensure_ascii=False),encoding='utf8')
print('Additional internal URLs:',len(results),'statuses:',dict(collections.Counter(str(r.get('status',r.get('error'))) for r in results)),flush=True)
print('Unexpected errors:',[r for r in results if r.get('status')!=200 and 'nonexistent' not in r['url']],flush=True)
assets=set()
for p in pages:
    assets.update(urllib.parse.urljoin(BASE,s) for s in p['scripts'])
    assets.update(urllib.parse.urljoin(BASE,x['src']) for x in p['images'] if x.get('src') and not x['src'].startswith('data:'))
    for key in ['og:image','twitter:image']:
        if p['meta'].get(key):assets.add(urllib.parse.urljoin(BASE,p['meta'][key]))
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool: sizes=list(pool.map(resource,sorted(assets)))
(ROOT/'resources.json').write_text(json.dumps(sizes,indent=2),encoding='utf8')
print('Assets:',len(sizes),'statuses:',dict(collections.Counter(str(r.get('status',r.get('error'))) for r in sizes)),flush=True)
print('Broken assets:',[{k:r.get(k) for k in ['url','status','error']} for r in sizes if r.get('status')!=200],flush=True)
sizeByUrl={r['url']:r.get('transferredBytes',0) for r in sizes}
for slug in ['/','/tools/standard-calculator','/tools/word-counter','/tools/mortgage-calculator/va-loan','/blog']:
    p=next(p for p in pages if p['url']==BASE+slug)
    print('INITIAL JS',slug,len(p['scripts']),sum(sizeByUrl.get(urllib.parse.urljoin(BASE,s),0) for s in set(p['scripts'])),flush=True)
print('Largest JS',[{k:r.get(k) for k in ['url','transferredBytes']} for r in sorted(sizes,key=lambda r:r.get('transferredBytes',0),reverse=True) if '.js' in r['url']][:8],flush=True)
