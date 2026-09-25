import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CuratedFeasts } from './components/CuratedFeasts';
import { AlacarteSection } from './components/AlacarteSection';
import { OrderNotesSection } from './components/OrderNotesSection';
import { Footer } from './components/Footer';
import { OrderModal } from './components/OrderModal';

export default function App() {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState<boolean>(false);
  const [selectedFeastForOrder, setSelectedFeastForOrder] = useState<string>('');
  const [selectedAlacarteForOrder, setSelectedAlacarteForOrder] = useState<string>('');
  const [orderModalMode, setOrderModalMode] = useState<'curated' | 'custom'>('curated');

  const handleOpenOrder = (options?: {
    feastName?: string;
    alacarteItem?: string;
    mode?: 'curated' | 'custom';
  }) => {
    if (options?.alacarteItem) {
      setSelectedAlacarteForOrder(options.alacarteItem);
      setSelectedFeastForOrder('');
      setOrderModalMode('custom');
    } else if (options?.mode === 'custom') {
      setSelectedAlacarteForOrder('');
      setSelectedFeastForOrder('');
      setOrderModalMode('custom');
    } else if (options?.feastName) {
      setSelectedFeastForOrder(options.feastName);
      setSelectedAlacarteForOrder('');
      setOrderModalMode('curated');
    } else {
      setSelectedFeastForOrder('');
      setSelectedAlacarteForOrder('');
      setOrderModalMode('curated');
    }
    setIsOrderModalOpen(true);
  };

  const handleCloseOrder = () => {
    setIsOrderModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#5C6D36] font-body text-primary-foreground antialiased selection:bg-gold/30 selection:text-primary-foreground">
      {/* Top Header */}
      <Header onOpenOrder={() => handleOpenOrder()} />

      {/* Main Content Area */}
      <main id="top">
        {/* Hero Section & Large Feast Banner */}
        <Hero onOpenOrder={() => handleOpenOrder()} />

        {/* Curated Christmas Feasts Section */}
        <CuratedFeasts
          onSelectFeast={(name) =>
            handleOpenOrder({ feastName: name, mode: 'curated' })
          }
        />

        {/* Holiday À La Carte Menu Section */}
        <AlacarteSection
          onAddItem={(name) =>
            handleOpenOrder({
              alacarteItem: name || undefined,
              mode: 'custom',
            })
          }
        />

        {/* Packaging & Ordering Notes Section */}
        <OrderNotesSection onOpenOrder={() => handleOpenOrder()} />
      </main>

      {/* Page Footer */}
      <Footer />

      {/* Interactive Reservation / Order Modal */}
      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={handleCloseOrder}
        initialFeast={selectedFeastForOrder}
        initialAlacarteItem={selectedAlacarteForOrder}
        initialMode={orderModalMode}
      />
    </div>
  );
}
