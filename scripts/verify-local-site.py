"""Read-only production-preview crawl. Run after next build and next start on port 3100."""
import argparse, collections, concurrent.futures, gzip, importlib.util, json, pathlib, re
import urllib.request, urllib.error, urllib.parse, xml.etree.ElementTree as ET

ROOT = pathlib.Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location('audit_page', ROOT / 'docs/seo-audit-2026-10-13/crawl.py')
audit = importlib.util.module_from_spec(spec)
spec.loader.exec_module(audit)
parser=argparse.ArgumentParser()
parser.add_argument('--base',default='http://127.0.0.1:3100')
parser.add_argument('--out',default='docs/seo-remediation-2026-10-14')
args=parser.parse_args()
BASE = args.base.rstrip('/')
OUT = ROOT / args.out
OUT.mkdir(exist_ok=True)
def get(path):
    url = BASE + path
    try:
        r = urllib.request.urlopen(urllib.request.Request(url, headers={'Accept-Encoding': 'gzip'}), timeout=30)
    except urllib.error.HTTPError as e:
        r = e
    data = r.read()
    raw = gzip.decompress(data) if r.headers.get('Content-Encoding') == 'gzip' else data
    return {'path': path, 'status': r.status, 'bytes': len(data), 'headers': dict(r.headers)}, raw

sitemap = ET.fromstring(get('/sitemap.xml')[1])
paths = [urllib.parse.urlparse(e.text).path for e in sitemap.iter() if e.tag.endswith('}loc')]
def page(path):
    r, body = get(path)
    p = audit.Page(); p.feed(body.decode())
    r.update(title=p.title, description=p.meta.get('description'), canonical=getattr(p,'canonical',None),
             h1=[s for t,s in p.headings if t=='h1'], robots=p.meta.get('robots'),
             schemasValid=all('parseError' not in s for s in p.schemas), scripts=p.scripts, links=p.links)
    return r
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
    pages = list(pool.map(page,paths))
errors = []
for p in pages:
    expected = 'https://www.yuitility.app' + (p['path'] if p['path']!='/' else '')
    if p['status']!=200 or not p['title'] or not p['description'] or len(p['h1'])!=1 or not p['schemasValid'] or 'noindex' in (p['robots'] or '') or p['canonical']!=expected:
        errors.append(p)
duplicates = {field:[v for v,n in collections.Counter(p[field] for p in pages).items() if n>1] for field in ['title','description','canonical']}
assets = sorted(set(s for p in pages for s in p['scripts'] if s.startswith('/')))
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
    resources = list(pool.map(lambda s:get(s)[0], assets))
sizes = {r['path']:r['bytes'] for r in resources}
initial_js = {p['path']:sum(sizes[s] for s in set(p['scripts'])) for p in pages if p['path'] in ['/','/tools/standard-calculator','/tools/salary-calculator','/tools/mortgage-calculator/va-loan']}
rss = ET.fromstring(get('/rss.xml')[1])
embeds = [get('/embed/standard-calculator')[0],get('/embed/mortgage-calculator/va-loan')[0]]
# Read the actual deployed CSS references rather than guess font filenames.
html=get('/')[1].decode(); css=re.findall(r'href="([^"?]+\.css)[^"]*"',html)
fonts=set()
for csspath in css:
    content=get(csspath)[1].decode()
    for f in re.findall(r'url\([\"\']?([^\)\"\']+\.woff2?)[\"\']?\)',content):
        fonts.add(urllib.parse.urlparse(urllib.parse.urljoin(BASE+csspath,f)).path)
font_results=[get(f)[0] for f in sorted(fonts)]
summary={'pages':len(pages),'statuses':dict(collections.Counter(p['status'] for p in pages)), 'errors':errors,'duplicates':duplicates,
         'scripts':len(resources),'brokenScripts':[r for r in resources if r['status']!=200], 'initialScriptGzipBytes':initial_js,
         'rssItems':len(rss.findall('./channel/item')), 'embeds':embeds,'fonts':font_results,
         'notFound':get('/tools/nonexistent-remediation-test')[0]['status']}
(OUT/'http-checks.json').write_text(json.dumps(summary,indent=2),encoding='utf8')
(OUT/'pages.json').write_text(json.dumps(pages,indent=2),encoding='utf8')
print(json.dumps(summary,indent=2))
assert not errors and not any(duplicates.values()) and not summary['brokenScripts']
assert all(r['status']==200 for r in font_results) and font_results
assert summary['notFound']==404 and summary['rssItems']==23
for r in embeds:
    headers={k.lower():v for k,v in r['headers'].items()}
    assert r['status']==200 and 'x-frame-options' not in headers
    assert headers['content-security-policy']=='frame-ancestors *' and 'noindex' in headers['x-robots-tag']
