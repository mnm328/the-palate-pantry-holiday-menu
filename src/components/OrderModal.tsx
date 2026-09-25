import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  X,
  Check,
  Calendar,
  MapPin,
  User,
  Phone,
  Mail,
  Sparkles,
  Plus,
  Minus,
  Trash2,
  Search,
  UtensilsCrossed,
  ShoppingBag,
  ChefHat,
  CreditCard,
  QrCode,
  UploadCloud,
  FileText,
  CheckCircle2,
  Copy,
  CheckCheck,
  ArrowLeft,
  Clock,
  MessageSquare,
  ShieldCheck,
  AlertCircle,
  ChevronDown
} from 'lucide-react';
import { curatedFeasts, alacarteCategories, AlacarteItem } from '../data/menuData';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialFeast?: string;
  initialAlacarteItem?: string;
  initialMode?: 'curated' | 'custom';
}

function parsePrice(priceStr?: string): number {
  if (!priceStr) return 0;
  const match = priceStr.replace(/,/g, '').match(/\d+/);
  return match ? parseInt(match[0], 10) : 0;
}

function formatCurrency(amount: number): string {
  return '₱' + amount.toLocaleString('en-PH');
}

export const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  onClose,
  initialFeast,
  initialAlacarteItem,
  initialMode = 'curated',
}) => {
  // Step progression: 'form' -> 'summary' -> 'thank_you'
  const [orderStep, setOrderStep] = useState<'form' | 'summary' | 'thank_you'>('form');

  // Order Mode: 'curated' (Fixed Feast Package) vs 'custom' (Create Your Own Menu from À La Carte)
  const [orderMode, setOrderMode] = useState<'curated' | 'custom'>(initialMode);

  // Selected Curated Feast
  const [selectedFeast, setSelectedFeast] = useState<string>(initialFeast || '');

  // Selected À La Carte items with quantities: { [dishName]: quantity }
  const [selectedAlacarte, setSelectedAlacarte] = useState<Record<string, number>>({});

  // Show extra add-ons section even when on Curated Feast tab
  const [showFeastAddons, setShowFeastAddons] = useState<boolean>(false);

  // À La Carte Search & Filter State
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Customer & Fulfillment state
  const [orderType, setOrderType] = useState<'pickup' | 'delivery'>('delivery');
  const [date, setDate] = useState<string>('2026-12-24');
  const [time, setTime] = useState<string>('11:30');
  const [customerName, setCustomerName] = useState<string>('');
  const [contactNumber, setContactNumber] = useState<string>('');
  const [customerEmail, setCustomerEmail] = useState<string>('');
  const [deliveryAddress, setDeliveryAddress] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Payment & Transaction Receipt State (Required before submitting)
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [receiptPreview, setReceiptPreview] = useState<string | null>(null);
  const [referenceNumber, setReferenceNumber] = useState<string>('');
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [receiptError, setReceiptError] = useState<string>('');
  const [orderRefNumber, setOrderRefNumber] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Flatten all feasts for easy lookup
  const allFeasts = useMemo(() => {
    return curatedFeasts.flatMap((c) =>
      c.feasts.map((f) => ({
        ...f,
        category: c.label,
        parsedPrice: parsePrice(f.price),
      }))
    );
  }, []);

  // Flatten all à la carte dishes for lookup & search
  const allAlacarteDishes = useMemo(() => {
    return alacarteCategories.flatMap((category) =>
      category.items.map((item) => ({
        ...item,
        categoryTitle: category.title,
        parsedPrice: parsePrice(item.price),
      }))
    );
  }, []);

  // Handle incoming props when modal opens or initial items change
  useEffect(() => {
    if (initialMode) {
      setOrderMode(initialMode);
    }
    if (initialFeast) {
      setSelectedFeast(initialFeast);
      setOrderMode('curated');
    }
    if (initialAlacarteItem) {
      setOrderMode('custom');
      setSelectedAlacarte((prev) => ({
        ...prev,
        [initialAlacarteItem]: (prev[initialAlacarteItem] || 0) + 1,
      }));
    }
  }, [initialFeast, initialAlacarteItem, initialMode, isOpen]);

  // Clean up object URL when component unmounts
  useEffect(() => {
    return () => {
      if (receiptPreview) {
        URL.revokeObjectURL(receiptPreview);
      }
    };
  }, [receiptPreview]);

  if (!isOpen) return null;

  const currentFeastObj = allFeasts.find((f) => f.name === selectedFeast);

  // Filtered dishes for Create Your Own Menu
  const filteredDishes = allAlacarteDishes.filter((dish) => {
    const matchesCategory =
      activeCategoryFilter === 'All' || dish.categoryTitle === activeCategoryFilter;
    const matchesSearch =
      searchQuery.trim() === '' ||
      dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dish.categoryTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (dish.note && dish.note.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Calculate totals
  const feastPrice =
    orderMode === 'curated' && currentFeastObj ? currentFeastObj.parsedPrice : 0;

  const alacarteTotal = Object.entries(selectedAlacarte).reduce((sum, [dishName, qty]) => {
    const dish = allAlacarteDishes.find((d) => d.name === dishName);
    return sum + (dish ? dish.parsedPrice * qty : 0);
  }, 0);

  const totalAlacarteTraysCount = Object.values(selectedAlacarte).reduce(
    (acc, q) => acc + q,
    0
  );

  const grandTotal = feastPrice + alacarteTotal;

  // Quantity controllers for à la carte
  const handleAddAlacarte = (dishName: string) => {
    setSelectedAlacarte((prev) => ({
      ...prev,
      [dishName]: (prev[dishName] || 0) + 1,
    }));
    setErrorMessage('');
  };

  const handleDecreaseAlacarte = (dishName: string) => {
    setSelectedAlacarte((prev) => {
      const current = prev[dishName] || 0;
      if (current <= 1) {
        const next = { ...prev };
        delete next[dishName];
        return next;
      }
      return {
        ...prev,
        [dishName]: current - 1,
      };
    });
  };

  const handleRemoveAlacarte = (dishName: string) => {
    setSelectedAlacarte((prev) => {
      const next = { ...prev };
      delete next[dishName];
      return next;
    });
  };

  // Receipt File upload handling
  const handleFileSelect = (file: File) => {
    if (!file) return;
    setReceiptFile(file);
    setReceiptError('');

    if (file.type.startsWith('image/')) {
      const previewUrl = URL.createObjectURL(file);
      setReceiptPreview(previewUrl);
    } else {
      setReceiptPreview(null);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleRemoveReceipt = () => {
    if (receiptPreview) {
      URL.revokeObjectURL(receiptPreview);
    }
    setReceiptFile(null);
    setReceiptPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleCopyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAccount(label);
    setTimeout(() => {
      setCopiedAccount(null);
    }, 2000);
  };

  // Submit initial order form to show Order Summary
  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (orderMode === 'curated' && !selectedFeast) {
      setErrorMessage('Please select a Curated Feast Package.');
      return;
    }

    if (orderMode === 'custom' && totalAlacarteTraysCount === 0) {
      setErrorMessage(
        'Please select at least one à la carte dish to create your custom feast.'
      );
      return;
    }

    if (!customerEmail.trim()) {
      setErrorMessage('Please provide your email address to receive order confirmations.');
      return;
    }

    setOrderStep('summary');
  };

  // Final submission from Order Summary - REQUIRES PAYMENT RECEIPT
  const handleFinalSubmitOrder = () => {
    if (!receiptFile) {
      setReceiptError('Payment receipt is required before submitting. Please upload your transaction screenshot or receipt.');
      return;
    }

    // Generate random confirmation reference
    const randomId = Math.floor(1000 + Math.random() * 9000).toString();
    setOrderRefNumber(`PP-${randomId}`);
    setReceiptError('');
    setOrderStep('thank_you');
  };

  const handleReset = () => {
    if (receiptPreview) {
      URL.revokeObjectURL(receiptPreview);
    }
    setReceiptFile(null);
    setReceiptPreview(null);
    setReferenceNumber('');
    setReceiptError('');
    setOrderRefNumber('');
    setOrderStep('form');
    setSelectedFeast('');
    setSelectedAlacarte({});
    setCustomerName('');
    setContactNumber('');
    setCustomerEmail('');
    setDeliveryAddress('');
    setNotes('');
    setErrorMessage('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-3xl bg-[#FAF6EC] p-5 sm:p-7 shadow-2xl border-2 border-[#5C6D36]/30 max-h-[92vh] overflow-y-auto my-auto">
        {/* Close Button */}
        <button
          onClick={handleReset}
          className="cursor-pointer absolute top-4 right-4 rounded-full p-2 text-[#3B2C25]/60 hover:bg-[#5C6D36]/10 hover:text-[#5C6D36] transition-colors"
          aria-label="Close modal"
        >
          <X className="size-5" />
        </button>

        {/* STEP 1: ORDER FORM */}
        {orderStep === 'form' && (
          <div>
            <div className="text-center pb-2">
              <span className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#5C6D36]">
                Reserve for Christmas & New Year
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-black text-[#5C6D36] mt-0.5">
                Holiday Feast Order Form
              </h2>
              <p className="mt-1 text-xs text-[#3B2C25]/80 max-w-md mx-auto">
                Select a chef-curated set or build your custom holiday spread tray-by-tray.
              </p>
            </div>

            {/* Mode Switcher: Curated Feast vs Create Your Own Menu */}
            <div className="mt-4 grid grid-cols-2 gap-2 p-1.5 bg-[#5C6D36]/10 rounded-2xl border border-[#5C6D36]/20">
              <button
                type="button"
                onClick={() => {
                  setOrderMode('curated');
                  setErrorMessage('');
                }}
                className={`cursor-pointer flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-black tracking-wider uppercase transition-all ${
                  orderMode === 'curated'
                    ? 'bg-[#5C6D36] text-white shadow-sm border border-[#3f4b25]'
                    : 'text-[#3B2C25]/75 hover:text-[#5C6D36] hover:bg-[#5C6D36]/10'
                }`}
              >
                <ChefHat className="size-4" />
                <span>Curated Feast Package</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setOrderMode('custom');
                  setErrorMessage('');
                }}
                className={`cursor-pointer flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-black tracking-wider uppercase transition-all ${
                  orderMode === 'custom'
                    ? 'bg-[#5C6D36] text-white shadow-sm border border-[#3f4b25]'
                    : 'text-[#3B2C25]/75 hover:text-[#5C6D36] hover:bg-[#5C6D36]/10'
                }`}
              >
                <Sparkles className="size-4" />
                <span>Create Your Own Menu</span>
              </button>
            </div>

            {errorMessage && (
              <div className="mt-3 rounded-xl bg-red-50 p-3 text-xs text-red-700 border border-red-200 flex items-center gap-2 font-medium">
                <AlertCircle className="size-4 shrink-0 text-red-600" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleProceedToPayment} className="mt-4 space-y-4 text-left">
              {/* MODE 1: CURATED FEAST PACKAGE */}
              {orderMode === 'curated' && (
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label
                        htmlFor="set-menu-select"
                        className="block text-xs font-bold uppercase tracking-[0.12em] text-[#5C6D36]"
                      >
                        1. Select Set Menu (Curated Feast · 10–12 Pax)
                      </label>
                      <span className="text-[11px] font-medium text-[#3B2C25]/60">
                        Drop Down Menu
                      </span>
                    </div>

                    {/* Drop Down Option for the Set Menu */}
                    <div className="relative">
                      <select
                        id="set-menu-select"
                        value={selectedFeast}
                        onChange={(e) => {
                          setSelectedFeast(e.target.value);
                          setErrorMessage('');
                        }}
                        className="w-full appearance-none rounded-2xl border-2 border-[#5C6D36]/40 bg-white py-3.5 pl-4 pr-11 text-sm font-bold text-[#3B2C25] shadow-xs transition-colors hover:border-[#5C6D36] focus:border-[#5C6D36] focus:outline-hidden focus:ring-2 focus:ring-[#5C6D36]/20 cursor-pointer"
                      >
                        <option value="">-- Choose a Set Menu Package (10–12 Pax) --</option>
                        {curatedFeasts.map((category) => (
                          <optgroup key={category.label} label={`✦ ${category.label}`}>
                            {category.feasts.map((feast) => (
                              <option key={feast.name} value={feast.name}>
                                {feast.name} — {feast.price}
                              </option>
                            ))}
                          </optgroup>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-[#5C6D36]">
                        <ChevronDown className="size-5" />
                      </div>
                    </div>

                    {/* Selected Set Menu Detail Card */}
                    {currentFeastObj ? (
                      <div className="mt-3 rounded-2xl border-2 border-[#5C6D36] bg-[#5C6D36]/5 p-4 shadow-xs">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <span className="inline-block rounded-full bg-[#5C6D36]/15 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-[#5C6D36]">
                              {currentFeastObj.category} • Set Menu
                            </span>
                            <h4 className="mt-1 font-display text-base sm:text-lg font-black text-[#3B2C25]">
                              {currentFeastObj.name}
                            </h4>
                          </div>
                          <div className="text-right shrink-0">
                            <span className="inline-block font-display text-base font-black text-[#5C6D36] bg-white px-3 py-1 rounded-xl border border-[#5C6D36]/30 shadow-xs">
                              {currentFeastObj.price}
                            </span>
                            <span className="block text-[10px] text-[#3B2C25]/60 mt-0.5 font-medium">
                              Serves 10–12 pax
                            </span>
                          </div>
                        </div>

                        <div className="mt-3 pt-3 border-t border-[#5C6D36]/15">
                          <p className="text-[11px] font-bold uppercase tracking-wider text-[#5C6D36] mb-1.5 flex items-center gap-1.5">
                            <Check className="size-3.5 text-[#5C6D36]" />
                            <span>Included in this Set Menu:</span>
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                            {currentFeastObj.items.map((dish, idx) => (
                              <div
                                key={idx}
                                className="flex items-center gap-2 text-xs text-[#3B2C25] bg-white rounded-lg px-2.5 py-1.5 border border-[#5C6D36]/15 shadow-2xs"
                              >
                                <span className="size-1.5 rounded-full bg-[#5C6D36] shrink-0" />
                                <span className="font-medium truncate">{dish}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <p className="mt-2 text-xs text-[#3B2C25]/70 italic flex items-center gap-1.5">
                        <span className="size-1.5 rounded-full bg-[#5C6D36]/60 shrink-0" />
                        <span>Select a set menu from the drop down option above to view its dishes and price.</span>
                      </p>
                    )}
                  </div>

                  {/* Toggle Extra À La Carte Add-ons with Curated Feast */}
                  <div className="pt-1">
                    <button
                      type="button"
                      onClick={() => setShowFeastAddons(!showFeastAddons)}
                      className="cursor-pointer text-xs font-bold text-[#5C6D36] hover:underline flex items-center gap-1.5"
                    >
                      <span>{showFeastAddons ? '− Hide' : '+ Add extra party trays or desserts to this package'}</span>
                      {totalAlacarteTraysCount > 0 && (
                        <span className="rounded-full bg-[#5C6D36] px-2 py-0.2 text-[10px] font-bold text-white">
                          {totalAlacarteTraysCount} add-on{totalAlacarteTraysCount > 1 ? 's' : ''}
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* MODE 2 OR ADD-ONS: À LA CARTE DISH SELECTOR */}
              {(orderMode === 'custom' || (orderMode === 'curated' && showFeastAddons)) && (
                <div className="rounded-2xl border-2 border-[#5C6D36]/25 bg-white p-3.5 sm:p-4 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#5C6D36]/15 pb-2.5">
                    <div>
                      <h3 className="font-display text-sm font-black text-[#5C6D36]">
                        {orderMode === 'custom'
                          ? '1. Build Your Menu (Tray-by-Tray · 10–12 pax each)'
                          : 'Extra À La Carte Add-Ons'}
                      </h3>
                      <p className="text-[11px] text-[#3B2C25]/70">
                        {orderMode === 'custom'
                          ? 'Select individual party trays to customize your holiday feast.'
                          : 'Add extra favorite dishes or desserts alongside your package.'}
                      </p>
                    </div>

                    {/* Summary badge */}
                    <div className="flex items-center gap-2 self-start sm:self-auto">
                      <span className="rounded-full bg-[#5C6D36]/10 px-2.5 py-1 text-[11px] font-bold text-[#5C6D36]">
                        {totalAlacarteTraysCount} tray{totalAlacarteTraysCount !== 1 ? 's' : ''} selected
                      </span>
                    </div>
                  </div>

                  {/* Search and Category Filter pills */}
                  <div className="space-y-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-2.5 size-3.5 text-[#3B2C25]/50" />
                      <input
                        type="text"
                        placeholder="Search dishes (e.g., roast beef, lasagna, salad, wings)..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full rounded-xl border border-[#5C6D36]/25 bg-[#FAF6EC]/60 pl-8 pr-3 py-1.5 text-xs text-[#3B2C25] focus:border-[#5C6D36] focus:outline-none focus:ring-1 focus:ring-[#5C6D36]"
                      />
                      {searchQuery && (
                        <button
                          type="button"
                          onClick={() => setSearchQuery('')}
                          className="cursor-pointer absolute right-2.5 top-2 text-[#3B2C25]/40 hover:text-[#3B2C25] text-xs"
                        >
                          ✕
                        </button>
                      )}
                    </div>

                    {/* Category tabs */}
                    <div className="flex flex-wrap gap-1 text-[10px]">
                      {['All', ...alacarteCategories.map((c) => c.title)].map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setActiveCategoryFilter(cat)}
                          className={`cursor-pointer rounded-full px-2.5 py-1 font-bold transition-all ${
                            activeCategoryFilter === cat
                              ? 'bg-[#5C6D36] text-white'
                              : 'bg-[#5C6D36]/10 text-[#3B2C25]/75 hover:bg-[#5C6D36]/20'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Scrollable Dish Grid */}
                  <div className="max-h-56 overflow-y-auto space-y-1.5 pr-1 divide-y divide-[#5C6D36]/10">
                    {filteredDishes.length === 0 ? (
                      <p className="text-center py-6 text-xs text-[#3B2C25]/60 italic">
                        No dishes match your search. Try another dish name or category filter.
                      </p>
                    ) : (
                      filteredDishes.map((dish) => {
                        const qty = selectedAlacarte[dish.name] || 0;
                        return (
                          <div
                            key={dish.name}
                            className="pt-1.5 first:pt-0 flex items-center justify-between gap-3 text-xs"
                          >
                            <div className="min-w-0">
                              <div className="flex items-center gap-1.5">
                                <span className="font-bold text-[#3B2C25] truncate">
                                  {dish.name}
                                </span>
                                {dish.note && (
                                  <span className="text-[10px] text-[#3B2C25]/60 truncate hidden sm:inline">
                                    ({dish.note})
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center gap-2 text-[10px] text-[#3B2C25]/65">
                                <span className="text-[#5C6D36] font-extrabold">{dish.price}</span>
                                <span>· 10–12 pax</span>
                              </div>
                            </div>

                            {/* Add / Quantity Controller */}
                            <div className="shrink-0 flex items-center gap-1">
                              {qty > 0 ? (
                                <div className="flex items-center gap-1.5 bg-[#5C6D36]/10 rounded-full px-1.5 py-0.5 border border-[#5C6D36]/25">
                                  <button
                                    type="button"
                                    onClick={() => handleDecreaseAlacarte(dish.name)}
                                    className="cursor-pointer size-5 flex items-center justify-center rounded-full bg-white text-[#5C6D36] hover:bg-[#5C6D36] hover:text-white transition-colors"
                                  >
                                    <Minus className="size-3" />
                                  </button>
                                  <span className="font-black text-xs text-[#5C6D36] w-4 text-center">
                                    {qty}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => handleAddAlacarte(dish.name)}
                                    className="cursor-pointer size-5 flex items-center justify-center rounded-full bg-[#5C6D36] text-white hover:bg-[#4e5d2e] transition-colors"
                                  >
                                    <Plus className="size-3" />
                                  </button>
                                </div>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => handleAddAlacarte(dish.name)}
                                  className="cursor-pointer rounded-full border border-[#3f4b25] bg-[#5C6D36] px-2.5 py-1 text-[11px] font-bold text-white hover:bg-[#4e5d2e] transition-colors flex items-center gap-1"
                                >
                                  <Plus className="size-3" />
                                  <span>Add</span>
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>

                  {/* Selected À La Carte Trays Breakdown */}
                  {totalAlacarteTraysCount > 0 && (
                    <div className="rounded-xl bg-[#FAF6EC] p-2.5 border border-[#5C6D36]/20">
                      <div className="flex items-center justify-between text-xs font-bold text-[#5C6D36] mb-1.5">
                        <span className="uppercase tracking-wider text-[10px]">
                          Selected Trays ({totalAlacarteTraysCount})
                        </span>
                        <span>{formatCurrency(alacarteTotal)}</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {Object.entries(selectedAlacarte).map(([dishName, qty]) => (
                          <span
                            key={dishName}
                            className="inline-flex items-center gap-1 rounded-full bg-white px-2 py-0.5 text-[10px] font-medium text-[#3B2C25] border border-[#5C6D36]/20 shadow-2xs"
                          >
                            <span className="font-bold text-[#5C6D36]">{qty}x</span>
                            <span className="truncate max-w-[120px]">{dishName}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveAlacarte(dishName)}
                              className="cursor-pointer ml-0.5 text-[#3B2C25]/40 hover:text-red-600"
                            >
                              ✕
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Order Total Overview Bar */}
              <div className="rounded-2xl bg-[#5C6D36]/15 p-3 border border-[#5C6D36]/30 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#5C6D36]">
                    Estimated Total
                  </span>
                  <p className="text-xs text-[#3B2C25]/75">
                    {orderMode === 'curated' && currentFeastObj
                      ? `${currentFeastObj.name}${totalAlacarteTraysCount > 0 ? ` + ${totalAlacarteTraysCount} add-on trays` : ''}`
                      : `${totalAlacarteTraysCount} custom tray${totalAlacarteTraysCount !== 1 ? 's' : ''}`}
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-display font-black text-xl text-[#5C6D36]">
                    {formatCurrency(grandTotal)}
                  </span>
                </div>
              </div>

              {/* Date & Time Picker */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-[0.12em] text-[#5C6D36] mb-1.5">
                    Delivery / Pickup Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={date}
                      min="2026-12-01"
                      max="2027-01-05"
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full rounded-xl border border-[#5C6D36]/25 bg-white px-3.5 py-2 text-sm text-[#3B2C25] focus:border-[#5C6D36] focus:outline-none focus:ring-1 focus:ring-[#5C6D36]"
                      required
                    />
                    <Calendar className="pointer-events-none absolute right-3.5 top-2.5 size-4 text-[#5C6D36]/70" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-[0.12em] text-[#5C6D36] mb-1.5">
                    Preferred Time
                  </label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full rounded-xl border border-[#5C6D36]/25 bg-white px-3.5 py-2 text-sm text-[#3B2C25] focus:border-[#5C6D36] focus:outline-none focus:ring-1 focus:ring-[#5C6D36]"
                  >
                    <option value="10:30">10:30 AM (Lunch Wave 1)</option>
                    <option value="11:30">11:30 AM (Lunch Wave 2)</option>
                    <option value="12:30">12:30 PM (Lunch Wave 3)</option>
                    <option value="16:00">04:00 PM (Dinner Wave 1)</option>
                    <option value="17:00">05:00 PM (Dinner Wave 2)</option>
                    <option value="18:30">06:30 PM (Noche Buena / Eve)</option>
                  </select>
                </div>
              </div>

              {/* Fulfillment Option */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-[0.12em] text-[#5C6D36] mb-1.5">
                  Fulfillment Option
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setOrderType('delivery')}
                    className={`cursor-pointer flex items-center justify-center gap-2 rounded-xl py-2.5 px-3 text-xs font-bold tracking-wider uppercase transition-all ${
                      orderType === 'delivery'
                        ? 'bg-[#5C6D36] text-white shadow-sm border border-[#3f4b25]'
                        : 'border border-[#5C6D36]/20 bg-white text-[#3B2C25]/75 hover:bg-[#5C6D36]/5'
                    }`}
                  >
                    <MapPin className="size-4" />
                    Delivery
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrderType('pickup')}
                    className={`cursor-pointer flex items-center justify-center gap-2 rounded-xl py-2.5 px-3 text-xs font-bold tracking-wider uppercase transition-all ${
                      orderType === 'pickup'
                        ? 'bg-[#5C6D36] text-white shadow-sm border border-[#3f4b25]'
                        : 'border border-[#5C6D36]/20 bg-white text-[#3B2C25]/75 hover:bg-[#5C6D36]/5'
                    }`}
                  >
                    <User className="size-4" />
                    Store Pickup
                  </button>
                </div>
              </div>

              {/* Customer Contact: Name, Phone (for SMS), Email (for Email confirmation) */}
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-[0.12em] text-[#5C6D36] mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Maria Santos"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full rounded-xl border border-[#5C6D36]/25 bg-white px-3.5 py-2 text-sm text-[#3B2C25] focus:border-[#5C6D36] focus:outline-none focus:ring-1 focus:ring-[#5C6D36]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-[0.12em] text-[#5C6D36] mb-1.5">
                      Contact Phone / Mobile (For SMS Confirmation) *
                    </label>
                    <input
                      type="tel"
                      placeholder="0917 123 4567"
                      value={contactNumber}
                      onChange={(e) => setContactNumber(e.target.value)}
                      className="w-full rounded-xl border border-[#5C6D36]/25 bg-white px-3.5 py-2 text-sm text-[#3B2C25] focus:border-[#5C6D36] focus:outline-none focus:ring-1 focus:ring-[#5C6D36]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-[0.12em] text-[#5C6D36] mb-1.5">
                    Email Address (For Email Confirmation & Receipt) *
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. maria.santos@gmail.com"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full rounded-xl border border-[#5C6D36]/25 bg-white px-3.5 py-2 text-sm text-[#3B2C25] focus:border-[#5C6D36] focus:outline-none focus:ring-1 focus:ring-[#5C6D36]"
                    required
                  />
                  <p className="mt-1 text-[10px] text-[#3B2C25]/60">
                    We will send an automated confirmation and digital receipt to this email.
                  </p>
                </div>
              </div>

              {/* Delivery Address (if Delivery) */}
              {orderType === 'delivery' && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-[0.12em] text-[#5C6D36] mb-1.5">
                    Delivery Address *
                  </label>
                  <input
                    type="text"
                    placeholder="Unit / House No., Street, Barangay, City, Landmark"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    className="w-full rounded-xl border border-[#5C6D36]/25 bg-white px-3.5 py-2 text-sm text-[#3B2C25] focus:border-[#5C6D36] focus:outline-none focus:ring-1 focus:ring-[#5C6D36]"
                    required={orderType === 'delivery'}
                  />
                </div>
              )}

              {/* Special Instructions */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-[0.12em] text-[#5C6D36] mb-1.5">
                  Special Notes or Wing Flavors (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Classic Buffalo / Honey Mustard wing flavor, gate code, dietary requests..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full rounded-xl border border-[#5C6D36]/25 bg-white px-3.5 py-2 text-xs text-[#3B2C25] focus:border-[#5C6D36] focus:outline-none focus:ring-1 focus:ring-[#5C6D36] resize-none"
                />
              </div>

              {/* Submit Button: Olive Green with text "Proceed to Payment" */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full cursor-pointer rounded-full border-2 border-[#3f4b25] bg-[#5C6D36] py-4 px-6 text-center text-sm font-black uppercase tracking-[0.14em] text-white shadow-[0_5px_0_#3f4b25] transition-all hover:bg-[#4e5d2e] hover:-translate-y-0.5 active:translate-y-0 active:shadow-none"
                >
                  Proceed to Payment
                </button>
                <p className="mt-2 text-center text-[11px] text-[#3B2C25]/60">
                  Click to review your complete order summary, scan the payment QR code, and upload your receipt.
                </p>
              </div>
            </form>
          </div>
        )}

        {/* STEP 2: ORDER SUMMARY WITH QR CODE & REQUIRED RECEIPT UPLOAD */}
        {orderStep === 'summary' && (
          <div className="py-1 text-center">
            {/* Top Navigation */}
            <div className="flex items-center justify-between pb-2 border-b border-[#5C6D36]/15">
              <button
                type="button"
                onClick={() => setOrderStep('form')}
                className="cursor-pointer inline-flex items-center gap-1.5 text-xs font-bold text-[#5C6D36] hover:underline"
              >
                <ArrowLeft className="size-3.5" />
                <span>Back to Order Form</span>
              </button>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#5C6D36]/80 bg-[#5C6D36]/10 px-2.5 py-0.5 rounded-full">
                Step 2 of 2: Payment
              </span>
            </div>

            <div className="mt-3">
              <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-[#5C6D36] text-white mb-2 shadow-md">
                <CreditCard className="size-6" />
              </div>

              <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#5C6D36]">
                Holiday Feast Confirmation
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-black text-[#5C6D36] mt-0.5">
                Order Summary
              </h3>
              <p className="mt-1 text-xs text-[#3B2C25]/80 max-w-md mx-auto">
                Thank you, <span className="font-bold text-[#3B2C25]">{customerName}</span>!
                Please review your feast breakdown, scan the QR code to pay, and attach your transaction receipt to finalize.
              </p>
            </div>

            <div className="mt-4 mx-auto max-w-xl rounded-2xl bg-white p-4 sm:p-5 border-2 border-[#5C6D36]/25 text-left text-xs space-y-4 shadow-md">
              {/* Top Details & Fulfillment */}
              <div className="border-b border-[#5C6D36]/15 pb-3 flex justify-between items-center">
                <div>
                  <span className="font-extrabold uppercase tracking-wider text-[11px] text-[#5C6D36]">
                    Ordered Dishes
                  </span>
                  <p className="text-[11px] text-[#3B2C25]/65">
                    {date} at {time}
                  </p>
                </div>
                <span className="font-bold text-xs uppercase px-2.5 py-1 rounded-full bg-[#5C6D36]/10 text-[#5C6D36]">
                  {orderType}
                </span>
              </div>

              {/* Curated Package if selected */}
              {orderMode === 'curated' && currentFeastObj && (
                <div className="space-y-1.5">
                  <div className="flex justify-between font-bold text-sm text-[#3B2C25]">
                    <span>{currentFeastObj.name} (Curated Set · 10–12 pax)</span>
                    <span className="text-[#5C6D36]">{currentFeastObj.price}</span>
                  </div>
                  <ul className="text-[11px] text-[#3B2C25]/75 pl-2 space-y-0.5">
                    {currentFeastObj.items.map((it) => (
                      <li key={it} className="flex items-center gap-1.5">
                        <span className="text-[#5C6D36]">•</span>
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* À La Carte items */}
              {totalAlacarteTraysCount > 0 && (
                <div className="space-y-1.5 pt-1.5 border-t border-[#5C6D36]/15">
                  <p className="font-bold text-xs uppercase tracking-wider text-[#5C6D36]">
                    {orderMode === 'custom'
                      ? 'Custom Menu Dishes (10–12 pax trays):'
                      : 'Extra À La Carte Add-ons:'}
                  </p>
                  <div className="space-y-1 pl-1">
                    {Object.entries(selectedAlacarte).map(([dishName, qty]) => {
                      const dish = allAlacarteDishes.find((d) => d.name === dishName);
                      const line = dish ? dish.parsedPrice * qty : 0;
                      return (
                        <div key={dishName} className="flex justify-between text-[#3B2C25] font-medium">
                          <span>
                            {qty}x {dishName} {dish?.note ? `(${dish.note})` : ''}
                          </span>
                          <span className="font-bold text-[#5C6D36]">{formatCurrency(line)}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Grand Total */}
              <div className="border-t-2 border-[#5C6D36]/20 pt-2.5 flex justify-between items-center font-bold text-sm text-[#5C6D36]">
                <span className="text-base font-extrabold">Grand Total:</span>
                <span className="font-display font-black text-2xl text-[#5C6D36]">
                  {formatCurrency(grandTotal)}
                </span>
              </div>

              {/* Fulfillment & Contact info */}
              <div className="border-t border-[#5C6D36]/15 pt-2 text-[11px] text-[#3B2C25]/80 space-y-1 bg-[#FAF6EC] p-3 rounded-xl">
                <div>
                  <span className="font-bold text-[#3B2C25]">Customer:</span> {customerName} · {contactNumber}
                </div>
                <div>
                  <span className="font-bold text-[#3B2C25]">Email Confirmation To:</span> {customerEmail}
                </div>
                {orderType === 'delivery' && deliveryAddress && (
                  <div>
                    <span className="font-bold text-[#3B2C25]">Delivery Address:</span> {deliveryAddress}
                  </div>
                )}
                {notes && (
                  <div>
                    <span className="font-bold text-[#3B2C25]">Notes:</span> {notes}
                  </div>
                )}
              </div>

              {/* PAYMENT SECTION WITH QR CODE & REQUIRED RECEIPT UPLOAD */}
              <div className="border-t-2 border-[#5C6D36]/25 pt-3 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-[#5C6D36] text-white">
                      <QrCode className="size-4" />
                    </div>
                    <div>
                      <h4 className="font-display text-sm font-black text-[#5C6D36]">
                        Scan QR Code to Pay
                      </h4>
                      <p className="text-[10px] text-[#3B2C25]/70">
                        Scan with GCash, Maya, BPI, BDO or any QR Ph app
                      </p>
                    </div>
                  </div>
                  <span className="rounded-full bg-[#5C6D36]/10 px-2.5 py-0.5 text-[10px] font-bold text-[#5C6D36]">
                    QR Ph Standard
                  </span>
                </div>

                {/* QR Code and Account Info Card */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5 bg-[#F9F7F1] p-3.5 rounded-2xl border border-[#5C6D36]/20">
                  {/* QR Code Visual Placeholder */}
                  <div className="sm:col-span-5 flex flex-col items-center justify-center p-3 bg-white rounded-xl border border-[#5C6D36]/15 shadow-xs">
                    <div className="relative p-2 bg-white rounded-lg border border-black/10">
                      <svg
                        viewBox="0 0 120 120"
                        className="size-32 sm:size-36"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-label="Payment QR Code Placeholder"
                      >
                        {/* Top-left marker */}
                        <rect x="8" y="8" width="30" height="30" rx="4" fill="#3B2C25" />
                        <rect x="13" y="13" width="20" height="20" rx="2" fill="white" />
                        <rect x="18" y="18" width="10" height="10" rx="1" fill="#5C6D36" />

                        {/* Top-right marker */}
                        <rect x="82" y="8" width="30" height="30" rx="4" fill="#3B2C25" />
                        <rect x="87" y="13" width="20" height="20" rx="2" fill="white" />
                        <rect x="92" y="18" width="10" height="10" rx="1" fill="#5C6D36" />

                        {/* Bottom-left marker */}
                        <rect x="8" y="82" width="30" height="30" rx="4" fill="#3B2C25" />
                        <rect x="13" y="87" width="20" height="20" rx="2" fill="white" />
                        <rect x="18" y="92" width="10" height="10" rx="1" fill="#5C6D36" />

                        {/* Data matrix dots */}
                        <rect x="44" y="10" width="6" height="6" rx="1" fill="#3B2C25" />
                        <rect x="54" y="10" width="6" height="6" rx="1" fill="#3B2C25" />
                        <rect x="64" y="16" width="6" height="6" rx="1" fill="#3B2C25" />
                        <rect x="47" y="22" width="6" height="6" rx="1" fill="#3B2C25" />
                        <rect x="58" y="26" width="6" height="6" rx="1" fill="#3B2C25" />
                        <rect x="70" y="22" width="6" height="6" rx="1" fill="#3B2C25" />

                        <rect x="10" y="46" width="6" height="6" rx="1" fill="#3B2C25" />
                        <rect x="20" y="52" width="6" height="6" rx="1" fill="#3B2C25" />
                        <rect x="30" y="44" width="6" height="6" rx="1" fill="#3B2C25" />
                        <rect x="14" y="64" width="6" height="6" rx="1" fill="#3B2C25" />
                        <rect x="26" y="68" width="6" height="6" rx="1" fill="#3B2C25" />

                        <rect x="84" y="46" width="6" height="6" rx="1" fill="#3B2C25" />
                        <rect x="96" y="50" width="6" height="6" rx="1" fill="#3B2C25" />
                        <rect x="90" y="62" width="6" height="6" rx="1" fill="#3B2C25" />
                        <rect x="104" y="66" width="6" height="6" rx="1" fill="#3B2C25" />

                        <rect x="44" y="84" width="6" height="6" rx="1" fill="#3B2C25" />
                        <rect x="56" y="88" width="6" height="6" rx="1" fill="#3B2C25" />
                        <rect x="48" y="98" width="6" height="6" rx="1" fill="#3B2C25" />
                        <rect x="66" y="94" width="6" height="6" rx="1" fill="#3B2C25" />
                        <rect x="84" y="84" width="6" height="6" rx="1" fill="#3B2C25" />
                        <rect x="96" y="90" width="6" height="6" rx="1" fill="#3B2C25" />
                        <rect x="88" y="104" width="6" height="6" rx="1" fill="#3B2C25" />
                        <rect x="102" y="102" width="6" height="6" rx="1" fill="#3B2C25" />

                        {/* Center QR Ph Emblem */}
                        <rect x="42" y="42" width="36" height="36" rx="8" fill="#5C6D36" stroke="white" strokeWidth="2.5" />
                        <text x="60" y="57" textAnchor="middle" fill="white" fontSize="8" fontWeight="900" fontFamily="sans-serif">
                          QR Ph
                        </text>
                        <text x="60" y="68" textAnchor="middle" fill="#D4AF37" fontSize="6.5" fontWeight="800" fontFamily="sans-serif">
                          PAY
                        </text>
                      </svg>
                    </div>
                    <span className="mt-1.5 text-[10px] font-bold text-[#5C6D36]">
                      QR Ph Standard Code
                    </span>
                  </div>

                  {/* Manual Account Details */}
                  <div className="sm:col-span-7 flex flex-col justify-center space-y-2 text-xs">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#3B2C25]/60">
                        Account Name
                      </span>
                      <p className="font-bold text-[#3B2C25] text-xs">
                        The Palate Pantry Catering
                      </p>
                    </div>

                    <div className="rounded-xl bg-white p-2.5 border border-[#5C6D36]/15">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-[10px] font-bold uppercase text-[#5C6D36]">
                            GCash / Maya (QR Ph)
                          </span>
                          <p className="font-display font-black text-sm text-[#3B2C25]">
                            0917 888 3327
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleCopyText('09178883327', 'gcash')}
                          className="cursor-pointer inline-flex items-center gap-1 rounded-md bg-[#5C6D36]/10 px-2 py-1 text-[10px] font-bold text-[#5C6D36] hover:bg-[#5C6D36] hover:text-white transition-colors"
                        >
                          {copiedAccount === 'gcash' ? (
                            <>
                              <CheckCheck className="size-3 text-green-600" />
                              <span>Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="size-3" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="rounded-xl bg-white p-2.5 border border-[#5C6D36]/15">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-[10px] font-bold uppercase text-[#5C6D36]">
                            BDO / BPI Bank Transfer
                          </span>
                          <p className="font-display font-black text-xs text-[#3B2C25]">
                            0012 3456 7890
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleCopyText('001234567890', 'bank')}
                          className="cursor-pointer inline-flex items-center gap-1 rounded-md bg-[#5C6D36]/10 px-2 py-1 text-[10px] font-bold text-[#5C6D36] hover:bg-[#5C6D36] hover:text-white transition-colors"
                        >
                          {copiedAccount === 'bank' ? (
                            <>
                              <CheckCheck className="size-3 text-green-600" />
                              <span>Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="size-3" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] pt-0.5">
                      <span className="font-bold text-[#3B2C25]/70">Amount Due:</span>
                      <span className="font-black text-sm text-[#5C6D36]">
                        {formatCurrency(grandTotal)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* REQUIRED RECEIPT UPLOAD SECTION */}
                <div className="space-y-2.5 pt-1">
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.1em] text-[#5C6D36]">
                      <span>Upload Payment Receipt</span>
                      <span className="rounded bg-red-100 text-red-700 text-[9px] font-extrabold px-1.5 py-0.5 uppercase tracking-wide">
                        Required
                      </span>
                    </label>
                    <span className="text-[10px] text-[#3B2C25]/60">
                      JPG, PNG, WebP or PDF
                    </span>
                  </div>

                  {/* Error indicator if tried to submit without receipt */}
                  {receiptError && (
                    <div className="rounded-xl bg-red-50 border border-red-200 p-2.5 text-xs text-red-700 flex items-center gap-2">
                      <AlertCircle className="size-4 text-red-600 shrink-0" />
                      <span className="font-medium">{receiptError}</span>
                    </div>
                  )}

                  {/* Hidden File Input */}
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileInputChange}
                    accept="image/*,application/pdf"
                    className="hidden"
                    id="receipt-file-input"
                  />

                  {/* Upload Box / Dropzone */}
                  {!receiptFile ? (
                    <div
                      onDragOver={(e) => {
                        e.preventDefault();
                        setIsDragOver(true);
                      }}
                      onDragLeave={() => setIsDragOver(false)}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className={`cursor-pointer rounded-2xl border-2 border-dashed p-4 text-center transition-all ${
                        receiptError
                          ? 'border-red-400 bg-red-50/50'
                          : isDragOver
                          ? 'border-[#5C6D36] bg-[#5C6D36]/10 scale-[1.01]'
                          : 'border-[#5C6D36]/35 bg-[#F9F7F1] hover:border-[#5C6D36] hover:bg-white'
                      }`}
                    >
                      <div className="mx-auto flex size-10 items-center justify-center rounded-full bg-[#5C6D36]/10 text-[#5C6D36] mb-2">
                        <UploadCloud className="size-5" />
                      </div>
                      <p className="text-xs font-bold text-[#3B2C25]">
                        Click or drag & drop to upload your payment receipt *
                      </p>
                      <p className="mt-1 text-[10px] text-[#3B2C25]/60">
                        Upload screenshot of GCash / Maya transfer or Bank confirmation slip
                      </p>
                    </div>
                  ) : (
                    /* Attached Receipt Preview Card */
                    <div className="rounded-2xl border-2 border-[#5C6D36]/40 bg-white p-3.5 space-y-2.5 shadow-xs">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="flex size-9 items-center justify-center rounded-xl bg-[#5C6D36]/10 text-[#5C6D36] shrink-0">
                            {receiptPreview ? (
                              <CheckCircle2 className="size-5 text-[#5C6D36]" />
                            ) : (
                              <FileText className="size-5 text-[#5C6D36]" />
                            )}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold text-xs text-[#3B2C25] truncate">
                                {receiptFile.name}
                              </span>
                              <span className="rounded bg-green-100 text-green-800 text-[9px] font-extrabold px-1.5 py-0.2 shrink-0">
                                Receipt Attached
                              </span>
                            </div>
                            <p className="text-[10px] text-[#3B2C25]/60">
                              {(receiptFile.size / 1024).toFixed(1)} KB · Ready for kitchen confirmation
                            </p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={handleRemoveReceipt}
                          className="cursor-pointer text-[#3B2C25]/50 hover:text-red-600 p-1.5 transition-colors"
                          title="Remove file"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>

                      {/* Image Thumbnail Preview if available */}
                      {receiptPreview && (
                        <div className="mt-2 flex items-center justify-center rounded-xl bg-[#F9F7F1] p-2 border border-[#5C6D36]/15">
                          <img
                            src={receiptPreview}
                            alt="Receipt Preview"
                            className="max-h-40 rounded-lg object-contain shadow-xs"
                          />
                        </div>
                      )}
                    </div>
                  )}

                  {/* Reference Number input */}
                  <div>
                    <label className="block text-[11px] font-bold text-[#3B2C25]/70 mb-1">
                      Bank / GCash Reference Number (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Ref # 1002 9384 1928"
                      value={referenceNumber}
                      onChange={(e) => setReferenceNumber(e.target.value)}
                      className="w-full rounded-xl border border-[#5C6D36]/25 bg-white px-3 py-2 text-xs text-[#3B2C25] placeholder:text-[#3B2C25]/40 focus:border-[#5C6D36] focus:outline-none focus:ring-1 focus:ring-[#5C6D36]"
                    />
                  </div>

                  {receiptFile && (
                    <div className="rounded-xl bg-green-50 border border-green-200 p-2.5 text-[11px] text-green-800 flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-green-600 shrink-0" />
                      <span>
                        Receipt successfully attached! Click the button below to submit your order.
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button: Olive Green, requires payment receipt */}
            <div className="mt-5 flex flex-col items-center justify-center gap-2">
              <button
                type="button"
                onClick={handleFinalSubmitOrder}
                className={`w-full sm:w-auto rounded-full border-2 border-[#3f4b25] px-10 py-3.5 text-xs font-black uppercase tracking-[0.14em] text-white shadow-[3px_3px_0px_#3f4b25] transition-all ${
                  receiptFile
                    ? 'cursor-pointer bg-[#5C6D36] hover:bg-[#4e5d2e] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none'
                    : 'cursor-pointer bg-[#5C6D36] opacity-90 hover:bg-[#4e5d2e]'
                }`}
              >
                Submit Payment Receipt & Confirm Order
              </button>
              <p className="text-[11px] text-[#3B2C25]/70 font-medium">
                {receiptFile
                  ? 'Ready to submit! An email & text confirmation will be sent right after.'
                  : '⚠️ Payment receipt is required above to submit your reservation.'}
              </p>
            </div>
          </div>
        )}

        {/* STEP 3: THANK YOU PAGE */}
        {orderStep === 'thank_you' && (
          <div className="py-3 text-center space-y-4">
            {/* Success Icon */}
            <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-[#5C6D36] text-white shadow-lg animate-bounce">
              <Check className="size-8 stroke-[3]" />
            </div>

            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#5C6D36]">
                Reservation Submitted
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-black text-[#5C6D36] mt-0.5">
                Thank You, {customerName}!
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-[#3B2C25]/85 max-w-md mx-auto">
                We have received your holiday order and payment receipt. Your festive feast is in good hands!
              </p>
            </div>

            {/* Confirmation Expectations Card */}
            <div className="mx-auto max-w-xl rounded-2xl bg-white p-4 sm:p-5 border-2 border-[#5C6D36]/30 text-left space-y-3.5 shadow-sm">
              <div className="flex items-center gap-2 border-b border-[#5C6D36]/15 pb-2.5">
                <ShieldCheck className="size-5 text-[#5C6D36]" />
                <h4 className="font-display text-sm font-black text-[#5C6D36]">
                  What Happens Next?
                </h4>
              </div>

              {/* Text Confirmation expectation */}
              <div className="flex items-start gap-3 p-3 rounded-xl bg-[#F9F7F1] border border-[#5C6D36]/15">
                <div className="flex size-8 items-center justify-center rounded-lg bg-[#5C6D36] text-white shrink-0 mt-0.5">
                  <Phone className="size-4" />
                </div>
                <div className="text-xs">
                  <h5 className="font-black text-[#3B2C25]">Text / SMS Confirmation</h5>
                  <p className="text-[#3B2C25]/75 mt-0.5">
                    You will receive an SMS confirmation on{' '}
                    <span className="font-bold text-[#5C6D36]">{contactNumber}</span> as soon as our kitchen concierge verifies your payment receipt.
                  </p>
                </div>
              </div>

              {/* Email Confirmation expectation */}
              <div className="flex items-start gap-3 p-3 rounded-xl bg-[#F9F7F1] border border-[#5C6D36]/15">
                <div className="flex size-8 items-center justify-center rounded-lg bg-[#5C6D36] text-white shrink-0 mt-0.5">
                  <Mail className="size-4" />
                </div>
                <div className="text-xs">
                  <h5 className="font-black text-[#3B2C25]">Email Confirmation & Receipt</h5>
                  <p className="text-[#3B2C25]/75 mt-0.5">
                    A copy of your complete order invoice, fulfillment instructions, and payment summary has been sent to{' '}
                    <span className="font-bold text-[#5C6D36]">{customerEmail}</span>.
                  </p>
                </div>
              </div>

              {/* Verification Turnaround Time */}
              <div className="flex items-start gap-3 p-3 rounded-xl bg-[#F9F7F1] border border-[#5C6D36]/15">
                <div className="flex size-8 items-center justify-center rounded-lg bg-[#5C6D36] text-white shrink-0 mt-0.5">
                  <Clock className="size-4" />
                </div>
                <div className="text-xs">
                  <h5 className="font-black text-[#3B2C25]">Verification Timeline</h5>
                  <p className="text-[#3B2C25]/75 mt-0.5">
                    Our catering kitchen team reviews payments within <b>15–30 minutes</b>. Once confirmed, your kitchen prep slot is fully secured.
                  </p>
                </div>
              </div>

              {/* Order Reference Snapshot */}
              <div className="rounded-xl bg-[#FAF6EC] p-3 text-xs space-y-1.5 border border-[#5C6D36]/20">
                <div className="flex justify-between items-center font-bold">
                  <span className="text-[#3B2C25]/70">Reference Number:</span>
                  <span className="font-display font-black text-sm text-[#5C6D36]">
                    {orderRefNumber}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#3B2C25]/70">Fulfillment Date & Time:</span>
                  <span className="font-semibold text-[#3B2C25]">{date} at {time}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#3B2C25]/70">Fulfillment Mode:</span>
                  <span className="font-semibold uppercase text-[#5C6D36]">{orderType}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#3B2C25]/70">Total Amount:</span>
                  <span className="font-bold text-[#5C6D36]">{formatCurrency(grandTotal)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#3B2C25]/70">Attached Receipt:</span>
                  <span className="font-semibold text-green-700 flex items-center gap-1">
                    <CheckCircle2 className="size-3.5" />
                    <span>Verified & Uploaded</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Assistance note */}
            <p className="text-xs text-[#3B2C25]/70 max-w-md mx-auto">
              Need to modify dishes or have special dietary requests? Call or message our team at{' '}
              <b className="text-[#5C6D36]">0917 888 3327</b> or <b className="text-[#5C6D36]">catering@palatepantry.ph</b>.
            </p>

            {/* Back to Home / Done Button: Olive Green */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleReset}
                className="w-full sm:w-auto cursor-pointer rounded-full border-2 border-[#3f4b25] bg-[#5C6D36] px-10 py-3.5 text-xs font-black uppercase tracking-[0.14em] text-white shadow-[3px_3px_0px_#3f4b25] hover:bg-[#4e5d2e] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
              >
                Done & Return to Holiday Menu
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
