import React, { useState } from 'react';
import { RotateCcw, RotateCw, Upload, Download } from 'lucide-react';

interface ImageFlipperProps {
  onCopy?: (text: string) => void;
}

export default function ImageFlipper({ onCopy }: ImageFlipperProps) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);
  const [flipH, setFlipH] = useState(false);
  const [flipV, setFlipV] = useState(false);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setImageSrc(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = () => {
    if (!imageSrc) return;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const isRotated90 = rotation % 180 !== 0;
      canvas.width = isRotated90 ? img.naturalHeight : img.naturalWidth;
      canvas.height = isRotated90 ? img.naturalWidth : img.naturalHeight;

      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);
      ctx.drawImage(img, -img.naturalWidth / 2, -img.naturalHeight / 2);

      const link = document.createElement('a');
      link.download = 'flipped-rotated-image.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    };
    img.src = imageSrc;
  };

  const transformStyle = {
    transform: `rotate(${rotation}deg) scaleX(${flipH ? -1 : 1}) scaleY(${flipV ? -1 : 1})`,
    transition: 'transform 0.3s ease-in-out',
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-zinc-900/60 shadow-sm p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
            <RotateCw className="w-5 h-5" />
            <h3 className="font-semibold text-zinc-900 dark:text-white">Image Flip & Rotate Controls</h3>
          </div>
          <label className="text-xs text-white bg-indigo-600 hover:bg-indigo-500 px-3 py-1.5 rounded-lg cursor-pointer transition flex items-center gap-1.5 font-medium">
            <Upload className="w-3.5 h-3.5" /> Select Photo
            <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
          </label>
        </div>

        <div className="flex flex-wrap gap-2 text-xs">
          <button
            onClick={() => setRotation((prev) => (prev + 90) % 360)}
            className="px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 rounded-lg transition flex items-center gap-1"
          >
            <RotateCw className="w-3.5 h-3.5" /> Rotate 90° CW
          </button>
          <button
            onClick={() => setRotation((prev) => (prev - 90 + 360) % 360)}
            className="px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 rounded-lg transition flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Rotate 90° CCW
          </button>
          <button
            onClick={() => setFlipH(!flipH)}
            className={`px-3 py-1.5 rounded-lg transition ${flipH ? 'bg-indigo-600 text-white' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-200 dark:bg-zinc-700'}`}
          >
            Flip Horizontally
          </button>
          <button
            onClick={() => setFlipV(!flipV)}
            className={`px-3 py-1.5 rounded-lg transition ${flipV ? 'bg-indigo-600 text-white' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-200 dark:bg-zinc-700'}`}
          >
            Flip Vertically
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900/60 shadow-sm p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 flex flex-col items-center justify-center min-h-[350px] overflow-hidden space-y-6">
        {imageSrc ? (
          <>
            <img
              src={imageSrc}
              alt="Transformed output"
              style={transformStyle}
              className="max-h-96 max-w-full rounded-xl object-contain border border-zinc-200 dark:border-zinc-700/80 shadow-2xl"
            />
            <button
              onClick={handleDownload}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-lg flex items-center gap-2 transition-all active:scale-95"
            >
              <Download className="w-5 h-5" /> Download Transformed Image
            </button>
          </>
        ) : (
          <label className="w-full h-full min-h-[300px] border-2 border-dashed border-zinc-300 dark:border-zinc-700 hover:border-indigo-500 dark:hover:border-indigo-400 rounded-2xl flex flex-col items-center justify-center cursor-pointer p-8 transition-all hover:bg-indigo-50/30 dark:hover:bg-indigo-950/20 group text-center space-y-3">
            <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
            <div className="p-4 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 rounded-2xl group-hover:scale-110 transition-transform">
              <Upload className="w-8 h-8" />
            </div>
            <div>
              <p className="text-sm font-bold text-zinc-800 dark:text-zinc-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                Click or Drop Image Here
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                Upload image to flip horizontal/vertical or rotate angles
              </p>
            </div>
            <span className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all">
              Select Image File
            </span>
          </label>
        )}
      </div>
    </div>
  );
}
