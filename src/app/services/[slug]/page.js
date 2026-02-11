'use client';

import { use, useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  CheckCircle,
  ShieldCheck,
  Gift,
  MessageCircle,
  Maximize2,
  X,
  Tag,
  Bike,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { servicesData } from '@/data/servicesData';
import Header from '@/components/layout/Header';
import BottomNav from '@/components/layout/BottomNav';

// --- Utility Functions ---
const formatRupiah = (val) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(val);

const formatKey = (key) => {
  return key
    .split('_')
    .map((word) => {
      if (word === 'cc') return ''; // Usually cc is attached to number like 150cc
      // Handle special casing like '1sil' to '1 Silinder' if desired, or just generic capitalization
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ')
    .replace('1sil', '1 Silinder')
    .replace('2sil', '2 Silinder')
    .replace('Abs', 'ABS')
    .replace('Nonabs', 'Non ABS');
};

// --- Sub-Components ---

// 1. Image Modal Component
const ImageModal = ({ isOpen, imageSrc, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 animate-in fade-in duration-300"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-5 right-5 text-white/70 hover:text-racing-yellow transition-colors"
      >
        <X size={32} />
      </button>
      <div
        className="relative max-w-4xl w-full max-h-[80vh] group"
        onClick={(e) => e.stopPropagation()} // Prevent close when clicking image
      >
        <img
          src={imageSrc}
          alt="Preview"
          className="w-full h-full object-contain rounded-lg border-2 border-racing-yellow/50 shadow-[0_0_50px_rgba(255,215,0,0.2)]"
        />
      </div>
    </div>
  );
};

// 2. Variant Card Component
const VariantCard = ({ variant, coverImage, onBooking, onImageClick }) => {
  const displayImage = variant.image || coverImage;

  // 1. Extract Price Types
  const priceTypes = variant.price?.promo
    ? Object.keys(variant.price.promo)
    : [];

  // 2. State
  const [selectedType, setSelectedType] = useState(priceTypes[0] || '');

  // 3. Carousel Logic
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      // Use a small tolerance (1px) for floating point calculations
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    checkScroll();
    // Re-check on resize
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [priceTypes]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 150; // Adjust scroll distance
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  // 4. Get current prices
  const currentPromo = selectedType ? variant.price.promo[selectedType] : 0;
  const currentNormal = selectedType ? variant.price.normal[selectedType] : 0;
  const savings =
    currentNormal > currentPromo ? currentNormal - currentPromo : 0;

  return (
    <div className="bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden hover:border-racing-yellow transition-all duration-300 flex flex-col h-full group">
      {/* Image Area - Clean & Clickable */}
      <div
        className="relative aspect-square w-full overflow-hidden bg-zinc-800 cursor-zoom-in"
        onClick={() => onImageClick(displayImage)}
      >
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
          style={{
            backgroundImage: `url('${displayImage}')`,
          }}
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <Maximize2
            className="text-racing-yellow drop-shadow-md transform scale-75 group-hover:scale-100 transition-transform duration-300"
            size={32}
          />
        </div>
      </div>

      {/* Content Area */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Title */}
        <div className="mb-4">
          <h3 className="text-xl font-orbitron font-bold text-white leading-tight">
            {variant.title}
          </h3>
          <div className="h-1 w-12 bg-racing-yellow mt-2 rounded-full" />
        </div>

        {/* Type Selector (New Scrollable Tab UI) */}
        {priceTypes.length > 0 && (
          <div className="mb-5">
            <div className="flex items-center gap-2 mb-2 text-gray-400">
              <Bike size={14} />
              <span className="text-[10px] uppercase font-bold tracking-widest font-orbitron">
                Pilih Tipe Motor
              </span>
            </div>

            <div className="relative group/tabs">
              {/* Prev Button */}
              {canScrollLeft && (
                <button
                  onClick={() => scroll('left')}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-zinc-800 border border-white/20 flex items-center justify-center text-racing-yellow shadow-lg hover:bg-zinc-700 transition-all"
                >
                  <ChevronLeft size={14} />
                </button>
              )}

              {/* Floating gradient masks for visual cues */}
              {canScrollLeft && (
                <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-zinc-900 to-transparent z-0 pointer-events-none" />
              )}
              {canScrollRight && (
                <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-zinc-900 to-transparent z-0 pointer-events-none" />
              )}

              {/* Scrollable Container */}
              <div
                ref={scrollRef}
                onScroll={checkScroll}
                className="flex overflow-x-auto gap-2 no-scrollbar scroll-smooth px-1 py-1"
              >
                {priceTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`px-3 py-2 rounded-lg text-[11px] font-bold font-orbitron transition-all border whitespace-nowrap flex-shrink-0 ${
                      selectedType === type
                        ? 'bg-racing-yellow text-black border-racing-yellow shadow-[0_0_10px_rgba(255,215,0,0.3)]'
                        : 'bg-zinc-800 text-gray-400 border-white/10 hover:border-white/30 hover:text-white'
                    }`}
                  >
                    {formatKey(type)}
                  </button>
                ))}
              </div>

              {/* Next Button */}
              {canScrollRight && (
                <button
                  onClick={() => scroll('right')}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-zinc-800 border border-white/20 flex items-center justify-center text-racing-yellow shadow-lg hover:bg-zinc-700 transition-all"
                >
                  <ChevronRight size={14} />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Price & Savings Section Container */}
        <div className="mb-6 bg-zinc-950/50 p-4 rounded-xl border border-white/5 relative overflow-hidden">
          {/* Background Glow Effect */}
          <div className="absolute -top-10 -right-10 w-20 h-20 bg-racing-yellow/10 blur-2xl rounded-full pointer-events-none"></div>

          {/* Savings Information */}
          {savings > 0 && (
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs text-gray-500 line-through font-rajdhani decoration-red-500/50">
                {formatRupiah(currentNormal)}
              </span>
              <span className="bg-red-500/10 border border-red-500/20 text-red-400 px-2 py-0.5 rounded text-[10px] font-bold font-orbitron flex items-center gap-1">
                <Tag size={10} />
                HEMAT {formatRupiah(savings)}
              </span>
            </div>
          )}

          {/* Main Price */}
          <div className="flex items-center justify-between">
            <span className="text-2xl md:text-3xl font-orbitron font-bold text-racing-yellow">
              {formatRupiah(currentPromo)}
            </span>
          </div>

          {/* Guarantee */}
          {variant.details.guarantee !== '-' && (
            <div className="mt-3 flex items-center gap-2 text-[10px] text-green-400 border-t border-white/5 pt-2">
              <ShieldCheck size={12} />
              <span className="font-rajdhani font-semibold tracking-wide text-gray-300">
                {variant.details.guarantee}
              </span>
            </div>
          )}
        </div>

        {/* Details & Features */}
        <div className="flex-grow mb-6">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-orbitron font-bold text-[10px] text-gray-500 uppercase tracking-wider">
              Include:
            </h4>
            <span className="text-[10px] text-gray-500 font-rajdhani bg-zinc-800 px-2 py-0.5 rounded">
              {variant.details.duration}
            </span>
          </div>

          <ul className="space-y-2 max-h-[150px] overflow-y-auto custom-scrollbar pr-2">
            {variant.features.map((feature, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2 text-xs text-gray-300 font-rajdhani leading-relaxed"
              >
                <CheckCircle
                  size={14}
                  className="text-racing-yellow shrink-0 mt-0.5"
                />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Bonus Section */}
        {variant.details.bonus && (
          <div className="bg-gradient-to-r from-racing-yellow/10 to-transparent border-l-2 border-racing-yellow pl-3 py-2 mb-5">
            <p className="text-[10px] font-bold text-racing-yellow font-orbitron flex items-center gap-1">
              <Gift size={12} /> BONUS SPESIAL
            </p>
            <p className="text-xs text-gray-300 font-rajdhani italic opacity-80">
              {variant.details.bonus}
            </p>
          </div>
        )}

        {/* CTA Button */}
        <button
          onClick={() =>
            onBooking(
              `${variant.title} - ${formatKey(selectedType)}`,
              currentPromo,
            )
          }
          className="w-full py-3.5 rounded-xl bg-racing-yellow text-black hover:bg-white transition-all font-orbitron font-bold text-sm flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(255,215,0,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] transform active:scale-[0.98]"
        >
          <MessageCircle size={18} />
          BOOKING SEKARANG
        </button>
      </div>
    </div>
  );
};

// --- Main Page Component ---

export default function ServiceDetailPage({ params }) {
  const unwrappedParams = use(params);
  const { slug } = unwrappedParams;
  const service = servicesData.find((s) => s.slug === slug);

  // State for Modal
  const [modalImage, setModalImage] = useState(null);

  if (!service) return notFound();

  const handleBooking = (variantName, price) => {
    const formattedPrice = formatRupiah(price);
    const message = `Halo Admin TJM, saya mau booking paket *${variantName}* dengan harga promo *${formattedPrice}*. Mohon infonya.`;
    window.open(
      `https://wa.me/6281234567890?text=${encodeURIComponent(message)}`,
      '_blank',
    );
  };

  return (
    <div className="min-h-screen pb-24 text-white">
      {/* Styles for scrollbar */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #27272a;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #ffd700;
          border-radius: 4px;
        }
        /* Hide scrollbar for tabs but keep functionality if needed */
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Modal Popup */}
      <ImageModal
        isOpen={!!modalImage}
        imageSrc={modalImage}
        onClose={() => setModalImage(null)}
      />

      <Header />

      {/* Hero Section */}
      <div className="relative h-[300px] md:h-[400px]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: service.cover
              ? `url('${service.cover}')`
              : `url('https://source.unsplash.com/random/800x600/?motorcycle,garage&sig=${service.id}')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-racing-dark via-racing-dark/80 to-transparent" />

        <div className="absolute inset-0 container mx-auto px-5 flex flex-col justify-end pb-8">
          <Link
            href="/services"
            className="absolute top-6 left-5 p-2 bg-white/10 backdrop-blur rounded-full hover:bg-racing-yellow hover:text-black transition-colors"
          >
            <ArrowLeft size={20} />
          </Link>
          <span className="inline-block px-3 py-1 bg-racing-yellow text-black font-orbitron text-xs font-bold rounded mb-3 w-fit">
            {service.category}
          </span>
          <h1 className="text-3xl md:text-5xl font-orbitron font-bold leading-tight mb-2">
            {service.title}
          </h1>
          <p className="text-gray-300 font-rajdhani text-sm md:text-lg max-w-2xl">
            {service.shortDesc}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-5 mt-8 max-w-6xl">
        <div className="mb-10 text-center md:text-left">
          <h2 className="text-xl font-orbitron font-bold italic text-racing-yellow mb-2">
            "{service.tagline}"
          </h2>
          <p className="text-gray-400 text-sm">
            Pilih varian paket dan sesuaikan dengan tipe motor kamu.
          </p>
        </div>

        {/* Grid adjusted for wider cards if needed */}
        <div className="grid grid-cols-2 gap-8 animate-in slide-in-from-bottom-8 duration-700">
          {service.variants.map((variant) => (
            <VariantCard
              key={variant.id}
              variant={variant}
              coverImage={service.cover}
              onBooking={handleBooking}
              onImageClick={(src) => setModalImage(src)}
            />
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
