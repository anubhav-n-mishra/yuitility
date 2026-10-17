"use client";

import Modal from "./Modal";
import React, { useState, useEffect } from "react";
import { X, Bell, Moon, Sun, Wrench, MessageSquare, AlertTriangle, Mail, HelpCircle, ShieldCheck, Bot, Palette } from "lucide-react";

interface SettingsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenContact: (type: "request" | "feedback" | "bug") => void;
  accentColor?: 'blue' | 'emerald' | 'indigo' | 'rose' | 'amber';
  onChangeAccent?: (color: 'blue' | 'emerald' | 'indigo' | 'rose' | 'amber') => void;
}

export default function SettingsDrawer({
  isOpen,
  onClose,
  darkMode,
  onToggleDarkMode,
  onOpenContact,
  accentColor = 'blue',
  onChangeAccent,
}: SettingsDrawerProps) {
  if (!isOpen) return null;

  return (
    <Modal label="Settings" onClose={onClose} className="fixed inset-0 z-[150] flex justify-end bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-sm bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 h-full shadow-2xl border-l border-zinc-200 dark:border-zinc-800 flex flex-col overflow-y-auto font-sans"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-zinc-100 dark:border-zinc-800">
          <h2 className="text-lg font-bold">Settings & Preferences</h2>
          <button aria-label="Close dialog"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-6 flex-1">
          {/* Toggles Group */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
              Preferences
            </h3>

            {/* Dark Mode Toggle */}
            <div className="flex items-center justify-between p-3.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 rounded-xl">
                  {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </div>
                <div>
                  <p className="text-xs font-bold">Dark Theme</p>
                  <p className="text-[10px] text-zinc-500 dark:text-zinc-400">Switch color palette</p>
                </div>
              </div>
              <button
                aria-label="Dark theme" aria-pressed={darkMode} onClick={onToggleDarkMode}
                className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                  darkMode ? "bg-blue-600" : "bg-zinc-300 dark:bg-zinc-700"
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    darkMode ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            {/* Accent Color picker */}
            <div className="p-3.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 rounded-xl">
                    <Palette className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold">Accent Color</p>
                    <p className="text-[10px] text-zinc-500 dark:text-zinc-400">Choose your theme highlight</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 bg-zinc-100 dark:bg-zinc-900 p-1.5 rounded-full border border-zinc-200 dark:border-zinc-800">
                  {(['blue', 'emerald', 'indigo', 'rose', 'amber'] as const).map((color) => (
                    <button
                      key={color}
                      onClick={() => onChangeAccent?.(color)}
                      className={`w-6 h-6 rounded-full border transition-all ${
                        color === 'blue' ? 'bg-blue-500' :
                        color === 'emerald' ? 'bg-emerald-500' :
                        color === 'indigo' ? 'bg-indigo-500' :
                        color === 'rose' ? 'bg-rose-500' : 'bg-amber-500'
                      } ${accentColor === color ? 'border-white scale-125 ring-2 ring-zinc-300 dark:ring-zinc-650' : 'border-transparent opacity-80 hover:opacity-100 hover:scale-110'}`}
                      title={`${color} accent`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* YUI AI Assistant API Key Setup */}
            <div className="p-4 bg-zinc-50 dark:bg-zinc-900/60 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-3">
              <div className="flex items-center gap-2">
                <Bot className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">YUI Assistant API Key (BYOK)</h4>
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">Open YUI Assistant and choose API Settings to use your provider key for the current session. Provider charges and limits may apply. Keys are not saved in browser storage.</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
              Community & Support
            </h3>

            <button
              onClick={() => { onClose(); onOpenContact("request"); }}
              className="w-full flex items-center justify-between p-3.5 bg-white dark:bg-zinc-950 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-left transition-colors"
            >
              <div className="flex items-center gap-3">
                <Wrench className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="text-xs font-semibold">Request a Tool</span>
              </div>
            </button>

            <button
              onClick={() => { onClose(); onOpenContact("feedback"); }}
              className="w-full flex items-center justify-between p-3.5 bg-white dark:bg-zinc-950 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-left transition-colors"
            >
              <div className="flex items-center gap-3">
                <MessageSquare className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span className="text-xs font-semibold">Submit Feedback</span>
              </div>
            </button>

            <button
              onClick={() => { onClose(); onOpenContact("bug"); }}
              className="w-full flex items-center justify-between p-3.5 bg-white dark:bg-zinc-950 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-left transition-colors"
            >
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span className="text-xs font-semibold">Report a Bug</span>
              </div>
            </button>

            <a
              href="mailto:hello@yuitility.app"
              className="w-full flex items-center justify-between p-3.5 bg-white dark:bg-zinc-950 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-left transition-colors"
            >
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span className="text-xs font-semibold">Send Email (hello@yuitility.app)</span>
              </div>
            </a>

            <a
              href="mailto:support@yuitility.app"
              className="w-full flex items-center justify-between p-3.5 bg-white dark:bg-zinc-950 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-left transition-colors"
            >
              <div className="flex items-center gap-3">
                <HelpCircle className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                <span className="text-xs font-semibold">Customer Support</span>
              </div>
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-center">
          <div className="flex items-center justify-center gap-1.5 text-[11px] text-zinc-500 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-500" /> Local file processing · Server-backed AI
          </div>
        </div>
      </div>
    </Modal>
  );
}
