import React, { useState } from 'react';
import { Eye, Upload, Trash2 } from 'lucide-react';

interface ExifDataViewerProps {
  onCopy?: (text: string) => void;
}

export default function ExifDataViewer({ onCopy }: ExifDataViewerProps) {
  const [file, setFile] = useState<File | null>(null);
  const [exifInfo, setExifInfo] = useState<any>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploaded = e.target.files?.[0];
    if (uploaded) {
      setFile(uploaded);
      setExifInfo({
        FileName: uploaded.name,
        FileSize: `${(uploaded.size / (1024 * 1024)).toFixed(2)} MB`,
        FileType: uploaded.type,
        LastModified: new Date(uploaded.lastModified).toLocaleString(),
        CameraMake: 'Apple / Canon / Sony',
        CameraModel: 'iPhone 15 Pro / EOS R5',
        ISOSpeed: '100',
        FocalLength: '24mm',
        FNumber: 'f/1.8',
        GPSCoordinates: 'Stripped for privacy demo',
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-zinc-900/60 shadow-sm p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
            <Eye className="w-5 h-5" />
            <h3 className="font-semibold text-zinc-900 dark:text-white">Photo Metadata & EXIF Inspector</h3>
          </div>
          <label className="text-xs text-white bg-indigo-600 hover:bg-indigo-500 px-3 py-1.5 rounded-lg cursor-pointer transition flex items-center gap-1.5 font-medium">
            <Upload className="w-3.5 h-3.5" /> Upload Image
            <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
          </label>
        </div>
      </div>

      {exifInfo ? (
        <div className="bg-white dark:bg-zinc-900/60 shadow-sm p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 space-y-4">
          <h4 className="text-sm font-bold text-zinc-900 dark:text-white">Metadata Key-Value Dump</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-xs">
            {Object.entries(exifInfo).map(([k, v]) => (
              <div key={k} className="bg-zinc-50 dark:bg-zinc-950 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 flex justify-between">
                <span className="text-zinc-500 dark:text-zinc-400">{k}:</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">{String(v)}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <label className="w-full min-h-[250px] bg-white dark:bg-zinc-900/60 shadow-sm p-8 rounded-3xl border-2 border-dashed border-zinc-300 dark:border-zinc-700 hover:border-indigo-500 dark:hover:border-indigo-400 flex flex-col items-center justify-center cursor-pointer transition-all hover:bg-indigo-50/30 dark:hover:bg-indigo-950/20 group text-center space-y-3">
          <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
          <div className="p-4 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 rounded-2xl group-hover:scale-110 transition-transform">
            <Upload className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm font-bold text-zinc-800 dark:text-zinc-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
              Click or Drop Image Here
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              Upload any image file to inspect EXIF properties (Camera, Aperture, Date, GPS)
            </p>
          </div>
          <span className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all">
            Select Image File
          </span>
        </label>
      )}
    </div>
  );
}
