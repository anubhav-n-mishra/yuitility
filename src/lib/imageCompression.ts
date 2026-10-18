export interface CompressedImage {
  blob: Blob;
  width: number;
  height: number;
  quality: number;
  targetMet: boolean;
}

export type ImageEncoder = (width: number, height: number, quality: number) => Promise<Blob>;

/** Bounded search: only measured blobs within maxBytes can be marked successful. */
export async function compressToByteLimit(
  encode: ImageEncoder,
  options: { width: number; height: number; maxBytes: number; allowResize: boolean; signal?: AbortSignal },
): Promise<CompressedImage> {
  const { maxBytes, allowResize, signal } = options;
  if (!Number.isSafeInteger(maxBytes) || maxBytes < 1) throw new Error('Enter a valid file-size limit.');
  if (![options.width, options.height].every(n => Number.isSafeInteger(n) && n > 0)) throw new Error('The image has invalid dimensions.');
  let width = options.width;
  let height = options.height;
  const attempt = async (quality: number): Promise<CompressedImage> => {
    if (signal?.aborted) throw new Error('Compression cancelled.');
    const blob = await encode(width, height, quality);
    if (signal?.aborted) throw new Error('Compression cancelled.');
    if (!blob.size) throw new Error('The browser could not encode this image.');
    return { blob, width, height, quality, targetMet: blob.size <= maxBytes };
  };
  for (let resizeStep = 0; resizeStep <= 12; resizeStep++) {
    const high = await attempt(0.92);
    if (high.targetMet) return high;
    let best = await attempt(0.1);
    if (best.targetMet) {
      let lowQuality = 0.1;
      let highQuality = 0.92;
      for (let i = 0; i < 8; i++) {
        const quality = (lowQuality + highQuality) / 2;
        const candidate = await attempt(quality);
        if (candidate.targetMet) { best = candidate; lowQuality = quality; }
        else highQuality = quality;
      }
      return best;
    }
    if (!allowResize || (width === 1 && height === 1) || resizeStep === 12) return best;
    // Redraw from the original source each time, preserving the aspect ratio.
    const scale = Math.min(0.8, Math.sqrt(maxBytes / best.blob.size) * 0.9);
    width = resizeStep === 11 ? 1 : Math.max(1, Math.floor(width * scale));
    height = resizeStep === 11 ? 1 : Math.max(1, Math.floor(height * scale));
  }
  throw new Error('The browser could not finish compression.');
}
