"use client";
import Link from 'next/link';
export default function CookieBanner({onDismiss}:{onDismiss:()=>void}) {
 return <aside aria-label="Local storage notice" className="fixed bottom-3 left-3 right-3 z-50 mx-auto max-w-xl rounded-2xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 p-5 shadow-xl"><h2 className="font-semibold text-sm">Your browser preferences</h2><p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">Theme, favorites and recent tools are saved on this device. We do not use advertising cookies. The optional AI chat and contact form send information to a server.</p><div className="mt-4 flex items-center justify-between gap-4"><Link href="/privacy" className="text-sm underline text-blue-700 dark:text-blue-300">Privacy and storage details</Link><button className="min-h-11 px-5 rounded-xl bg-blue-700 text-white font-semibold text-sm" onClick={onDismiss}>Got it</button></div></aside>;
}
