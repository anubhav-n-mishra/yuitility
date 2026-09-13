import React, { useState, useMemo } from 'react';
import { ArrowRightLeft, Copy, Check, Download } from 'lucide-react';

interface JsonToCsvConverterProps {
  onCopy?: (text: string) => void;
}

export default function JsonToCsvConverter({ onCopy }: JsonToCsvConverterProps) {
  const [jsonInput, setJsonInput] = useState(`[
  { "id": 1, "name": "Anubhav Mishra", "role": "Full Stack Dev", "city": "Mumbai" },
  { "id": 2, "name": "Priya Sharma", "role": "Product Manager", "city": "Delhi" },
  { "id": 3, "name": "Rahul Verma", "role": "UI/UX Designer", "city": "Bangalore" }
]`);
  const [delimiter, setDelimiter] = useState<',' | ';' | '\t'>(',');
  const [copied, setCopied] = useState(false);

  const { csvResult, error } = useMemo(() => {
    try {
      const parsed = JSON.parse(jsonInput);
      if (!Array.isArray(parsed) || parsed.length === 0) {
        return { csvResult: '', error: 'Input must be a non-empty JSON array of objects' };
      }

      const headers = Array.from(new Set(parsed.flatMap((obj) => Object.keys(obj))));
      const csvRows = [headers.join(delimiter)];

      for (const row of parsed) {
        const values = headers.map((header) => {
          const val = row[header] !== undefined ? String(row[header]) : '';
          const escaped = val.replace(/"/g, '""');
          return escaped.includes(delimiter) || escaped.includes('\n') || escaped.includes('"')
            ? `"${escaped}"`
            : escaped;
        });
        csvRows.push(values.join(delimiter));
      }

      return { csvResult: csvRows.join('\n'), error: null };
    } catch (err: any) {
      return { csvResult: '', error: err.message || 'Invalid JSON format' };
    }
  }, [jsonInput, delimiter]);

  const handleCopy = () => {
    if (!csvResult) return;
    navigator.clipboard.writeText(csvResult);
    setCopied(true);
    if (onCopy) onCopy(csvResult);
    setTimeout(() => setCopied(false), 1800);
  };

  const handleDownload = () => {
    if (!csvResult) return;
    const blob = new Blob([csvResult], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'converted.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-zinc-900/60 shadow-sm p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
          <ArrowRightLeft className="w-5 h-5" />
          <h3 className="font-semibold text-zinc-900 dark:text-white">JSON to CSV Converter</h3>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <label className="text-zinc-500 dark:text-zinc-400">Delimiter:</label>
          <select
            value={delimiter}
            onChange={(e) => setDelimiter(e.target.value as any)}
            className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-1.5 text-white text-xs font-mono focus:outline-none"
          >
            <option value=",">Comma (,)</option>
            <option value=";">Semicolon (;)</option>
            <option value="\t">Tab (\t)</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-zinc-900/60 shadow-sm p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 flex flex-col justify-between">
          <div>
            <h4 className="text-sm font-semibold text-zinc-900 dark:text-white mb-3">Input JSON Array</h4>
            <textarea
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              rows={12}
              className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 text-white font-mono text-xs focus:outline-none focus:border-indigo-500 resize-none"
            />
            {error && <p className="text-xs text-rose-600 dark:text-rose-400 mt-2 font-mono">{error}</p>}
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900/60 shadow-sm p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">Output CSV</h4>
              <div className="flex gap-2">
                <button
                  onClick={handleDownload}
                  disabled={!csvResult}
                  className="text-xs text-zinc-700 dark:text-zinc-300 hover:text-white bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:bg-zinc-700 px-3 py-1 rounded-lg transition flex items-center gap-1.5 disabled:opacity-50"
                >
                  <Download className="w-3.5 h-3.5" /> Export .csv
                </button>
                <button
                  onClick={handleCopy}
                  disabled={!csvResult}
                  className="text-xs text-zinc-700 dark:text-zinc-300 hover:text-white bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:bg-zinc-700 px-3 py-1 rounded-lg transition flex items-center gap-1.5 disabled:opacity-50"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />} Copy CSV
                </button>
              </div>
            </div>
            <textarea
              readOnly
              value={csvResult}
              rows={12}
              className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 text-emerald-300 font-mono text-xs focus:outline-none resize-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
