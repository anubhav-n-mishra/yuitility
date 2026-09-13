import React, { useState } from 'react';
import { Pipette, Copy, Check, Upload } from 'lucide-react';

interface ImageColorPickerProps {
  onCopy?: (text: string) => void;
}

export default function ImageColorPicker({ onCopy }: ImageColorPickerProps) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [pickedColor, setPickedColor] = useState<string>('#4F46E5');
  const [copied, setCopied] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setImageSrc(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = e.currentTarget;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const pixel = ctx.getImageData(x, y, 1, 1).data;
    const hex = `#${((1 << 24) + (pixel[0] << 16) + (pixel[1] << 8) + pixel[2]).toString(16).slice(1).toUpperCase()}`;
    setPickedColor(hex);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(pickedColor);
    setCopied(true);
    if (onCopy) onCopy(pickedColor);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-zinc-900/60 shadow-sm p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
            <Pipette className="w-5 h-5" />
            <h3 className="font-semibold text-zinc-900 dark:text-white">Image Eyedropper & Color Picker</h3>
          </div>
          <label className="text-xs text-white bg-indigo-600 hover:bg-indigo-500 px-3 py-1.5 rounded-lg cursor-pointer transition flex items-center gap-1.5 font-medium">
            <Upload className="w-3.5 h-3.5" /> Upload Image
            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white dark:bg-zinc-900/60 shadow-sm p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 flex items-center justify-center min-h-[300px]">
          {imageSrc ? (
            <div className="space-y-2 text-center">
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Click anywhere on the image below to pick pixel color</p>
              <img
                src={imageSrc}
                alt="Uploaded source"
                onClick={(e) => {
                  const img = e.currentTarget;
                  const canvas = document.createElement('canvas');
                  canvas.width = img.naturalWidth;
                  canvas.height = img.naturalHeight;
                  const ctx = canvas.getContext('2d');
                  ctx?.drawImage(img, 0, 0);
                  const rect = img.getBoundingClientRect();
                  const x = (e.clientX - rect.left) * (img.naturalWidth / rect.width);
                  const y = (e.clientY - rect.top) * (img.naturalHeight / rect.height);
                  const pixel = ctx?.getImageData(x, y, 1, 1).data;
                  if (pixel) {
                    const hex = `#${((1 << 24) + (pixel[0] << 16) + (pixel[1] << 8) + pixel[2]).toString(16).slice(1).toUpperCase()}`;
                    setPickedColor(hex);
                  }
                }}
                className="max-h-96 rounded-xl cursor-crosshair border border-zinc-200 dark:border-zinc-700/80 mx-auto"
              />
            </div>
          ) : (
            <label className="w-full h-full min-h-[260px] border-2 border-dashed border-zinc-300 dark:border-zinc-700 hover:border-indigo-500 dark:hover:border-indigo-400 rounded-2xl flex flex-col items-center justify-center cursor-pointer p-6 transition-all hover:bg-indigo-50/30 dark:hover:bg-indigo-950/20 group text-center space-y-3">
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 rounded-2xl group-hover:scale-110 transition-transform">
                <Upload className="w-7 h-7" />
              </div>
              <div>
                <p className="text-sm font-bold text-zinc-800 dark:text-zinc-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                  Click or Drop Image Here
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                  Upload any image file to start picking pixel color codes
                </p>
              </div>
              <span className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all">
                Select Image File
              </span>
            </label>
          )}
        </div>

        <div className="bg-white dark:bg-zinc-900/60 shadow-sm p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Picked Color Code</span>
            <div
              className="h-24 rounded-2xl border border-zinc-200 dark:border-zinc-700/80 shadow-inner flex items-center justify-center text-white font-mono font-bold text-xl shadow-lg"
              style={{ backgroundColor: pickedColor }}
            >
              {pickedColor}
            </div>
          </div>

          <button
            onClick={handleCopy}
            className="w-full py-2.5 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-semibold rounded-xl transition flex items-center justify-center gap-1.5"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-4 h-4" />} Copy HEX Code
          </button>
        </div>
      </div>
    </div>
  );
}
