"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Download, CheckCircle2, ExternalLink, Sparkles, X } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function PwaInstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState<boolean>(false);
  const [justInstalled, setJustInstalled] = useState<boolean>(false);
  const [showInstructions, setShowInstructions] = useState<boolean>(false);
  const [deviceType, setDeviceType] = useState<"ios" | "android" | "desktop">("desktop");
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    // Detect standalone PWA mode
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (navigator as unknown as { standalone?: boolean }).standalone === true;

    const hasInstalledRecord = localStorage.getItem("pwa_installed") === "true";

    if (isStandalone || hasInstalledRecord) {
      setIsInstalled(true);
      if (isStandalone) {
        localStorage.setItem("pwa_installed", "true");
      }
    }

    setMounted(true);

    // Detect OS for fallback instructions
    const ua = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(ua)) {
      setDeviceType("ios");
    } else if (/android/.test(ua)) {
      setDeviceType("android");
    } else {
      setDeviceType("desktop");
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setJustInstalled(true);
      localStorage.setItem("pwa_installed", "true");
      setDeferredPrompt(null);
      setShowInstructions(false);
      setTimeout(() => {
        setJustInstalled(false);
      }, 1000);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  useEffect(() => {
    if (showInstructions) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showInstructions]);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === "accepted") {
        setIsInstalled(true);
        setJustInstalled(true);
        localStorage.setItem("pwa_installed", "true");
        setTimeout(() => {
          setJustInstalled(false);
        }, 1000);
      }
      setDeferredPrompt(null);
    } else {
      setShowInstructions(true);
    }
  };

  const handleOpenApp = () => {
    window.open(window.location.href, '_blank', 'noopener,noreferrer');
  };

  // Prevent SSR Hydration mismatch
  if (!mounted) {
    return null;
  }

  if (justInstalled) {
    return (
      <span 
        className="inline-flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold border border-emerald-500/20 animate-in fade-in zoom-in duration-200"
        title="App Installed Successfully"
      >
        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
        <span className="hidden sm:inline">Installed!</span>
      </span>
    );
  }

  // If running inside standalone app mode, hide button completely
  if (typeof window !== "undefined" && window.matchMedia("(display-mode: standalone)").matches) {
    return null;
  }

  // If user has installed the app and viewing in normal browser tab, show "Open App"
  if (isInstalled) {
    return (
      <button
        onClick={handleOpenApp}
        type="button"
        className="inline-flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-xs hover:shadow-md transition-all transform active:scale-95 shrink-0 cursor-pointer"
        aria-label="Open Yuitility App"
        title="Open App"
      >
        <ExternalLink className="w-3.5 h-3.5 shrink-0" />
        <span className="hidden sm:inline">Open App</span>
      </button>
    );
  }

  return (
    <>
      <button
        onClick={handleInstallClick}
        type="button"
        className="inline-flex items-center justify-center gap-1.5 px-2 py-2 sm:px-3 sm:py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-sm hover:shadow-md transition-all transform active:scale-95 shrink-0 cursor-pointer"
        aria-label="Install Yuitility PWA"
        title="Install App"
      >
        <Download className="w-4 h-4 sm:w-3.5 sm:h-3.5 animate-bounce shrink-0" />
        <span className="hidden sm:inline">Install Now</span>
      </button>

      {/* Manual Installation Instructions Modal */}
      {showInstructions && mounted && createPortal(
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl max-w-sm w-full p-6 shadow-2xl space-y-4 relative animate-in fade-in zoom-in-95 duration-200 text-left">
            <button
              onClick={() => setShowInstructions(false)}
              className="absolute top-4 right-4 p-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2">
              <div className="p-2.5 rounded-2xl bg-blue-600/10 text-blue-600 dark:text-blue-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-zinc-950 dark:text-white">Install Yuitility App</h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Use offline with zero latency</p>
              </div>
            </div>

            <div className="space-y-3 text-xs leading-relaxed text-zinc-600 dark:text-zinc-300 bg-zinc-50 dark:bg-zinc-950 p-4 rounded-2xl border border-zinc-100 dark:border-zinc-800">
              {deviceType === "ios" ? (
                <ol className="list-decimal list-inside space-y-1.5">
                  <li>Tap the <span className="font-bold text-blue-600 dark:text-blue-400">Share button</span> (bottom of Safari).</li>
                  <li>Scroll down and tap <span className="font-bold text-zinc-900 dark:text-white">&quot;Add to Home Screen&quot;</span>.</li>
                  <li>Tap <span className="font-bold text-blue-600 dark:text-blue-400">&quot;Add&quot;</span> to launch from your home screen.</li>
                </ol>
              ) : deviceType === "android" ? (
                <ol className="list-decimal list-inside space-y-1.5">
                  <li>Tap the browser menu <span className="font-bold text-zinc-900 dark:text-white">(⋮ top right)</span>.</li>
                  <li>Select <span className="font-bold text-blue-600 dark:text-blue-400">&quot;Install app&quot;</span> or &quot;Add to Home screen&quot;.</li>
                  <li>Confirm installation.</li>
                </ol>
              ) : (
                <ol className="list-decimal list-inside space-y-1.5">
                  <li>Look for the <span className="font-bold text-blue-600 dark:text-blue-400">Install icon</span> in your browser address bar (top right).</li>
                  <li>Or open menu <span className="font-bold text-zinc-900 dark:text-white">(⋮)</span> → <span className="font-bold text-blue-600 dark:text-blue-400">&quot;Install Yuitility...&quot;</span>.</li>
                  <li>Enjoy instant 100% offline tools!</li>
                </ol>
              )}
            </div>

            <button
              onClick={() => setShowInstructions(false)}
              className="w-full py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-500 transition-colors"
            >
              Got it!
            </button>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
