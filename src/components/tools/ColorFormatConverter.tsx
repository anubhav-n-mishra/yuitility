import React, { useState } from 'react';
import { Palette, Copy, Check } from 'lucide-react';

interface ColorFormatConverterProps {
  onCopy?: (text: string) => void;
}

export default function ColorFormatConverter({ onCopy }: ColorFormatConverterProps) {
  const [hex, setHex] = useState('#4F46E5');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const hexToRgb = (h: string) => {
    let clean = h.replace('#', '');
    if (clean.length === 3) {
      clean = clean.split('').map((c) => c + c).join('');
    }
    if (clean.length !== 6) return null;
    const num = parseInt(clean, 16);
    return {
      r: (num >> 16) & 255,
      g: (num >> 8) & 255,
      b: num & 255,
    };
  };

  const rgb = hexToRgb(hex) || { r: 79, g: 70, b: 229 };

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  };

  const rgbToCmyk = (r: number, g: number, b: number) => {
    const c1 = 1 - r / 255;
    const m1 = 1 - g / 255;
    const y1 = 1 - b / 255;
    const k = Math.min(c1, m1, y1);

    if (k === 1) return { c: 0, m: 0, y: 0, k: 100 };
    return {
      c: Math.round(((c1 - k) / (1 - k)) * 100),
      m: Math.round(((m1 - k) / (1 - k)) * 100),
      y: Math.round(((y1 - k) / (1 - k)) * 100),
      k: Math.round(k * 100),
    };
  };

  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const cmyk = rgbToCmyk(rgb.r, rgb.g, rgb.b);

  const formats = [
    { key: 'hex', label: 'HEX Code', val: hex.toUpperCase(), color: 'text-indigo-600 dark:text-indigo-400' },
    { key: 'rgb', label: 'RGB String', val: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`, color: 'text-cyan-400' },
    { key: 'hsl', label: 'HSL String', val: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`, color: 'text-emerald-600 dark:text-emerald-400' },
    { key: 'cmyk', label: 'CMYK Values', val: `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`, color: 'text-amber-400' },
    { key: 'cssVar', label: 'CSS Variable', val: `--color-primary: ${hex.toLowerCase()};`, color: 'text-rose-600 dark:text-rose-400' },
  ];

  const handleCopy = (val: string, key: string) => {
    navigator.clipboard.writeText(val);
    setCopiedKey(key);
    if (onCopy) onCopy(val);
    setTimeout(() => setCopiedKey(null), 1800);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-zinc-900/60 shadow-sm p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-4">
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
          <Palette className="w-5 h-5" />
          <h3 className="font-semibold text-zinc-900 dark:text-white">Color Picker & Converter</h3>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex items-center gap-3 bg-zinc-50 dark:bg-zinc-950 p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 w-full sm:w-auto">
            <input
              type="color"
              value={hex}
              onChange={(e) => setHex(e.target.value)}
              className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0"
            />
            <input
              type="text"
              value={hex}
              onChange={(e) => setHex(e.target.value)}
              className="bg-transparent text-white font-mono text-sm focus:outline-none uppercase w-28"
            />
          </div>

          <div
            className="h-14 rounded-xl flex-1 w-full border border-zinc-200 dark:border-zinc-700/60 shadow-lg transition-all duration-300 flex items-center justify-center font-mono font-bold text-white shadow-inner"
            style={{ backgroundColor: hex }}
          >
            Preview Swatch
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {formats.map(({ key, label, val, color }) => (
          <div key={key} className="bg-white dark:bg-zinc-900/60 shadow-sm p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
            <div>
              <span className={`text-xs font-bold uppercase tracking-wider block mb-1 ${color}`}>{label}</span>
              <span className="text-sm font-mono text-white font-semibold">{val}</span>
            </div>
            <button
              onClick={() => handleCopy(val, key)}
              className="p-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:bg-zinc-700 rounded-lg text-zinc-700 dark:text-zinc-300 transition"
            >
              {copiedKey === key ? <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
