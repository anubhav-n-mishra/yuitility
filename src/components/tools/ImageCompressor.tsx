import React, { useState, useRef, useEffect, useId } from 'react';
import { Download, RefreshCw, Share2, UploadCloud, FileImage, Percent } from 'lucide-react';
import { compressToByteLimit } from '@/src/lib/imageCompression';

interface ImageCompressorProps {
  onCopy: (text: string) => void;
  onShare: (title: string, path: string) => void;
}

interface ImageMetadata {
  name: string;
  type: string;
  originalSize: number;
  compressedSize: number;
  originalUrl: string;
  compressedUrl: string;
  width: number;
  height: number;
  originalWidth: number;
  originalHeight: number;
  maxBytes: number | null;
  targetMet: boolean;
}

export default function ImageCompressor({ onCopy, onShare }: ImageCompressorProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [quality, setQuality] = useState<number>(75);
  const [metadata, setMetadata] = useState<ImageMetadata | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [mode, setMode] = useState<'quality' | 'target'>('quality');
  const [targetKB, setTargetKB] = useState('50');
  const [allowResize, setAllowResize] = useState(true);
  const [outputType, setOutputType] = useState('image/jpeg');
  const [error, setError] = useState('');
  const id = useId();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file: File) => {
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setError('Choose a JPEG, PNG or WebP file. Other image formats are not supported.');
      return;
    }
    if (file.size > 20 * 1024 * 1024) {
      setError('Choose an image no larger than 20 MiB.');
      return;
    }
    setError('');
    setMetadata(null);
    setSelectedFile(file);
  };

  useEffect(() => {
    if (!selectedFile) return;
    const maxBytes = mode === 'target' ? Math.floor(Number(targetKB) * 1000) : null;
    setMetadata(null);
    if (maxBytes !== null && (!Number.isFinite(maxBytes) || maxBytes < 1000 || maxBytes > 20000000)) {
      setError('Enter a maximum file size from 1 to 20,000 KB.');
      setIsCompressing(false);
      return;
    }
    const controller = new AbortController();
    const originalUrl = URL.createObjectURL(selectedFile);
    let compressedUrl = '';
    const img = new Image();
    setError('');
    setIsCompressing(true);
    const timer = setTimeout(async () => {
      try {
        await new Promise<void>((resolve, reject) => {
          img.onload = () => resolve();
          img.onerror = () => reject(new Error('This image could not be decoded. Try another JPEG, PNG or WebP.'));
          img.src = originalUrl;
        });
        if (controller.signal.aborted) return;
        if (!img.naturalWidth || !img.naturalHeight || img.naturalWidth * img.naturalHeight > 40000000) throw new Error('Choose an image with valid dimensions, up to 40 megapixels.');
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Canvas image processing is unavailable in this browser.');
        const encode = (width: number, height: number, value: number) => new Promise<Blob>((resolve, reject) => {
          if (controller.signal.aborted) { reject(new Error('Compression cancelled.')); return; }
          canvas.width = width;
          canvas.height = height;
          if (outputType === 'image/jpeg') {
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, width, height);
          }
          ctx.drawImage(img, 0, 0, width, height);
          canvas.toBlob(blob => {
            if (!blob || !blob.size) reject(new Error('The browser could not encode this image.'));
            else if (blob.type !== outputType) reject(new Error('This browser does not support the selected format. Try JPEG.'));
            else resolve(blob);
          }, outputType, value);
        });
        const result = maxBytes === null
          ? { blob: await encode(img.naturalWidth, img.naturalHeight, quality / 100), width: img.naturalWidth, height: img.naturalHeight, targetMet: true }
          : await compressToByteLimit(encode, { width: img.naturalWidth, height: img.naturalHeight, maxBytes, allowResize, signal: controller.signal });
        if (controller.signal.aborted) return;
        compressedUrl = URL.createObjectURL(result.blob);
        setMetadata({ name: selectedFile.name, type: result.blob.type, originalSize: selectedFile.size,
          compressedSize: result.blob.size, originalUrl, compressedUrl, width: result.width, height: result.height,
          originalWidth: img.naturalWidth, originalHeight: img.naturalHeight, maxBytes, targetMet: result.targetMet });
      } catch (cause) {
        if (!controller.signal.aborted) setError(cause instanceof Error ? cause.message : 'Compression failed. Try another image.');
      } finally {
        if (!controller.signal.aborted) setIsCompressing(false);
      }
    }, 180);
    return () => {
      controller.abort();
      clearTimeout(timer);
      img.onload = null;
      img.onerror = null;
      URL.revokeObjectURL(originalUrl);
      if (compressedUrl) URL.revokeObjectURL(compressedUrl);
    };
  }, [selectedFile, quality, mode, targetKB, allowResize, outputType]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const formatSize = (bytes: number) => {
    return `${(bytes / 1000).toFixed(2)} KB (${bytes.toLocaleString()} bytes)`;
  };

  const handleDownload = () => {
    if (!metadata || isCompressing || !metadata.targetMet) return;
    const a = document.createElement('a');
    a.href = metadata.compressedUrl;
    // Replace extension with .compressed.jpg / webp
    const ext = metadata.type === 'image/jpeg' ? 'jpg' : 'webp';
    const newName = (metadata.name.replace(/\.[^/.]+$/, '') || 'image') + `_compressed.${ext}`;
    a.download = newName;
    a.click();
  };

  const handleReset = () => {
    setSelectedFile(null);
    setMetadata(null);
    setQuality(75);
    setError('');
    setIsCompressing(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const savingsPercentage = metadata
    ? Math.round(((metadata.originalSize - metadata.compressedSize) / metadata.originalSize) * 100)
    : 0;

  return (
    <div className="space-y-8">
      {/* Upper header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-100 dark:border-zinc-800 pb-5">
        <div>
          <h2 className="text-2xl font-display font-semibold text-zinc-900 dark:text-zinc-50 tracking-tight">Image Compressor</h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Choose image quality or a maximum file size. Your image stays in this browser.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reset
          </button>
          <button
            onClick={() => onShare("Image Compressor", "image-compressor")}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            Share
          </button>
        </div>
      </div>

      <div className="grid gap-4 rounded-xl border border-zinc-200 p-4 dark:border-zinc-800 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-mode`} className="mb-2 block text-sm font-medium">Compression method</label>
          <select id={`${id}-mode`} value={mode} onChange={e => setMode(e.target.value as 'quality' | 'target')} className="w-full rounded-lg border border-zinc-300 bg-white p-2 text-sm dark:border-zinc-700 dark:bg-zinc-950">
            <option value="quality">Choose image quality</option>
            <option value="target">Fit a maximum file size</option>
          </select>
        </div>
        <div>
          <label htmlFor={`${id}-format`} className="mb-2 block text-sm font-medium">Output format</label>
          <select id={`${id}-format`} value={outputType} onChange={e => setOutputType(e.target.value)} className="w-full rounded-lg border border-zinc-300 bg-white p-2 text-sm dark:border-zinc-700 dark:bg-zinc-950">
            <option value="image/jpeg">JPEG — white background</option>
            <option value="image/webp">WebP — supports transparency</option>
          </select>
        </div>
        {mode === 'target' && <div className="space-y-3 sm:col-span-2">
          <label htmlFor={`${id}-target`} className="block text-sm font-medium">Maximum file size (KB)</label>
          <input id={`${id}-target`} type="number" inputMode="decimal" min="1" max="20000" step="any" value={targetKB} onChange={e => setTargetKB(e.target.value)} aria-describedby={`${id}-target-help`} className="w-full rounded-lg border border-zinc-300 bg-white p-2 text-sm dark:border-zinc-700 dark:bg-zinc-950" />
          <div className="flex flex-wrap gap-2">{[20, 50, 100, 200].map(size => <button key={size} type="button" aria-pressed={Number(targetKB) === size} onClick={() => setTargetKB(String(size))} className={`rounded-lg border px-3 py-2 text-sm ${Number(targetKB) === size ? 'border-blue-600 bg-blue-50 text-blue-800 dark:bg-blue-950 dark:text-blue-200' : 'border-zinc-300 dark:border-zinc-700'}`}>{size} KB</button>)}</div>
          <p id={`${id}-target-help`} className="text-xs text-zinc-500">1 KB = 1,000 bytes. The measured output must fit this limit; it need not equal the limit exactly.</p>
          <label className="flex items-start gap-2 text-sm"><input type="checkbox" checked={allowResize} onChange={e => setAllowResize(e.target.checked)} className="mt-1 accent-blue-600" /><span>Allow smaller dimensions if quality reduction is not enough. Check any minimum pixel dimensions required by your form.</span></label>
        </div>}
        <p className="text-xs text-zinc-500 sm:col-span-2">JPEG replaces transparency with white. Choose WebP to keep transparency; check which formats your destination accepts. Animation and metadata are not retained.</p>
      </div>
      {error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-800 dark:bg-red-950 dark:text-red-200">{error}</p>}
      <p role="status" aria-live="polite" className="text-sm text-zinc-600 dark:text-zinc-400">{isCompressing ? 'Measuring and compressing your image…' : ''}</p>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs Pane */}
        <div className="lg:col-span-7 space-y-6">
          {/* Dropzone container */}
          {!selectedFile ? (
            <div
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className="flex flex-col items-center justify-center p-10 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl cursor-pointer bg-zinc-50/20 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/10 transition-colors relative group"
            >
              <input aria-label="Choose image"
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/png, image/jpeg, image/webp"
                className="hidden"
              />
              <UploadCloud className="w-10 h-10 text-zinc-400 dark:text-zinc-500 mb-4 group-hover:text-zinc-600 transition-colors" />
              <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">Drag & Drop image here</p>
              <p className="text-xs text-zinc-500 mt-1">JPEG, PNG or WebP · up to 20 MiB and 40 megapixels</p>
              <button
                type="button"
                className="mt-4 px-4 py-1.5 bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 text-xs font-semibold rounded-lg shadow-sm"
              >
                Browse File
              </button>
            </div>
          ) : (
            <div className="bg-zinc-50/50 dark:bg-zinc-900/10 border border-zinc-100 dark:border-zinc-900 rounded-xl p-5 space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-white dark:bg-zinc-950 rounded-lg border border-zinc-100 dark:border-zinc-900">
                    <FileImage className="w-5 h-5 text-zinc-500" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 max-w-[200px] truncate">{selectedFile.name}</p>
                    <p className="text-[10px] text-zinc-400 mt-0.5">{formatSize(selectedFile.size)}</p>
                  </div>
                </div>
                <button
                  onClick={handleReset}
                  className="text-xs font-semibold text-red-500 hover:text-red-600 transition-colors"
                >
                  Remove
                </button>
              </div>

              <div className="h-[1px] bg-zinc-200/50 dark:bg-zinc-800" />

              {/* Quality control slider */}
              {mode === 'quality' && <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label htmlFor={`${id}-quality`} className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Image quality</label>
                  <span className="font-mono text-sm font-bold text-zinc-900 dark:text-zinc-50">{quality}%</span>
                </div>
                <input id={`${id}-quality`}
                  type="range"
                  min="10"
                  max="100"
                  step="5"
                  value={quality}
                  onChange={(e) => setQuality(parseInt(e.target.value))}
                  className="w-full h-1 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-zinc-800 dark:accent-zinc-100"
                />
                <div className="flex justify-between text-[10px] text-zinc-400 dark:text-zinc-500 font-mono">
                  <span>High Compression (Low Quality)</span>
                  <span>Low Compression (High Quality)</span>
                </div>
              </div>}
            </div>
          )}

          {/* Side by side before/after previews */}
          {metadata && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider text-center">Before (Original)</p>
                <div className="bg-zinc-100 dark:bg-zinc-900 rounded-xl overflow-hidden aspect-video relative flex items-center justify-center border border-zinc-200 dark:border-zinc-800">
                  <img src={metadata.originalUrl} alt="Before" className="max-w-full max-h-full object-contain" referrerPolicy="no-referrer" />
                  <span className="absolute bottom-2 left-2 bg-black/70 text-white text-[10px] font-mono px-2 py-0.5 rounded font-bold">
                    {formatSize(metadata.originalSize)}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider text-center">After (Compressed)</p>
                <div className="bg-zinc-100 dark:bg-zinc-900 rounded-xl overflow-hidden aspect-video relative flex items-center justify-center border border-zinc-200 dark:border-zinc-800">
                  <img src={metadata.compressedUrl} alt="After" className="max-w-full max-h-full object-contain" referrerPolicy="no-referrer" />
                  <span className="absolute bottom-2 left-2 bg-emerald-600 text-white text-[10px] font-mono px-2 py-0.5 rounded font-bold">
                    {formatSize(metadata.compressedSize)}
                  </span>
                  {isCompressing && (
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] flex items-center justify-center">
                      <RefreshCw className="w-5 h-5 text-white animate-spin" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Output Dashboard Pane */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-zinc-50/50 dark:bg-zinc-900/20 border border-zinc-100 dark:border-zinc-900 rounded-xl p-6">
          {!metadata ? (
            <div className="text-center py-10 my-auto text-zinc-400">
              <UploadCloud className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-xs font-medium">Please upload an image to analyze size optimization potential.</p>
            </div>
          ) : (
            <div className="space-y-6 flex-1 flex flex-col justify-between">
              <div className="space-y-5">
                <h2 className="text-xs text-zinc-400 dark:text-zinc-500 font-semibold uppercase tracking-wider">Compression Report</h2>

                <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Percent className="w-5 h-5 text-emerald-500" />
                    <div>
                      <p className="text-xs text-emerald-600 dark:text-emerald-600 dark:text-emerald-400 font-bold">File size change</p>
                      <p className="text-sm text-zinc-500">{savingsPercentage > 0 ? 'Smaller output' : savingsPercentage < 0 ? 'Larger output' : 'No size reduction'}</p>
                    </div>
                  </div>
                  <p className="text-3xl font-display font-black text-zinc-900 dark:text-zinc-100">{savingsPercentage > 0 ? '−' : savingsPercentage < 0 ? '+' : ''}{Math.abs(savingsPercentage)}%</p>
                </div>
                {metadata.compressedSize >= metadata.originalSize && <p className="text-sm text-amber-700 dark:text-amber-300">This output does not reduce file size. Keeping the original or lowering quality may be better.</p>}
                {metadata.maxBytes !== null && <p role="status" className={`rounded-lg p-3 text-sm ${metadata.targetMet ? 'bg-emerald-50 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200' : 'bg-amber-50 text-amber-900 dark:bg-amber-950 dark:text-amber-200'}`}>{metadata.targetMet ? `Meets the ${metadata.maxBytes.toLocaleString()}-byte limit.` : 'Cannot meet this limit with the current settings. Allow smaller dimensions, choose WebP or increase the limit. Download is disabled for this result.'}</p>}
                {(metadata.width !== metadata.originalWidth || metadata.height !== metadata.originalHeight) && <p className="text-sm text-amber-700 dark:text-amber-300">Dimensions reduced from {metadata.originalWidth} × {metadata.originalHeight} to {metadata.width} × {metadata.height} px. Inspect text and faces before using the image.</p>}

                <div className="h-[1px] bg-zinc-200/50 dark:bg-zinc-800" />

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-900 rounded-lg">
                    <p className="text-[10px] text-zinc-400">Original Size</p>
                    <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 mt-1 font-mono">{formatSize(metadata.originalSize)}</p>
                  </div>
                  <div className="p-3 bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-900 rounded-lg">
                    <p className="text-[10px] text-zinc-400">Optimized Size</p>
                    <p className="text-sm font-bold text-emerald-600 dark:text-emerald-600 dark:text-emerald-400 mt-1 font-mono">{formatSize(metadata.compressedSize)}</p>
                  </div>
                </div>

                <div className="h-[1px] bg-zinc-200/50 dark:bg-zinc-800" />

                <div className="text-xs text-zinc-500 space-y-1.5">
                  <div className="flex justify-between">
                    <span>Resolution:</span>
                    <span className="font-mono text-zinc-700 dark:text-zinc-300">{metadata.width} x {metadata.height} px</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Format:</span>
                    <span className="font-mono text-zinc-700 dark:text-zinc-300 uppercase">{metadata.type.split('/')[1]}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleDownload}
                disabled={isCompressing || !metadata.targetMet}
                className="w-full flex items-center justify-center gap-2 py-3 bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950 text-xs font-semibold rounded-lg hover:opacity-90 transition-opacity mt-6 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Download className="w-3.5 h-3.5" />
                Download Optimized Image
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
