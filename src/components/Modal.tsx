"use client";

import { useEffect, useRef, type ReactNode } from 'react';

/** Native modal semantics, focus containment, Escape and focus restoration. */
export default function Modal({ label, onClose, children, className = '' }: {
  label: string; onClose: () => void; children: ReactNode; className?: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const overflow = document.body.style.overflow;
    dialog?.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      dialog?.close();
      document.body.style.overflow = overflow;
      if (previous?.isConnected) previous.focus();
    };
  }, []);
  return <dialog ref={ref} aria-label={label} onCancel={event => { event.preventDefault(); onClose(); }}
    onClick={event => { if (event.target === event.currentTarget) onClose(); }}
    className={`fixed inset-0 m-0 h-full w-full max-h-none max-w-none overflow-y-auto border-0 text-zinc-900 dark:text-zinc-100 ${className}`}>
    {children}
  </dialog>;
}
