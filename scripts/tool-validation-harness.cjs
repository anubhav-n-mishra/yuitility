// Evaluates the production component's calculations with named input states.
// This is a logic harness, not a substitute for React/browser integration tests.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const root = path.resolve(__dirname, '..');

function inspectTool(component, overrides = {}, props = {}, environment = {}) {
  let captured, states = {}, effects = [];
  const hooks = {
    useState: initial => [typeof initial === 'function' ? initial() : initial, () => {}],
    useMemo: fn => fn(), useCallback: fn => fn, useEffect: fn => {effects.push(fn);},
    useRef: value => ({current:value}), useId: () => 'validation-id', useTransition:()=>[false,fn=>fn()],
  };
  hooks.default = hooks;
  const cache = new Map();
  const nothing = new Proxy(function(){}, {get: (_, key) => key === '__esModule' ? false : nothing});
  function load(filename, instrument = false) {
    if (cache.has(filename)) return cache.get(filename).exports;
    const module = {exports:{}}; cache.set(filename, module);
    const source = fs.readFileSync(filename, 'utf8');
    const transform = context => sourceFile => {
      const f = context.factory;
      function visit(node) {
        if (instrument && ts.isFunctionDeclaration(node) && node.modifiers?.some(m => m.kind === ts.SyntaxKind.DefaultKeyword) && node.body) {
          const names = [];
          const statements = node.body.statements.map(statement => {
            if (ts.isVariableStatement(statement)) for (const declaration of statement.declarationList.declarations) {
              if (ts.isIdentifier(declaration.name)) names.push(declaration.name.text);
              else if (ts.isArrayBindingPattern(declaration.name) || ts.isObjectBindingPattern(declaration.name)) {
                names.push(...declaration.name.elements.filter(ts.isBindingElement).map(e => e.name.getText(sourceFile)));
              }
            }
            return ts.visitEachChild(statement, inner, context);
          });
          function inner(child) {
            if (ts.isVariableDeclaration(child) && ts.isArrayBindingPattern(child.name) && child.initializer && ts.isCallExpression(child.initializer) && child.initializer.expression.getText(sourceFile).match(/(?:^|\.)useState$/)) {
              const name = child.name.elements[0].name.text;
              return f.updateVariableDeclaration(child, child.name, child.exclamationToken, child.type,
                f.createCallExpression(f.createIdentifier('__namedState'), undefined, [f.createStringLiteral(name), ...child.initializer.arguments]));
            }
            return ts.visitEachChild(child, inner, context);
          }
          const capture = f.createExpressionStatement(f.createCallExpression(f.createIdentifier('__capture'), undefined,
            [f.createObjectLiteralExpression(names.map(name => f.createShorthandPropertyAssignment(name)))]));
          // Replace only top-level JSX return: callbacks retain their genuine bodies.
          const returnIndex = statements.findIndex(s => ts.isReturnStatement(s));
          if (returnIndex >= 0) statements.splice(returnIndex, 0, capture);
          return f.updateFunctionDeclaration(node,node.modifiers,node.asteriskToken,node.name,node.typeParameters,node.parameters,node.type,f.updateBlock(node.body,statements));
        }
        return ts.visitEachChild(node, visit, context);
      }
      return ts.visitNode(sourceFile,visit);
    };
    const compiled = ts.transpileModule(source, {fileName:filename, compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX,esModuleInterop:true},transformers:{before:[transform]}}).outputText;
    const requireLocal = id => {
      if (id === 'react') return hooks;
      if (id === 'react/jsx-runtime') return {jsx:(type,props)=>({type,props}),jsxs:(type,props)=>({type,props}),Fragment:'fragment'};
      if (/lucide|motion|next\//.test(id) || id.includes('/components/') && !id.endsWith('CalculatorFields')) return nothing;
      if (id.startsWith('.') || id.startsWith('@/')) {
        let target = id.startsWith('@/') ? path.join(root,id.slice(2)) : path.resolve(path.dirname(filename),id);
        target = ['', '.ts','.tsx','.js','.json'].map(ext=>target+ext).find(p=>fs.existsSync(p)&&fs.statSync(p).isFile());
        if (!target) throw new Error('Unresolved '+id);
        return target.endsWith('.json') ? JSON.parse(fs.readFileSync(target,'utf8')) : load(target);
      }
      return require(id);
    };
    const context = {module,exports:module.exports,require:requireLocal,console,Buffer,URL,TextEncoder,TextDecoder,crypto:globalThis.crypto,Blob,File:globalThis.File,
      btoa,atob,structuredClone,setTimeout:()=>0,clearTimeout:()=>{},setInterval:()=>0,clearInterval:()=>{},
      window:{innerWidth:1280},navigator:{},document:{},
      ...environment,
      __namedState:(name,initial)=>{
        const value = Object.hasOwn(states,name) ? states[name] : Object.hasOwn(overrides,name) ? overrides[name] : typeof initial === 'function' ? initial() : initial;
        states[name]=value;
        return [value,next=>{states[name]=typeof next==='function'?next(states[name]):next;}];
      }, __capture:value=>{captured=value;},};
    // Use one JS realm: pdf-lib validates Array instances and rejects cross-realm
    // arrays. This executes trusted repository code, not a security sandbox.
    const execute=vm.compileFunction(compiled,Object.keys(context),{filename});
    execute(...Object.values(context));
    return module.exports;
  }
  const mod=load(path.join(root,'src/components/tools',component+'.tsx'),true);
  const commonProps={onCopy:()=>{},onShare:()=>{},onTriggerShareToast:()=>{},...props};
  const render=()=>{const tree=mod.default(commonProps);return {values:captured,tree,states};};
  return {...render(), render, runEffects:async()=>{const current=effects;effects=[];for(const effect of current)await effect();return render();},set:(name,value)=>{delete overrides[name];states[name]=value;return render();}};
}
module.exports={inspectTool};
if (require.main === module) {
  const components=process.argv.slice(2);
  for(const name of components)try {
    const r=inspectTool(name);
    console.log(name,JSON.stringify(r.values,(key,value)=>typeof value==='function'?'[function]':typeof value==='bigint'?value.toString():value));
  }catch(error){console.log(name,'ERROR',error.message);}
}
