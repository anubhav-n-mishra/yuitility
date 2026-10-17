/** Bounded arithmetic parser; no JavaScript evaluation or source substitution. */
export function evaluateExpression(source: string, radians = true): number {
  if(source.length>4096) throw new RangeError('Expression too long');
  const text=source.replace(/×/g,'*').replace(/÷/g,'/');
  const tokens:string[]=[];
  const token=/\s*(?:(\d*\.?\d+(?:[eE][+-]?\d+)?)|([a-zA-Z]+|π|φ)|(\*\*|[+\-*/^%!(),]))/y;
  let position=0;
  while(position<text.length){
    if(!text.slice(position).trim())break;
    token.lastIndex=position;const match=token.exec(text);
    if(!match)throw new Error('Invalid expression');
    tokens.push(match[1]||match[2]||match[3]);position=token.lastIndex;
    if(tokens.length>1000)throw new RangeError('Expression too long');
  }
  let i=0,depth=0;
  const angle=(v:number)=>radians?v:v*Math.PI/180;
  const inverse=(v:number)=>radians?v:v*180/Math.PI;
  const functions:Record<string,(...args:number[])=>number>={
    sin:x=>Math.sin(angle(x)),cos:x=>Math.cos(angle(x)),tan:x=>Math.tan(angle(x)),
    asin:x=>inverse(Math.asin(x)),acos:x=>inverse(Math.acos(x)),atan:x=>inverse(Math.atan(x)),
    sinh:Math.sinh,cosh:Math.cosh,tanh:Math.tanh,log:Math.log10,ln:Math.log,
    sqrt:Math.sqrt,cbrt:Math.cbrt,abs:Math.abs,pow:Math.pow,exp:Math.exp,
  };
  const constants:Record<string,number>={pi:Math.PI,'π':Math.PI,e:Math.E,'φ':(1+Math.sqrt(5))/2};
  function atom():number{
    if(++depth>128)throw new RangeError('Expression too deeply nested');
    const current=tokens[i++];let result:number;
    if(current==='('){result=sum();if(tokens[i++]!==')')throw new Error('Missing closing parenthesis');}
    else if(current&&/^\d|^\./.test(current))result=Number(current);
    else if(Object.hasOwn(constants,current))result=constants[current];
    else if(Object.hasOwn(functions,current)){
      if(tokens[i++]!=='(')throw new Error('Function needs parentheses');
      const args=[sum()];while(tokens[i]===','){i++;args.push(sum());}
      if(tokens[i++]!==')'||args.length!==(current==='pow'?2:1))throw new Error('Invalid function arguments');
      result=functions[current](...args);
    }else throw new Error('Expected a number');
    depth--;return result;
  }
  function postfix():number{
    let value=atom();
    while(tokens[i]==='!'||tokens[i]==='%'){
      if(tokens[i++]==='%')value/=100;
      else{
        if(!Number.isInteger(value)||value<0||value>170)throw new RangeError('Factorial needs an integer from 0 to 170');
        let factorial=1;for(let k=2;k<=value;k++)factorial*=k;value=factorial;
      }
    }
    return value;
  }
  function power():number{const value=postfix();if(tokens[i]==='**'||tokens[i]==='^'){i++;return value**unary();}return value;}
  function unary():number{if(tokens[i]==='+'){i++;return unary();}if(tokens[i]==='-'){i++;return -unary();}return power();}
  function product():number{
    let value=unary();
    while(i<tokens.length){
      if(tokens[i]==='*'){i++;value*=unary();}
      else if(tokens[i]==='/'){i++;value/=unary();}
      else if(tokens[i]==='(' || /^[\da-zA-Zπφ.]/.test(tokens[i]))value*=unary();
      else break;
    }
    return value;
  }
  function sum():number{let value=product();while(tokens[i]==='+'||tokens[i]==='-'){const op=tokens[i++];const next=product();value=op==='+'?value+next:value-next;}return value;}
  const result=sum();if(i!==tokens.length||!Number.isFinite(result))throw new Error('Undefined or invalid result');return result;
}
