import React, { useState } from 'react';
import { FileCode, Upload, Download, Check } from 'lucide-react';

interface SvgToPngConverterProps {
  onCopy?: (text: string) => void;
}

export default function SvgToPngConverter({ onCopy }: SvgToPngConverterProps) {
  const [svgContent, setSvgContent] = useState<string | null>(null);
  const [scale, setScale] = useState(2);
  const [downloaded, setDownloaded] = useState(false);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setSvgContent(ev.target?.result as string);
      reader.readAsText(file);
    }
  };

  const handleDownloadPng = () => {
    if (!svgContent) return;

    const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const img = new Image();

    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = (img.width || 300) * scale;
      canvas.height = (img.height || 300) * scale;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const pngUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = pngUrl;
        link.download = 'converted.png';
        link.click();
        setDownloaded(true);
        setTimeout(() => setDownloaded(false), 1800);
      }
      URL.revokeObjectURL(url);
    };

    img.src = url;
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-zinc-900/60 shadow-sm p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
            <FileCode className="w-5 h-5" />
            <h3 className="font-semibold text-zinc-900 dark:text-white">SVG Vector to PNG Converter</h3>
          </div>
          <label className="text-xs text-white bg-indigo-600 hover:bg-indigo-500 px-3 py-1.5 rounded-lg cursor-pointer transition flex items-center gap-1.5 font-medium">
            <Upload className="w-3.5 h-3.5" /> Select SVG File
            <input type="file" accept=".svg,image/svg+xml" onChange={handleUpload} className="hidden" />
          </label>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <span className="text-zinc-500 dark:text-zinc-400">Export Scale Resolution:</span>
          {[1, 2, 4].map((s) => (
            <button
              key={s}
              onClick={() => setScale(s)}
              className={`px-3 py-1 rounded-lg font-mono font-bold transition ${scale === s ? 'bg-indigo-600 text-white' : 'bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 font-semibold border border-zinc-200 dark:border-zinc-700'}`}
            >
              {s}x ({s * 100}%)
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900/60 shadow-sm p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 text-center space-y-6">
        {svgContent ? (
          <div className="space-y-4">
            <div
              className="max-h-64 max-w-sm mx-auto p-4 bg-zinc-50 dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 flex items-center justify-center overflow-hidden"
              dangerouslySetInnerHTML={{ __html: svgContent }}
            />
            <button
              onClick={handleDownloadPng}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl transition shadow-lg"
            >
              {downloaded ? <Check className="w-4 h-4" /> : <Download className="w-4 h-4" />} Download High-Res PNG ({scale}x)
            </button>
          </div>
        ) : (
          <label className="w-full min-h-[220px] border-2 border-dashed border-zinc-300 dark:border-zinc-700 hover:border-indigo-500 dark:hover:border-indigo-400 rounded-2xl flex flex-col items-center justify-center cursor-pointer p-8 transition-all hover:bg-indigo-50/30 dark:hover:bg-indigo-950/20 group text-center space-y-3">
            <input type="file" accept=".svg,image/svg+xml" onChange={handleUpload} className="hidden" />
            <div className="p-4 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 rounded-2xl group-hover:scale-110 transition-transform">
              <Upload className="w-8 h-8" />
            </div>
            <div>
              <p className="text-sm font-bold text-zinc-800 dark:text-zinc-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                Click or Drop SVG File Here
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                Upload any .svg vector asset to rasterize and export as PNG
              </p>
            </div>
            <span className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all">
              Select SVG File
            </span>
          </label>
        )}
      </div>
    </div>
  );
}
