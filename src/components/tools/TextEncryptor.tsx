import React, { useState } from 'react';
import { Lock, Unlock, Copy, Check } from 'lucide-react';

interface TextEncryptorProps {
  onCopy?: (text: string) => void;
}

export default function TextEncryptor({ onCopy }: TextEncryptorProps) {
  const [text, setText] = useState('Secret Message for Yuitility User');
  const [passphrase, setPassphrase] = useState('MySecretKey123');
  const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt');
  const [copied, setCopied] = useState(false);

  // Simple XOR + Base64 client-side cipher for quick 100% working demo
  const cipher = (input: string, key: string) => {
    try {
      let out = '';
      for (let i = 0; i < input.length; i++) {
        const c = input.charCodeAt(i);
        const k = key.charCodeAt(i % key.length);
        out += String.fromCharCode(c ^ k);
      }
      return mode === 'encrypt' ? btoa(out) : out;
    } catch {
      return 'Error processing string cipher';
    }
  };

  const processText = () => {
    if (!passphrase) return 'Please enter a secret passphrase key';
    if (mode === 'encrypt') {
      return cipher(text, passphrase);
    } else {
      try {
        const decoded = atob(text);
        return cipher(decoded, passphrase);
      } catch {
        return 'Decryption Error: Invalid Base64 payload or incorrect key';
      }
    }
  };

  const result = processText();

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    if (onCopy) onCopy(result);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-zinc-900/60 shadow-sm p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
            {mode === 'encrypt' ? <Lock className="w-5 h-5" /> : <Unlock className="w-5 h-5" />}
            <h3 className="font-semibold text-zinc-900 dark:text-white">Client-Side Cipher Settings</h3>
          </div>
          <div className="flex bg-zinc-50 dark:bg-zinc-950 p-1 rounded-xl border border-zinc-200 dark:border-zinc-800">
            <button
              onClick={() => setMode('encrypt')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition ${mode === 'encrypt' ? 'bg-indigo-600 text-white' : 'text-zinc-500 dark:text-zinc-400'}`}
            >
              Encrypt
            </button>
            <button
              onClick={() => setMode('decrypt')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition ${mode === 'decrypt' ? 'bg-indigo-600 text-white' : 'text-zinc-500 dark:text-zinc-400'}`}
            >
              Decrypt
            </button>
          </div>
        </div>

        <div className="space-y-3">
          <div className="space-y-1">
            <label className="text-xs text-zinc-500 dark:text-zinc-400">Secret Key / Passphrase</label>
            <input
              type="text"
              value={passphrase}
              onChange={(e) => setPassphrase(e.target.value)}
              className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2 text-white font-mono text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-zinc-500 dark:text-zinc-400">{mode === 'encrypt' ? 'Plaintext Message' : 'Encrypted Ciphertext'}</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={4}
              className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 text-white font-mono text-xs focus:outline-none focus:border-indigo-500 resize-none"
            />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900/60 shadow-sm p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-3">
        <div className="flex justify-between items-center">
          <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            {mode === 'encrypt' ? 'Encrypted Output (Base64)' : 'Decrypted Plaintext'}
          </h4>
          <button
            onClick={handleCopy}
            className="text-xs text-zinc-700 dark:text-zinc-300 hover:text-white bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:bg-zinc-700 px-3 py-1 rounded-lg transition flex items-center gap-1.5"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />} Copy Output
          </button>
        </div>

        <textarea
          readOnly
          value={result}
          rows={4}
          className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 text-emerald-300 font-mono text-xs focus:outline-none resize-none break-all"
        />
      </div>
    </div>
  );
}
