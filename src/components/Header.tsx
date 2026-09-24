import React from 'react';

interface HeaderProps {
  onOpenOrder: (selectedItem?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenOrder }) => {
  return (
    <header className="sticky top-0 z-40 border-b border-[#3B2C25]/10 bg-[#F8F3E6] shadow-xs">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-2 sm:py-2.5 lg:px-8">
        {/* Brand Logo - 20% smaller */}
        <a
          href="#top"
          className="flex items-center transition-opacity hover:opacity-90"
          aria-label="The Palate Pantry"
        >
          <img
            src="/assets/Logo.png"
            alt="The Palate Pantry"
            className="h-[70px] sm:h-[90px] w-auto object-contain"
            onError={(e) => {
              const target = e.currentTarget;
              if (!target.src.endsWith('/assets/Logo.svg')) {
                target.src = '/assets/Logo.svg';
              }
            }}
          />
        </a>

        {/* Zone 2: Navigation Links */}
        <nav
          className="hidden items-center gap-7 text-xs font-extrabold uppercase tracking-[0.14em] lg:flex"
          aria-label="Main navigation"
        >
          <a
            href="#top"
            className="text-[#3B2C25]/75 transition-colors hover:text-[#1A4B35]"
          >
            Home
          </a>
          <a
            href="#feasts"
            className="text-[#3B2C25]/75 transition-colors hover:text-[#1A4B35]"
          >
            Curated Feasts
          </a>
          <a
            href="#alacarte"
            className="text-[#3B2C25]/75 transition-colors hover:text-[#1A4B35]"
          >
            À La Carte
          </a>
          <a
            href="#order"
            className="text-[#1A4B35] transition-colors hover:text-[#143c2a]"
          >
            Ordering Notes
          </a>
        </nav>

        {/* Zone 3: Direct Order CTA */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onOpenOrder()}
            className="cursor-pointer rounded-full bg-berry px-5 py-2.5 text-xs font-black uppercase tracking-[0.14em] text-[#F8F3E6] shadow-sm shadow-berry/30 transition-transform hover:-translate-y-0.5 active:translate-y-0 hover:bg-[#781922]"
          >
            Order now
          </button>
        </div>
      </div>
    </header>
  );
};
