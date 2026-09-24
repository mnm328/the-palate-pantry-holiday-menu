import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.3fr_0.65fr_0.8fr] gap-[7vw] bg-[#281b15] text-[#f8f1e6] px-[clamp(22px,7vw,110px)] pt-[75px] pb-[35px]">
      <div>
        <img
          src="/images/logo.png"
          alt="The Palate Pantry"
          className="w-[120px] rounded-full bg-[#fffdf8] p-1.5 object-contain"
          onError={(e) => {
            const target = e.currentTarget;
            if (!target.src.endsWith('/assets/Logo.png')) {
              target.src = '/assets/Logo.png';
            }
          }}
        />
        <p className="mt-4 max-w-[330px] text-[0.95rem] text-[#cdbfb2] leading-relaxed">
          Bringing the Comfort of Home to Every Table.
        </p>
        <div className="footer-details mt-[18px] grid gap-1 text-[0.88rem] text-[#cdbfb2]">
          <span>Marikina City · Marikina Heights</span>
          <a href="tel:+639165648511" className="font-bold text-[#f8f1e6] hover:underline">
            0916 564 8511
          </a>
          <div className="footer-hours mt-3 grid gap-0.5">
            <strong className="text-[#f8f1e6] font-bold">Ordering hours</strong>
            <span>Monday–Friday</span>
            <span>8:00 AM–5:00 PM</span>
            <span>Saturday</span>
            <span>8:00 AM–12:00 NN</span>
          </div>
        </div>
      </div>

      <div>
        <b className="mb-[18px] block text-[0.78rem] font-bold uppercase tracking-[0.14em] text-[#c69a45]">
          Explore
        </b>
        <div className="space-y-[9px] text-[0.92rem]">
          <a href="/menu" className="block text-[#e9dfd4] transition-colors hover:text-white">Our Menu</a>
          <a href="/#best-sellers" className="block text-[#e9dfd4] transition-colors hover:text-white">Best Sellers</a>
          <a href="/catering" className="block text-[#e9dfd4] transition-colors hover:text-white">Catering</a>
          <a href="/about" className="block text-[#e9dfd4] transition-colors hover:text-white">Our Story</a>
          <a href="/#reviews" className="block text-[#e9dfd4] transition-colors hover:text-white">Reviews</a>
          <a href="/faq" className="block text-[#e9dfd4] transition-colors hover:text-white">FAQ</a>
          <a href="/contact" className="block text-[#e9dfd4] transition-colors hover:text-white">Contact</a>
        </div>
      </div>

      <div>
        <b className="mb-[18px] block text-[0.78rem] font-bold uppercase tracking-[0.14em] text-[#c69a45]">
          Plan a meal
        </b>
        <div className="space-y-[9px] text-[0.92rem]">
          <a href="/menu" className="block text-[#e9dfd4] transition-colors hover:text-white">Browse the menu</a>
          <a href="/catering" className="block text-[#e9dfd4] transition-colors hover:text-white">Request catering</a>
          <a href="/contact" className="block text-[#e9dfd4] transition-colors hover:text-white">Send an inquiry</a>
        </div>
      </div>

      <p className="copyright col-span-full mt-5 border-t border-[#4f3e35] pt-7 text-[0.8rem] text-[#cdbfb2]">
        © 2026 The Palate Pantry. Food made with care, shared with love.
      </p>
    </footer>
  );
};
