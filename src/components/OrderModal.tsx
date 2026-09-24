import React, { useState, useEffect } from 'react';
import { X, Check, Calendar, MapPin, User, Phone, Sparkles } from 'lucide-react';
import { curatedFeasts, alacarteCategories } from '../data/menuData';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialFeast?: string;
}

export const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  onClose,
  initialFeast,
}) => {
  const [selectedFeast, setSelectedFeast] = useState<string>(initialFeast || '');
  const [orderType, setOrderType] = useState<'pickup' | 'delivery'>('delivery');
  const [date, setDate] = useState<string>('2026-12-24');
  const [time, setTime] = useState<string>('11:30');
  const [customerName, setCustomerName] = useState<string>('');
  const [contactNumber, setContactNumber] = useState<string>('');
  const [deliveryAddress, setDeliveryAddress] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  useEffect(() => {
    if (initialFeast) {
      setSelectedFeast(initialFeast);
    }
  }, [initialFeast]);

  if (!isOpen) return null;

  // Flatten all feasts for easy lookup
  const allFeasts = curatedFeasts.flatMap((c) =>
    c.feasts.map((f) => ({
      ...f,
      category: c.label,
    }))
  );

  const currentFeastObj = allFeasts.find((f) => f.name === selectedFeast);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setSelectedFeast('');
    setCustomerName('');
    setContactNumber('');
    setDeliveryAddress('');
    setNotes('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-cocoa/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative z-10 w-full max-w-2xl rounded-3xl bg-cream p-6 sm:p-8 text-cocoa shadow-2xl border-2 border-forest/20 my-8">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 rounded-full p-2 text-cocoa/50 hover:bg-forest/10 hover:text-cocoa transition-colors"
          aria-label="Close reservation form"
        >
          <X className="size-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="mb-6">
              <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-berry">
                The Palate Pantry · Holiday 2026–2027
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-black text-forest mt-1">
                Reserve Your Holiday Feast
              </h2>
              <p className="mt-1.5 text-xs sm:text-sm text-cocoa/70">
                Holiday trays are curated for 10–12 pax and packed ready for your festive celebration.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Select Feast Package */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-[0.12em] text-forest mb-1.5">
                  Select Curated Feast Package
                </label>
                <select
                  value={selectedFeast}
                  onChange={(e) => setSelectedFeast(e.target.value)}
                  className="w-full rounded-xl border border-forest/25 bg-ivory px-3.5 py-2.5 text-sm font-medium text-cocoa focus:border-forest focus:outline-none focus:ring-1 focus:ring-forest"
                  required
                >
                  <option value="">-- Choose a Curated Feast Package (10-12 pax) --</option>
                  {allFeasts.map((f) => (
                    <option key={f.name} value={f.name}>
                      {f.name} — {f.price} (for 10-12 pax) · {f.category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Show selected feast dishes preview */}
              {currentFeastObj && (
                <div className="rounded-2xl border border-forest/15 bg-ivory/80 p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-berry">
                      Included in this Feast (for 10-12 pax)
                    </p>
                    <span className="font-display text-base font-black text-forest">
                      {currentFeastObj.price}
                    </span>
                  </div>
                  <ul className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-cocoa/80">
                    {currentFeastObj.items.map((dish) => (
                      <li key={dish} className="flex items-center gap-1.5">
                        <span className="text-forest font-bold">·</span>
                        <span>{dish}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Date & Time Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-[0.12em] text-forest mb-1.5">
                    Celebration Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      min="2026-12-15"
                      max="2027-01-06"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full rounded-xl border border-forest/25 bg-ivory px-3.5 py-2 text-sm text-cocoa focus:border-forest focus:outline-none focus:ring-1 focus:ring-forest"
                      required
                    />
                  </div>
                  <span className="mt-1 block text-[10px] text-forest/70">
                    Holiday window: Dec 15, 2026 – Jan 6, 2027
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-[0.12em] text-forest mb-1.5">
                    Preferred Time
                  </label>
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full rounded-xl border border-forest/25 bg-ivory px-3.5 py-2 text-sm text-cocoa focus:border-forest focus:outline-none focus:ring-1 focus:ring-forest"
                    required
                  />
                </div>
              </div>

              {/* Order Mode (Pickup vs Delivery) */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-[0.12em] text-forest mb-1.5">
                  Fulfillment Option
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setOrderType('delivery')}
                    className={`flex items-center justify-center gap-2 rounded-xl py-2.5 px-3 text-xs font-bold tracking-wider uppercase transition-all ${
                      orderType === 'delivery'
                        ? 'bg-forest text-primary-foreground shadow-sm'
                        : 'border border-forest/20 bg-ivory text-cocoa/75 hover:bg-forest/5'
                    }`}
                  >
                    <MapPin className="size-4" />
                    Delivery
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrderType('pickup')}
                    className={`flex items-center justify-center gap-2 rounded-xl py-2.5 px-3 text-xs font-bold tracking-wider uppercase transition-all ${
                      orderType === 'pickup'
                        ? 'bg-forest text-primary-foreground shadow-sm'
                        : 'border border-forest/20 bg-ivory text-cocoa/75 hover:bg-forest/5'
                    }`}
                  >
                    <User className="size-4" />
                    Store Pickup
                  </button>
                </div>
              </div>

              {/* Customer Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-[0.12em] text-forest mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Maria Santos"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full rounded-xl border border-forest/25 bg-ivory px-3.5 py-2 text-sm text-cocoa focus:border-forest focus:outline-none focus:ring-1 focus:ring-forest"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-[0.12em] text-forest mb-1.5">
                    Contact Phone / Viber
                  </label>
                  <input
                    type="tel"
                    placeholder="0917 123 4567"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    className="w-full rounded-xl border border-forest/25 bg-ivory px-3.5 py-2 text-sm text-cocoa focus:border-forest focus:outline-none focus:ring-1 focus:ring-forest"
                    required
                  />
                </div>
              </div>

              {/* Address (if delivery) */}
              {orderType === 'delivery' && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-[0.12em] text-forest mb-1.5">
                    Delivery Address
                  </label>
                  <input
                    type="text"
                    placeholder="Street, Barangay, City, Landmark"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    className="w-full rounded-xl border border-forest/25 bg-ivory px-3.5 py-2 text-sm text-cocoa focus:border-forest focus:outline-none focus:ring-1 focus:ring-forest"
                    required={orderType === 'delivery'}
                  />
                </div>
              )}

              {/* Special Instructions */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-[0.12em] text-forest mb-1.5">
                  Special Notes or Wing Flavors (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Classic Buffalo wings flavor, gate code, gate contact..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full rounded-xl border border-forest/25 bg-ivory px-3.5 py-2 text-xs text-cocoa focus:border-forest focus:outline-none focus:ring-1 focus:ring-forest resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full cursor-pointer rounded-full bg-berry py-3.5 px-6 text-center text-sm font-extrabold uppercase tracking-[0.12em] text-destructive-foreground shadow-[0_5px_0_color-mix(in_oklab,var(--destructive)_65%,black)] transition-transform hover:-translate-y-0.5 active:translate-y-0 active:shadow-none"
                >
                  Confirm Reservation Inquiry
                </button>
                <p className="mt-2 text-center text-[11px] text-cocoa/60">
                  Fixed set menus without substitutions. Our kitchen will confirm slot availability via phone/Viber.
                </p>
              </div>
            </form>
          </div>
        ) : (
          <div className="py-8 text-center">
            <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-forest text-primary-foreground mb-4">
              <Check className="size-7" />
            </div>

            <h3 className="font-display text-2xl sm:text-3xl font-black text-forest">
              Reservation Inquiry Received!
            </h3>
            <p className="mt-2 text-sm text-cocoa/75 max-w-md mx-auto">
              Thank you, <span className="font-bold text-cocoa">{customerName}</span>.
              We have noted your reservation for <span className="font-bold text-forest">{selectedFeast}</span> (for 10-12 pax) for{' '}
              <span className="font-bold">{date}</span> at <span className="font-bold">{time}</span>.
            </p>

            <div className="mt-6 mx-auto max-w-sm rounded-2xl bg-ivory p-4 border border-forest/15 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-cocoa/60">Package:</span>
                <span className="font-bold text-cocoa">{selectedFeast}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-cocoa/60">Serving:</span>
                <span className="font-semibold text-forest">10–12 pax</span>
              </div>
              <div className="flex justify-between">
                <span className="text-cocoa/60">Estimated Total:</span>
                <span className="font-bold text-forest">{currentFeastObj?.price}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-cocoa/60">Fulfillment:</span>
                <span className="capitalize font-semibold text-cocoa">{orderType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-cocoa/60">Contact:</span>
                <span className="font-semibold text-cocoa">{contactNumber}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleReset}
              className="mt-8 rounded-full bg-forest px-8 py-3 text-xs font-extrabold uppercase tracking-[0.14em] text-primary-foreground hover:bg-forest/90 transition-colors"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
