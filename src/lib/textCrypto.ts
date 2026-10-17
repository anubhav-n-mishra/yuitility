const ITERATIONS = 600_000;
const encode = (bytes: Uint8Array) => { let binary = ''; for (const byte of bytes) binary += String.fromCharCode(byte); return btoa(binary); };
const decode = (text: string) => Uint8Array.from(atob(text), c => c.charCodeAt(0));
async function keyFor(password: string, salt: Uint8Array<ArrayBuffer>) {
  const material = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveKey']);
  return crypto.subtle.deriveKey({name:'PBKDF2',salt,iterations:ITERATIONS,hash:'SHA-256'}, material, {name:'AES-GCM',length:256}, false, ['encrypt','decrypt']);
}
export async function encryptText(text: string, password: string) {
  if (password.length < 12) throw new Error('Use a passphrase of at least 12 characters. Length alone does not guarantee strength.');
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await keyFor(password, salt);
  const ciphertext = await crypto.subtle.encrypt({name:'AES-GCM',iv},key,new TextEncoder().encode(text));
  return JSON.stringify({v:1,alg:'AES-256-GCM',kdf:'PBKDF2-SHA256',iterations:ITERATIONS,salt:encode(salt),iv:encode(iv),data:encode(new Uint8Array(ciphertext))});
}
export async function decryptText(payload: string, password: string) {
  try {
    const parsed = JSON.parse(payload);
    if (parsed.v !== 1 || parsed.alg !== 'AES-256-GCM' || parsed.kdf !== 'PBKDF2-SHA256' || parsed.iterations !== ITERATIONS) throw new Error();
    const salt = decode(parsed.salt), iv = decode(parsed.iv), data = decode(parsed.data);
    if (salt.length !== 16 || iv.length !== 12 || data.length < 16) throw new Error();
    const key = await keyFor(password,salt);
    const clear = await crypto.subtle.decrypt({name:'AES-GCM',iv},key,data);
    return new TextDecoder('utf-8',{fatal:true}).decode(clear);
  } catch { throw new Error('Cannot decrypt: wrong passphrase, damaged data or an unsupported format. Legacy XOR output is not supported.'); }
}
