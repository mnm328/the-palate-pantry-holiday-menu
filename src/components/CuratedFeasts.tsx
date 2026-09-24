import React, { useState } from 'react';
import { curatedFeasts, FeastCategory, FeastItem } from '../data/menuData';

interface CuratedFeastsProps {
  onSelectFeast: (feastName: string) => void;
}

function parsePrice(priceStr: string): number {
  return parseInt(priceStr.replace(/[^0-9]/g, ''), 10) || 0;
}

// Arrange set cards per category: mid-priced, highest priced, lowest priced
function sortMidHighLow(feasts: FeastItem[]): FeastItem[] {
  if (feasts.length !== 3) return feasts;
  const sorted = [...feasts].sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
  // sorted is [0: lowest, 1: mid, 2: highest]
  // Target order: mid-priced, highest priced, lowest priced
  return [sorted[1], sorted[2], sorted[0]];
}

export const CuratedFeasts: React.FC<CuratedFeastsProps> = ({ onSelectFeast }) => {
  const [activeSpread, setActiveSpread] = useState<FeastItem | null>(null);

  return (
    <section id="feasts" className="scroll-mt-6 bg-[#5C6D36] text-primary-foreground">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 flex flex-wrap items-end justify-between gap-5 border-b border-primary-foreground/15 pb-8">
          <div>
            <p className="mb-3 text-[11px] font-extrabold uppercase tracking-[0.2em] text-gold">
              Curated Christmas Feasts
            </p>
            <h2 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-black leading-none tracking-tight">
              Twelve ways to celebrate
            </h2>
          </div>
          <div className="max-w-md text-left text-sm leading-relaxed text-primary-foreground/90">
            <p className="font-semibold text-primary-foreground">
              Perfectly paired fixed sets for a complete holiday table.
            </p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-gold">
              Individual dishes are not interchangeable.
            </p>
          </div>
        </div>

        {/* Categories List */}
        <div className="space-y-16">
          {curatedFeasts.map((category: FeastCategory, t: number) => {
            // Sort feasts: mid-priced, highest priced, lowest priced
            const sortedFeasts = sortMidHighLow(category.feasts);

            return (
              <div key={category.label}>
                {/* Category Header */}
                <div className="mb-6 flex items-center gap-4">
                  <span className="font-display text-2xl font-black text-gold">
                    0{t + 1}
                  </span>
                  <h3 className="text-xs font-extrabold uppercase tracking-[0.2em] text-primary-foreground">
                    {category.label}
                  </h3>
                  <span className="h-px flex-1 bg-primary-foreground/20" />
                </div>

                {/* Cards Grid */}
                <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
                  {sortedFeasts.map((feast: FeastItem) => {
                    const isBerryCard = feast.name === 'Ultimate Holiday Table' || feast.name === 'The Palate Pantry Signature';
                    const isGoldCard = feast.name === 'Grand Seafood Christmas';

                    // Background color styling: Ultimate Holiday Table is the same berry color as The Palate Pantry Signature
                    const cardBgClass = isBerryCard
                      ? 'bg-berry text-destructive-foreground'
                      : isGoldCard
                      ? 'bg-gold text-cocoa'
                      : 'bg-cream text-cocoa';

                    // Button styling with 3D tactile push effect
                    // For the Grand Christmas Feast selections, make all the buttons on the three set cards be the same color as its background.
                    const primaryBtnClass = isBerryCard
                      ? 'bg-berry text-gold border-2 border-gold shadow-[3px_3px_0px_#450f16] hover:bg-[#852323] hover:text-white active:translate-x-[2px] active:translate-y-[2px] active:shadow-none'
                      : isGoldCard
                      ? 'bg-gold text-cocoa border-2 border-cocoa shadow-[3px_3px_0px_#3B2C25] hover:bg-[#e0bc75] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none'
                      : 'bg-[#1A4B35] text-white border-2 border-[#0d271a] shadow-[3px_3px_0px_#0d271a] hover:bg-[#153f2c] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none';

                    const viewSpreadBtnClass = isBerryCard
                      ? 'bg-berry text-white border border-white/40 hover:bg-white/10 active:translate-x-[1px] active:translate-y-[1px]'
                      : isGoldCard
                      ? 'bg-gold text-cocoa border border-cocoa/30 hover:bg-cocoa/10 active:translate-x-[1px] active:translate-y-[1px]'
                      : 'border border-current/30 hover:bg-current/10';

                    return (
                      <article
                        key={feast.name}
                        className={`group flex min-h-72 flex-col justify-between overflow-hidden rounded-3xl ${
                          feast.image ? 'p-0' : 'p-7'
                        } ${cardBgClass} border-2 border-[#1c240e] shadow-[6px_6px_0px_#18200c] transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[8px_8px_0px_#18200c]`}
                      >
                        <div>
                          {feast.image && (
                            <div
                              onClick={() => setActiveSpread(feast)}
                              className="relative cursor-pointer overflow-hidden group/img"
                              title="Click to view full spread"
                            >
                              <img
                                src={feast.image}
                                alt={`${feast.name} table spread`}
                                width={800}
                                height={600}
                                loading="lazy"
                                className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover/img:scale-105"
                              />
                              {/* Overlay badge inviting user to view spread */}
                              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-200 group-hover/img:opacity-100">
                                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-4 py-2 text-xs font-black uppercase tracking-wider text-cocoa shadow-md backdrop-blur-xs">
                                  <svg className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                  </svg>
                                  View Spread
                                </span>
                              </div>
                            </div>
                          )}

                          <div className={feast.image ? 'p-7 pb-2' : ''}>
                            <div className="mb-2 flex items-start justify-between gap-4">
                              <span
                                className={`text-[10px] font-extrabold uppercase tracking-[0.18em] ${
                                  isBerryCard ? 'text-gold' : 'text-berry'
                                }`}
                              >
                                {category.label}
                              </span>
                            </div>

                            <h4 className="font-display text-2xl font-black leading-tight tracking-tight">
                              {feast.name}
                            </h4>

                            <p
                              className={`mt-1 text-[11px] font-bold uppercase tracking-wider ${
                                isBerryCard
                                  ? 'text-destructive-foreground/75'
                                  : 'text-cocoa/60'
                              }`}
                            >
                              <span>{feast.price}</span> · <span>for 10-12 pax</span>
                            </p>

                            <ul className="mt-5 space-y-2.5 text-sm">
                              {feast.items.map((item: string) => (
                                <li key={item} className="flex items-start gap-2.5">
                                  <span
                                    className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${
                                      isBerryCard
                                        ? 'bg-gold'
                                        : isGoldCard
                                        ? 'bg-berry'
                                        : 'bg-primary'
                                    }`}
                                  />
                                  <span className="font-medium leading-snug">{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Action buttons with 3D tactile effect */}
                        <div className={`mt-5 space-y-2 pt-4 border-t border-current/10 ${feast.image ? 'px-7 pb-7 pt-4' : ''}`}>
                          {/* View Spread Button */}
                          <button
                            type="button"
                            onClick={() => setActiveSpread(feast)}
                            className={`flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-full py-2.5 text-[11px] font-extrabold uppercase tracking-[0.14em] transition-colors ${viewSpreadBtnClass}`}
                          >
                            <svg className="size-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
                            View Spread
                          </button>

                          {/* Reserve This Feast Button */}
                          <button
                            type="button"
                            onClick={() => onSelectFeast(feast.name)}
                            className={`w-full cursor-pointer rounded-full py-3.5 text-xs font-black uppercase tracking-[0.14em] transition-all duration-150 ${primaryBtnClass}`}
                          >
                            RESERVE THIS FEAST
                          </button>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* View Spread Lightbox Modal */}
      {activeSpread && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setActiveSpread(null)}
        >
          <div
            className="relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border-2 border-[#1c240e] bg-cream text-cocoa shadow-[10px_10px_0px_#000000]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-cocoa/10 px-6 py-4 bg-[#F8F3E6]">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-berry">
                  Holiday Table Spread
                </span>
                <h3 className="font-display text-2xl font-black text-cocoa">
                  {activeSpread.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveSpread(null)}
                className="grid size-9 place-items-center rounded-full bg-cocoa/10 text-cocoa transition-colors hover:bg-cocoa/20 cursor-pointer"
                aria-label="Close spread view"
              >
                ✕
              </button>
            </div>

            {/* Modal Image & Feast Details */}
            <div className="overflow-y-auto p-6 space-y-6">
              {activeSpread.image && (
                <div className="overflow-hidden rounded-2xl border border-cocoa/15 shadow-inner">
                  <img
                    src={activeSpread.image}
                    alt={`${activeSpread.name} Table Spread`}
                    className="aspect-[16/10] w-full object-cover"
                  />
                </div>
              )}

              <div className="flex flex-wrap items-center justify-between gap-4 border-y border-cocoa/10 py-4">
                <div>
                  <span className="font-display text-2xl font-black text-cocoa">
                    {activeSpread.price}
                  </span>{' '}
                  <span className="text-xs font-semibold uppercase tracking-wider text-cocoa/70">
                    · Serves 10–12 Guests
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const name = activeSpread.name;
                    setActiveSpread(null);
                    onSelectFeast(name);
                  }}
                  className="cursor-pointer rounded-full border-2 border-[#0d271a] bg-[#1A4B35] px-7 py-3 text-xs font-black uppercase tracking-[0.14em] text-[#F8F3E6] shadow-[3px_3px_0px_#0d271a] transition-all hover:bg-[#153f2c] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
                >
                  RESERVE THIS FEAST
                </button>
              </div>

              <div>
                <h4 className="mb-3 text-xs font-black uppercase tracking-[0.16em] text-berry">
                  Dishes Included in this Holiday Spread
                </h4>
                <div className="grid gap-2 sm:grid-cols-2">
                  {activeSpread.items.map((item: string) => (
                    <div
                      key={item}
                      className="flex items-center gap-2.5 rounded-xl border border-cocoa/10 bg-white/70 px-4 py-2.5 text-xs font-bold text-cocoa"
                    >
                      <span className="size-2 rounded-full bg-[#1A4B35]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
