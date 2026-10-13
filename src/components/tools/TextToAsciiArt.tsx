import React, { useState } from 'react';
import { Sparkles, Copy, Check } from 'lucide-react';

interface TextToAsciiArtProps {
  onCopy?: (text: string) => void;
}

export default function TextToAsciiArt({ onCopy }: TextToAsciiArtProps) {
  const [text, setText] = useState('YUTIL');
  const [copied, setCopied] = useState(false);

  // Embedded ASCII font definitions for 0-9, A-Z
  const fontStandard: Record<string, string[]> = {
    A: ["  /\\  ", " /  \\ ", "/ /\\ \\", "/ ____\\", "/_/  \\_"],
    B: [" ____ ", "|  _ \\", "| |_) |", "|  _ < ", "|_|_\\_\\"],
    C: ["  ___ ", " / __|", "| (__ ", " \\___|", "      "],
    D: [" ___  ", "|  _ \\ ", "| | | |", "| |_| |", "|____/ "],
    E: [" _____", "| ____|", "|  _|  ", "| |___ ", "|_____|"],
    F: [" _____", "|  ___|", "| |_   ", "|  _|  ", "|_|    "],
    G: ["  ____ ", " / ___|", "| |  _ ", "| |_| |", " \\____|"],
    H: [" _  _ ", "| || |", "| __ |", "|_||_|", "      "],
    I: [" ___ ", "|_ _|", " | | ", " | | ", "|___|"],
    J: ["  ___", " |_  |", "   | |", " /__/ ", "      "],
    K: [" _  _ ", "| |/ /", "| ' < ", "| .  \\ ", "|_|\\_\\"],
    L: [" _    ", "| |   ", "| |   ", "| |___", "|_____|"],
    M: [" __  __ ", "|  \\/  |", "| |\\/| |", "| |  | |", "|_|  |_|"],
    N: [" _  _ ", "| \\| |", "| .` |", "|_|\\_|", "      "],
    O: ["  ___  ", " / _ \\ ", "| | | |", "| |_| |", " \\___/ "],
    P: [" ____ ", "|  _ \\", "| |_) |", "|  __/ ", "|_|    "],
    Q: ["  ___  ", " / _ \\ ", "| | | |", "| |_| |", " \\__\\_\\"],
    R: [" ____ ", "|  _ \\", "| |_) |", "|  _ < ", "|_| \\_\\"],
    S: [" ____ ", "/ ___|", "\\___ \\ ", " ___) |", "|____/ "],
    T: [" _____", " |_   _|", "   | |  ", "   | |  ", "   |_|  "],
    U: [" _   _ ", "| | | |", "| | | |", "| |_| |", " \\___/ "],
    V: [" _   _ ", "| | | |", "| | | |", " \\ \\/ /", "  \\__/ "],
    W: [" _      _ ", "| |    | |", "| | /\\ | |", "\\ \\/  \\/ /", " \\_/\\_/  "],
    X: ["__  __", "\\ \\/ /", " \\  / ", " /  \\ ", "/_/\\_\\"],
    Y: ["__   __", "\\ \\ / /", " \\ V / ", "  | |  ", "  |_|  "],
    Z: [" _____", "|__  /", "  / / ", " / /_ ", "/____|"],
    " ": ["  ", "  ", "  ", "  ", "  "]
  };

  const renderArt = () => {
    const chars = text.toUpperCase().split('');
    const height = 5;
    const lines: string[] = Array(height).fill('');

    for (let h = 0; h < height; h++) {
      for (const char of chars) {
        const glyph = fontStandard[char] || fontStandard[' '];
        lines[h] += (glyph ? glyph[h] : '     ') + ' ';
      }
    }
    return lines.join('\n');
  };

  const artOutput = renderArt();

  const handleCopy = () => {
    navigator.clipboard.writeText(artOutput);
    setCopied(true);
    if (onCopy) onCopy(artOutput);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-zinc-900/60 shadow-sm p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-4">
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
          <Sparkles className="w-5 h-5" />
          <h3 className="font-semibold text-zinc-900 dark:text-white">Text to ASCII Art Banner</h3>
        </div>

        <div className="space-y-2">
          <label className="text-xs text-zinc-500 dark:text-zinc-400">Text String (Max 12 Chars)</label>
          <input
            type="text"
            maxLength={12}
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2 text-white font-mono text-sm focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900/60 shadow-sm p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-3">
        <div className="flex justify-between items-center">
          <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">ASCII Art Preview</h4>
          <button
            onClick={handleCopy}
            className="text-xs text-zinc-700 dark:text-zinc-300 hover:text-white bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:bg-zinc-700 px-3 py-1 rounded-lg transition flex items-center gap-1.5"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />} Copy ASCII
          </button>
        </div>

        <div className="bg-zinc-50 dark:bg-zinc-950 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-x-auto">
          <pre className="font-mono text-xs text-emerald-600 dark:text-emerald-400 leading-none select-all">{artOutput}</pre>
        </div>
      </div>
    </div>
  );
}
