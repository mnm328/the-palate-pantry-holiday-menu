import React from 'react';

interface HeroProps {
  onOpenOrder: (selectedItem?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenOrder }) => {
  return (
    <div className="bg-[#F8F3E6] text-[#3B2C25]">
      <section className="mx-auto max-w-7xl px-5 pb-9 pt-12 sm:pt-16 lg:px-8">
        {/* Holiday Menu Badge */}
        <div className="feast-reveal mb-7 flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-[#1A4B35] px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#F8F3E6] shadow-sm">
            Holiday Menu
          </span>
          <span className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#3B2C25]/75 font-semibold">
            Dec 15, 2026 — Jan 6, 2027
          </span>
        </div>

        {/* Hero Title with custom word colors */}
        <h1 className="feast-reveal font-display text-[clamp(3.2rem,8.5vw,7.2rem)] font-black leading-[0.92] tracking-tight">
          <span className="text-[#3B2C25]">A Feast</span>
          <br />
          <span className="text-berry">Worth</span> <span className="text-[#3B2C25]">the</span>{' '}
          <span className="text-[#1A4B35]">Wait.</span>
        </h1>

        {/* Subheading */}
        <p className="mt-7 max-w-2xl text-base sm:text-lg leading-relaxed text-[#3B2C25]/85">
          From comforting favorites to generous seafood spreads, our holiday menu
          is carefully crafted for the moments that bring everyone to the table.
        </p>

        {/* CTA Buttons */}
        <div className="mt-9 flex flex-wrap items-center gap-4">
          <a
            href="#feasts"
            className="inline-flex items-center justify-center rounded-full border-2 border-[#0d271a] bg-[#1A4B35] px-8 py-4 text-sm font-extrabold uppercase tracking-[0.12em] text-[#F8F3E6] shadow-[4px_4px_0px_#0d271a] transition-all duration-150 hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_#0d271a] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none hover:bg-[#153f2c]"
          >
            Explore the Feasts
          </a>
          <a
            href="#alacarte"
            className="inline-flex items-center justify-center rounded-full border-2 border-[#3B2C25]/25 bg-transparent px-8 py-4 text-sm font-extrabold uppercase tracking-[0.12em] text-[#3B2C25] transition-colors hover:bg-[#3B2C25] hover:text-[#F8F3E6] hover:border-[#3B2C25]"
          >
            À La Carte Menu
          </a>
        </div>
      </section>

      {/* Featured Holiday Spread Banner */}
      <section className="mx-auto max-w-7xl px-5 pb-16 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] border border-[#3B2C25]/10 shadow-lg">
          <img
            src="/assets/hero-section-table-spread.png"
            alt="The Palate Pantry Christmas feast table spread with elegant holiday dishes"
            width={1920}
            height={1080}
            loading="eager"
            referrerPolicy="no-referrer"
            className="aspect-[16/9] w-full object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent px-6 pb-6 pt-24 text-white sm:px-9 sm:pb-8">
            <p className="font-display text-2xl font-black sm:text-3xl tracking-tight text-white">
              Thoughtfully prepared. Generously shared.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
