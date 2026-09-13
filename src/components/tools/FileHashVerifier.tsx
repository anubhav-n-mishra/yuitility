import React, { useState } from 'react';
import { ShieldCheck, Upload, Check, X } from 'lucide-react';

interface FileHashVerifierProps {
  onCopy?: (text: string) => void;
}

export default function FileHashVerifier({ onCopy }: FileHashVerifierProps) {
  const [file, setFile] = useState<File | null>(null);
  const [hashSha256, setHashSha256] = useState<string>('');
  const [expectedHash, setExpectedHash] = useState<string>('');

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      const buffer = await uploadedFile.arrayBuffer();
      const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
      setHashSha256(hex);
    }
  };

  const cleanExpected = expectedHash.trim().toLowerCase();
  const cleanComputed = hashSha256.trim().toLowerCase();
  const isMatch = cleanExpected && cleanComputed && cleanExpected === cleanComputed;
  const isMismatch = cleanExpected && cleanComputed && cleanExpected !== cleanComputed;

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-zinc-900/60 shadow-sm p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
            <ShieldCheck className="w-5 h-5" />
            <h3 className="font-semibold text-zinc-900 dark:text-white">Browser Local File Integrity Verifier</h3>
          </div>
          <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">🔒 File never leaves device</span>
        </div>

        <label className="border-2 border-dashed border-zinc-200 dark:border-zinc-800 hover:border-indigo-500/50 bg-zinc-50 dark:bg-zinc-950 p-6 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition text-center space-y-2">
          <Upload className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
          <span className="text-xs text-zinc-700 dark:text-zinc-300 font-medium">{file ? file.name : 'Select or drop any local file to calculate SHA-256 hash'}</span>
          <span className="text-[10px] text-zinc-500 dark:text-zinc-500">Processed locally in memory using Web Crypto API</span>
          <input type="file" onChange={handleFileUpload} className="hidden" />
        </label>
      </div>

      {hashSha256 && (
        <div className="bg-white dark:bg-zinc-900/60 shadow-sm p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 space-y-4">
          <div className="space-y-1">
            <span className="text-xs text-zinc-500 dark:text-zinc-400 block font-semibold">Calculated SHA-256 Hash</span>
            <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 break-all bg-zinc-50 dark:bg-zinc-950 p-3 rounded-xl block border border-zinc-200 dark:border-zinc-800">
              {hashSha256}
            </span>
          </div>

          <div className="space-y-2">
            <label className="text-xs text-zinc-500 dark:text-zinc-400 block font-semibold">Paste Expected Hash (from developer/publisher)</label>
            <input
              type="text"
              value={expectedHash}
              onChange={(e) => setExpectedHash(e.target.value)}
              placeholder="Paste SHA-256 checksum to verify..."
              className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2 text-white font-mono text-xs focus:outline-none focus:border-indigo-500"
            />
          </div>

          {isMatch && (
            <div className="bg-emerald-950/60 border border-emerald-800 p-4 rounded-xl flex items-center gap-2 text-emerald-300 text-xs font-semibold">
              <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" /> Hash Checksum Match Verified! The file is authentic and uncorrupted.
            </div>
          )}

          {isMismatch && (
            <div className="bg-rose-950/60 border border-rose-800 p-4 rounded-xl flex items-center gap-2 text-rose-300 text-xs font-semibold">
              <X className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" /> Checksum Mismatch Warning! The file hashes do not match.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
