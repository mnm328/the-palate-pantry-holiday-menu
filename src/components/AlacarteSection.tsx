import React from 'react';
import { alacarteCategories, AlacarteCategory, AlacarteItem } from '../data/menuData';

interface AlacarteSectionProps {
  onAddItem?: (itemName: string) => void;
}

export const AlacarteSection: React.FC<AlacarteSectionProps> = ({ onAddItem }) => {
  return (
    <section id="alacarte" className="scroll-mt-6 mx-auto max-w-7xl px-5 py-16 lg:px-8">
      {/* Section Header */}
      <div className="mb-12">
        <p className="mb-3 text-[11px] font-extrabold uppercase tracking-[0.2em] text-gold">
          Holiday À La Carte
        </p>
        <h2 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-black leading-none tracking-tight text-primary-foreground">
          Choose for your table
        </h2>
        <p className="mt-4 max-w-2xl text-sm sm:text-base leading-relaxed text-primary-foreground/80">
          Selected beef, fish and seafood dishes carry a modest seasonal adjustment.
          All other categories retain regular menu prices.
        </p>
      </div>

      {/* Grid of Dish Categories */}
      <div className="grid items-start gap-6 lg:grid-cols-2">
        {alacarteCategories.map((category: AlacarteCategory) => (
          <article
            key={category.title}
            className="rounded-2xl bg-cream p-6 sm:p-7 shadow-md transition-shadow hover:shadow-lg text-cocoa"
          >
            <div className="mb-5 flex flex-wrap items-center justify-between gap-2 border-b border-soft-line/60 pb-3">
              <h3 className="font-display text-2xl font-black tracking-tight text-forest">
                {category.title}
              </h3>
              {category.seasonal && (
                <span className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-berry font-bold">
                  Seasonal Adjustment
                </span>
              )}
            </div>

            <ul className="divide-y divide-soft-line/70">
              {category.items.map((item: AlacarteItem) => (
                <li
                  key={item.name}
                  className="flex items-start justify-between gap-4 py-3.5 first:pt-0 last:pb-0"
                >
                  <div className="flex-1">
                    <p className="text-base sm:text-[17px] font-bold leading-snug text-cocoa">
                      {item.name}
                    </p>
                    {item.note && (
                      <p className="mt-0.5 text-xs text-cocoa/60 font-normal">
                        {item.note}
                      </p>
                    )}
                  </div>

                  {/* Pricing text */}
                  <div className="shrink-0 text-right pt-0.5">
                    <span className="text-xs sm:text-sm font-semibold tabular-nums text-forest">
                      {item.price}
                    </span>
                  </div>
                </li>
              ))}
            </ul>

            {category.footnote && (
              <p className="mt-5 border-t border-soft-line/70 pt-4 text-xs leading-relaxed text-cocoa/65 italic">
                {category.footnote}
              </p>
            )}
          </article>
        ))}
      </div>
    </section>
  );
};

