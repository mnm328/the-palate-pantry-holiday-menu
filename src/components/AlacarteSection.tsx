import React from 'react';
import { Plus, UtensilsCrossed, Sparkles } from 'lucide-react';
import { alacarteCategories, AlacarteCategory, AlacarteItem } from '../data/menuData';

interface AlacarteSectionProps {
  onAddItem?: (itemName: string) => void;
}

export const AlacarteSection: React.FC<AlacarteSectionProps> = ({ onAddItem }) => {
  return (
    <section id="alacarte" className="scroll-mt-6 mx-auto max-w-7xl px-5 py-16 lg:px-8">
      {/* Section Header */}
      <div className="mb-12 flex flex-wrap items-end justify-between gap-6 border-b border-primary-foreground/15 pb-8">
        <div>
          <p className="mb-3 text-[11px] font-extrabold uppercase tracking-[0.2em] text-gold">
            Holiday À La Carte
          </p>
          <h2 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-black leading-none tracking-tight text-primary-foreground">
            Choose for your table
          </h2>
          <p className="mt-4 max-w-2xl text-sm sm:text-base leading-relaxed text-primary-foreground/80">
            Create your own customized feast by selecting individual holiday party trays.
            Selected beef, fish and seafood dishes carry a modest seasonal adjustment.
          </p>
        </div>

        {/* Create Your Own Menu CTA Button */}
        {onAddItem && (
          <button
            type="button"
            onClick={() => onAddItem('')}
            className="cursor-pointer inline-flex items-center gap-2 rounded-full border-2 border-gold bg-gold px-6 py-3.5 text-xs font-black uppercase tracking-[0.14em] text-cocoa shadow-[3px_3px_0px_#3B2C25] hover:bg-[#ebd27a] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-150"
          >
            <UtensilsCrossed className="size-4" />
            <span>Create Your Own Menu</span>
          </button>
        )}
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
                  className="flex items-start justify-between gap-3 py-3.5 first:pt-0 last:pb-0"
                >
                  <div className="flex-1 pr-2">
                    <p className="text-base sm:text-[17px] font-bold leading-snug text-cocoa">
                      {item.name}
                    </p>
                    {item.note && (
                      <p className="mt-0.5 text-xs text-cocoa/60 font-normal">
                        {item.note}
                      </p>
                    )}
                  </div>

                  {/* Pricing and Add to Order Action */}
                  <div className="shrink-0 text-right pt-0.5 flex flex-col sm:flex-row items-end sm:items-center gap-2">
                    <span className="text-xs sm:text-sm font-semibold tabular-nums text-forest">
                      {item.price}
                    </span>

                    {onAddItem && (
                      <button
                        type="button"
                        onClick={() => onAddItem(item.name)}
                        className="cursor-pointer inline-flex items-center gap-1 rounded-full bg-forest/10 hover:bg-forest text-forest hover:text-white px-2.5 py-1 text-[11px] font-extrabold tracking-wider uppercase transition-colors"
                        title={`Add ${item.name} to order`}
                      >
                        <Plus className="size-3" />
                        <span>Add</span>
                      </button>
                    )}
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

      {/* Bottom Custom Menu Banner */}
      {onAddItem && (
        <div className="mt-12 rounded-3xl border-2 border-gold/40 bg-cream/95 p-6 sm:p-8 text-cocoa shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="rounded-2xl bg-forest p-3 text-gold shrink-0">
              <Sparkles className="size-6" />
            </div>
            <div>
              <h3 className="font-display text-xl sm:text-2xl font-black text-forest">
                Custom Menu Selection
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-cocoa/80 max-w-xl">
                Curate your table your way! Select individual à la carte trays and assemble your exact holiday feast in our interactive order form.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onAddItem('')}
            className="cursor-pointer shrink-0 rounded-full bg-forest px-7 py-3.5 text-xs font-black uppercase tracking-[0.14em] text-white shadow-[3px_3px_0px_#0d271a] hover:bg-[#143e2b] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-150"
          >
            Build Your Menu Now
          </button>
        </div>
      )}
    </section>
  );
};
