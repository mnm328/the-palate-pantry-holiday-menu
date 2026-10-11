import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CuratedFeasts } from './components/CuratedFeasts';
import { AlacarteSection } from './components/AlacarteSection';
import { OrderNotesSection } from './components/OrderNotesSection';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-[#5C6D36] font-body text-primary-foreground antialiased selection:bg-gold/30 selection:text-primary-foreground">
      {/* Top Header */}
      <Header />

      {/* Main Content Area */}
      <main id="top">
        {/* Hero Section & Large Feast Banner */}
        <Hero />

        {/* Curated Christmas Feasts Section */}
        <CuratedFeasts />

        {/* Holiday À La Carte Menu Section */}
        <AlacarteSection />

        {/* Packaging & Ordering Notes Section */}
        <OrderNotesSection />
      </main>

      {/* Page Footer */}
      <Footer />
    </div>
  );
}
