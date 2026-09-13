import React, { useState } from 'react';
import { KeyRound, ShieldAlert, Copy, Check } from 'lucide-react';

interface JwtDecoderProps {
  onCopy?: (text: string) => void;
}

export default function JwtDecoder({ onCopy }: JwtDecoderProps) {
  const [jwt, setJwt] = useState("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFudWJoYXYgTWlzaHJhIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const decodeJwt = () => {
    try {
      const parts = jwt.trim().split('.');
      if (parts.length !== 3) {
        return { error: 'Invalid JWT format: A valid JWT must contain 3 parts separated by dots.' };
      }

      const header = JSON.parse(atob(parts[0].replace(/-/g, '+').replace(/_/g, '/')));
      const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));

      return { header, payload, signature: parts[2] };
    } catch {
      return { error: 'Error decoding JWT payload: Invalid Base64 or JSON structure.' };
    }
  };

  const res = decodeJwt();

  const handleCopy = (data: any, key: string) => {
    const val = typeof data === 'string' ? data : JSON.stringify(data, null, 2);
    navigator.clipboard.writeText(val);
    setCopiedKey(key);
    if (onCopy) onCopy(val);
    setTimeout(() => setCopiedKey(null), 1800);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-zinc-900/60 shadow-sm p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
            <KeyRound className="w-5 h-5" />
            <h3 className="font-semibold text-zinc-900 dark:text-white">Encoded Token Input</h3>
          </div>
          <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
            🔒 Decoded 100% locally in browser tab
          </span>
        </div>
        <textarea
          value={jwt}
          onChange={(e) => setJwt(e.target.value)}
          rows={4}
          placeholder="Paste JWT string here..."
          className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 text-white font-mono text-xs focus:outline-none focus:border-indigo-500 resize-none break-all"
        />
      </div>

      {res.error ? (
        <div className="bg-rose-950/40 p-4 rounded-xl border border-rose-800 text-rose-300 text-xs flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 shrink-0" /> {res.error}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-zinc-900/60 shadow-sm p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-3">
            <div className="flex justify-between items-center">
              <h4 className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">Header</h4>
              <button
                onClick={() => handleCopy(res.header, 'header')}
                className="p-1.5 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:bg-zinc-700 rounded-lg text-zinc-700 dark:text-zinc-300 transition"
              >
                {copiedKey === 'header' ? <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            <pre className="bg-zinc-50 dark:bg-zinc-950 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800/80 font-mono text-xs text-rose-300 overflow-x-auto">
              {JSON.stringify(res.header, null, 2)}
            </pre>
          </div>

          <div className="bg-white dark:bg-zinc-900/60 shadow-sm p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-3">
            <div className="flex justify-between items-center">
              <h4 className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">Payload Claims</h4>
              <button
                onClick={() => handleCopy(res.payload, 'payload')}
                className="p-1.5 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:bg-zinc-700 rounded-lg text-zinc-700 dark:text-zinc-300 transition"
              >
                {copiedKey === 'payload' ? <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            <pre className="bg-zinc-50 dark:bg-zinc-950 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800/80 font-mono text-xs text-purple-300 overflow-x-auto">
              {JSON.stringify(res.payload, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
