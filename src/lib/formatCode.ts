/** Parser-backed transformations. Never strip comments with regexes inside strings. */
export async function formatCode(code: string, language: 'js'|'css'|'html', mode: 'minify'|'beautify'): Promise<string> {
  if(mode==='beautify') {
    const prettier=await import('prettier/standalone');
    if(language==='js') {
      const babel=await import('prettier/plugins/babel');
      const estree=await import('prettier/plugins/estree');
      return prettier.format(code,{parser:'babel',plugins:[babel,estree]});
    }
    if(language==='css') {
      const postcss=await import('prettier/plugins/postcss');
      return prettier.format(code,{parser:'css',plugins:[postcss]});
    }
    const html=await import('prettier/plugins/html');
    return prettier.format(code,{parser:'html',plugins:[html],htmlWhitespaceSensitivity:'strict'});
  }
  if(language==='js') {
    const {minify}=await import('terser');
    const result=await minify(code,{compress:false,mangle:false,format:{comments:false}});
    return result.code||'';
  }
  if(language==='css') {
    const css=await import('css-tree');
    const ast=css.parse(code,{positions:false});
    return css.generate(ast);
  }
  // HTML whitespace can be visible, particularly inline/pre/script/style content.
  // Preserve it; this conservative mode removes only an outer BOM.
  return code.replace(/^\uFEFF/,'');
}
