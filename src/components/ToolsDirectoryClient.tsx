"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Header from "@/src/components/Header";
import HoverFooter from "@/src/components/ui/hover-footer";
import { CATEGORIES, Tool } from "@/src/types";
import { LIVE_TOOLS, liveToolsInCategory } from "@/src/lib/toolRegistry";
import { CATEGORY_META, toolPath } from "@/src/lib/site";
import { Search, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

interface ToolsDirectoryClientProps {
  orderedCategories: typeof CATEGORIES;
}

export default function ToolsDirectoryClient({ orderedCategories }: ToolsDirectoryClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(true);

  const checkScrollState = () => {
    const el = document.getElementById("tools-category-scroll-container");
    if (el) {
      setCanScrollLeft(el.scrollLeft > 10);
      setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 10);
    }
  };

  const handleScroll = (direction: "left" | "right") => {
    const el = document.getElementById("tools-category-scroll-container");
    if (el) {
      const scrollAmount = direction === "left" ? -280 : 280;
      el.scrollBy({ left: scrollAmount, behavior: "smooth" });
      setTimeout(checkScrollState, 350);
    }
  };

  const filteredCategories = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return orderedCategories
      .map((cat) => {
        let tools = liveToolsInCategory(cat.id);
        if (activeCategory !== "all" && cat.id !== activeCategory) {
          return null;
        }
        if (q) {
          tools = tools.filter(
            (t) =>
              t.title.toLowerCase().includes(q) ||
              t.description.toLowerCase().includes(q)
          );
        }
        if (tools.length === 0) return null;
        return { cat, tools, meta: CATEGORY_META[cat.id] };
      })
      .filter(Boolean) as Array<{ cat: (typeof CATEGORIES)[0]; tools: Tool[]; meta: any }>;
  }, [orderedCategories, searchQuery, activeCategory]);

  const totalFilteredCount = useMemo(
    () => filteredCategories.reduce((acc, curr) => acc + curr.tools.length, 0),
    [filteredCategories]
  );

  return (
    <div className="flex min-h-screen flex-col justify-between bg-zinc-50/50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100 font-sans selection:bg-blue-500 selection:text-white">
      <Header />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 pt-28 pb-24 sm:px-6 sm:pt-36">
        {/* Header Hero Section (Green badge removed as requested) */}
        <div className="space-y-4 max-w-4xl">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-6xl text-zinc-950 dark:text-zinc-50">
            Directory of All Tools
          </h1>
          <p className="text-base sm:text-lg leading-relaxed text-zinc-600 dark:text-zinc-400 max-w-2xl font-normal">
            Explore our entire suite of privacy-first utilities. Every tool executes directly in your browser with zero latency and zero server file uploads.
          </p>
        </div>

        {/* Search & Category Filter Controls (Normal flow, NO STICKY scroll overlay) */}
        <div className="mt-10 py-4 bg-transparent border-y border-zinc-200/80 dark:border-zinc-800/80 space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search tools by title or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-2xs"
              />
            </div>

            {/* Total Results Count */}
            <div className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 shrink-0 self-center">
              Showing <span className="text-zinc-950 dark:text-zinc-100 font-bold">{totalFilteredCount}</span> of {LIVE_TOOLS.length} tools
            </div>
          </div>

          {/* Category Navigation with Glassmorphic Scroll Arrows */}
          <div className="relative max-w-full group/nav" onMouseEnter={checkScrollState}>
            {/* Left Glass Scroll Button */}
            <div className={`absolute left-0 top-0 bottom-0 z-10 flex items-center pl-1 pr-6 bg-gradient-to-r from-zinc-50 via-zinc-50/90 to-transparent dark:from-zinc-950 dark:via-zinc-950/90 dark:to-transparent pointer-events-none rounded-l-xl transition-opacity duration-300 ${canScrollLeft ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
              <button
                type="button"
                onClick={() => handleScroll('left')}
                className="pointer-events-auto w-7 h-7 rounded-full bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 shadow-md hover:scale-110 active:scale-95 transition-all cursor-pointer flex items-center justify-center backdrop-blur-md"
                aria-label="Scroll left categories"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Category Row */}
            <div
              id="tools-category-scroll-container"
              onScroll={checkScrollState}
              className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth py-1 px-1"
            >
              <button
                onClick={() => setActiveCategory("all")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeCategory === "all"
                    ? "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 shadow-xs"
                    : "bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200/80 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                }`}
              >
                All Categories
              </button>
              {orderedCategories.map((cat) => {
                const count = liveToolsInCategory(cat.id).length;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      activeCategory === cat.id
                        ? "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 shadow-xs"
                        : "bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200/80 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    }`}
                  >
                    {CATEGORY_META[cat.id]?.name ?? cat.label}
                    <span className="ml-1.5 opacity-60 text-[10px] font-mono">{count}</span>
                  </button>
                );
              })}
            </div>

            {/* Right Glass Scroll Button */}
            <div className={`absolute right-0 top-0 bottom-0 z-10 flex items-center pr-1 pl-6 bg-gradient-to-l from-zinc-50 via-zinc-50/90 to-transparent dark:from-zinc-950 dark:via-zinc-950/90 dark:to-transparent pointer-events-none rounded-r-xl transition-opacity duration-300 ${canScrollRight ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
              <button
                type="button"
                onClick={() => handleScroll('right')}
                className="pointer-events-auto w-7 h-7 rounded-full bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 shadow-md hover:scale-110 active:scale-95 transition-all cursor-pointer flex items-center justify-center backdrop-blur-md"
                aria-label="Scroll right categories"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Directory Categories & Grid */}
        <div className="mt-10 space-y-16">
          {filteredCategories.length === 0 ? (
            <div className="py-20 text-center space-y-4 rounded-3xl border border-dashed border-zinc-300 dark:border-zinc-800 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-sm">
              <p className="text-base font-bold text-zinc-800 dark:text-zinc-200">
                No tools found for &quot;{searchQuery}&quot;
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto">
                Try searching for broader terms like &quot;calculator&quot;, &quot;pdf&quot;, or &quot;image&quot;.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("all");
                }}
                className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-500 transition-colors cursor-pointer"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            filteredCategories.map(({ cat, tools, meta }) => (
              <section key={cat.id} id={cat.id} className="scroll-mt-44 space-y-6">
                {/* Category Section Header */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-zinc-200/80 dark:border-zinc-800/80 pb-4 gap-2">
                  <div>
                    <h2 className="font-display text-2xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 flex items-center gap-2">
                      <Link href={`/category/${cat.id}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        {meta?.name ?? cat.label}
                      </Link>
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 font-mono">
                        {tools.length}
                      </span>
                    </h2>
                    {meta?.intro && (
                      <p className="mt-1 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 max-w-2xl">
                        {meta.intro}
                      </p>
                    )}
                  </div>
                  <Link
                    href={`/category/${cat.id}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline shrink-0"
                  >
                    Explore category <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* Premium World-Class Layout Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {tools.map((tool) => (
                    <Link
                      key={tool.id}
                      href={toolPath(tool.id)}
                      className="group relative flex flex-col justify-between p-6 rounded-3xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xs border border-zinc-200/80 dark:border-zinc-800/80 hover:border-blue-500/40 dark:hover:border-blue-500/40 shadow-xs hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                    >
                      {/* Top Subtle Hover Glow Bar */}
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="text-base font-extrabold text-zinc-950 dark:text-zinc-50 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors tracking-tight">
                            {tool.title}
                          </h3>
                          <div className="p-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800/80 text-zinc-400 group-hover:bg-blue-600 group-hover:text-white dark:group-hover:bg-blue-500 transition-all duration-200 shrink-0">
                            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </div>
                        </div>
                        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-2 font-normal">
                          {tool.description}
                        </p>
                      </div>

                      <div className="mt-5 pt-3 border-t border-zinc-100 dark:border-zinc-800/60 flex items-center justify-between text-[11px] text-zinc-400 font-medium">
                        <span className="group-hover:text-blue-600 dark:group-hover:text-blue-400 font-semibold transition-colors flex items-center gap-1">
                          Launch Tool &rarr;
                        </span>
                        <span className="text-[10px] uppercase font-mono tracking-wider opacity-60">
                          100% Local
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            ))
          )}
        </div>
      </main>

      <HoverFooter />
    </div>
  );
}
