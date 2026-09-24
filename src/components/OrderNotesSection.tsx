import React from 'react';

interface OrderNotesSectionProps {
  onOpenOrder: () => void;
}

export const OrderNotesSection: React.FC<OrderNotesSectionProps> = ({ onOpenOrder }) => {
  return (
    <section id="order" className="scroll-mt-6 bg-[#F8F3E6] text-[#3B2C25]">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 lg:grid-cols-5 lg:px-8">
        {/* Left Information Column */}
        <div className="flex flex-col justify-between lg:col-span-3">
          <div>
            <p className="mb-3 text-[11px] font-extrabold uppercase tracking-[0.2em] text-berry">
              A little holiday magic
            </p>
            <h2 className="font-display text-[clamp(2.5rem,5vw,4.2rem)] font-black leading-none tracking-tight text-[#3B2C25]">
              Your feast, wrapped with care.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[#3B2C25]/85">
              Holiday Edition food trays come with clear fitted lids and Christmas branding,
              ready to arrive at your celebration without the fuss of re-plating.
            </p>
          </div>

          {/* Feature Highlights */}
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border-2 border-[#3B2C25]/15 bg-white/90 p-5 shadow-[4px_4px_0px_rgba(59,44,37,0.08)]">
              <p className="font-display text-base font-black text-forest">
                Ready-to-Serve Packaging
              </p>
              <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-[#3B2C25]/80">
                Sturdy aluminum trays with holiday covers that keep food warm and look beautiful on any dining table.
              </p>
            </div>

            <div className="rounded-2xl border-2 border-[#3B2C25]/15 bg-white/90 p-5 shadow-[4px_4px_0px_rgba(59,44,37,0.08)]">
              <p className="font-display text-base font-black text-forest">
                Reheating Guides
              </p>
              <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-[#3B2C25]/80">
                Clear temperature and timing instructions included with every delivery for effortless hosting.
              </p>
            </div>
          </div>
        </div>

        {/* Right Ordering Notes Card */}
        <aside className="flex flex-col justify-between rounded-[2rem] bg-berry p-7 sm:p-9 text-white border-2 border-[#450f16] shadow-[6px_6px_0px_#450f16] lg:col-span-2">
          <div>
            <p className="mb-3 text-[11px] font-extrabold uppercase tracking-[0.2em] text-gold">
              Holiday Ordering Notes
            </p>
            <h3 className="font-display text-3xl font-black leading-tight tracking-tight">
              Before you order
            </h3>

            <ol className="mt-7 space-y-4 text-sm leading-relaxed text-white/90">
              <li className="flex gap-3">
                <b className="font-display font-black text-gold">01</b>
                <span>
                  Holiday rates apply to orders scheduled December 15, 2026 through January 6, 2027.
                </span>
              </li>
              <li className="flex gap-3">
                <b className="font-display font-black text-gold">02</b>
                <span>
                  Christmas Feast combinations are fixed sets no substitutions.
                </span>
              </li>
              <li className="flex gap-3">
                <b className="font-display font-black text-gold">03</b>
                <span>
                  Wings may be Classic Buffalo, Honey Mustard or Asian Style unless a flavor is specified.
                </span>
              </li>
              <li className="flex gap-3">
                <b className="font-display font-black text-gold">04</b>
                <span>
                  Christmas Sharing salads are exclusive to selected feast packages.
                </span>
              </li>
            </ol>
          </div>

          <button
            type="button"
            onClick={onOpenOrder}
            className="mt-8 w-full cursor-pointer rounded-full bg-gold px-6 py-4 text-center text-sm font-black uppercase tracking-[0.14em] text-cocoa border-2 border-[#5c1616] shadow-[3px_3px_0px_#5c1616] hover:bg-[#ebd27a] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-150"
          >
            Start Your Order
          </button>
        </aside>
      </div>
    </section>
  );
};
