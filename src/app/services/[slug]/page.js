'use client';

import { use, useState } from 'react';
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
  const savings =
    variant.price.normal > variant.price.promo
      ? variant.price.normal - variant.price.promo
      : 0;

  const displayImage = variant.image || coverImage;

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
        {/* Hover Overlay with Icon */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <Maximize2
            className="text-racing-yellow drop-shadow-md transform scale-75 group-hover:scale-100 transition-transform duration-300"
            size={32}
          />
        </div>
      </div>

      {/* Content Area */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Header: Type & CC */}
        <div className="mb-4 flexjustify-between items-start">
          <div>
            <p className="text-[10px] font-bold text-racing-yellow font-orbitron uppercase tracking-widest mb-1">
              {variant.type}
            </p>
            <h3 className="text-2xl font-orbitron font-bold text-white uppercase">
              {variant.cc}
            </h3>
          </div>
        </div>

        {/* Separator */}
        <div className="h-px w-full bg-white/10 mb-4"></div>

        {/* Price & Savings Section */}
        <div className="mb-5">
          {/* Savings Info Row */}
          {savings > 0 && (
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs text-gray-500 line-through font-rajdhani">
                {formatRupiah(variant.price.normal)}
              </span>
              <span className="bg-red-600/20 border border-red-500/30 text-red-400 px-2 py-0.5 rounded text-[10px] font-bold font-orbitron flex items-center gap-1">
                <Tag size={10} />
                HEMAT {formatRupiah(savings)}
              </span>
            </div>
          )}

          {/* Main Price */}
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-orbitron font-bold text-racing-yellow">
              {formatRupiah(variant.price.promo)}
            </span>
          </div>

          {/* Guarantee - Cleanly placed below price */}
          <div className="flex items-center gap-2 text-xs text-green-400 mt-2 bg-green-900/10 py-1.5 px-3 rounded border border-green-500/20 w-fit">
            <ShieldCheck size={14} />
            <span className="font-rajdhani font-semibold tracking-wide text-gray-200">
              {variant.details.guarantee}
            </span>
          </div>
        </div>

        {/* Features List */}
        <div className="flex-grow">
          <h4 className="font-orbitron font-bold text-[10px] text-gray-500 mb-3 uppercase tracking-wider">
            Package Includes:
          </h4>
          <ul className="space-y-2 mb-4 max-h-[150px] overflow-y-auto custom-scrollbar pr-2">
            {variant.features.map((feature, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2 text-xs text-gray-300 font-rajdhani"
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
            <p className="text-xs text-gray-300 font-rajdhani italic">
              {variant.details.bonus}
            </p>
          </div>
        )}

        {/* CTA Button */}
        <button
          onClick={() =>
            onBooking(`${variant.type} ${variant.cc}`, variant.price.promo)
          }
          className="w-full py-3 rounded-xl bg-racing-yellow text-black hover:bg-white transition-all font-orbitron font-bold text-sm flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(255,215,0,0.2)] hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] transform hover:-translate-y-0.5 active:translate-y-0"
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
    const message = `Halo Admin TJM, saya mau booking paket *${service.title}* untuk varian *${variantName}* dengan harga promo *${formattedPrice}*. Mohon infonya.`;
    window.open(
      `https://wa.me/6281234567890?text=${encodeURIComponent(message)}`,
      '_blank',
    );
  };

  return (
    <div className="min-h-screen  pb-24 text-white">
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
      <main className="container mx-auto px-5 mt-8 max-w-5xl">
        <div className="mb-10 text-center md:text-left">
          <h2 className="text-xl font-orbitron font-bold italic text-racing-yellow mb-2">
            "{service.tagline}"
          </h2>
          <p className="text-gray-400 text-sm">
            Klik gambar untuk memperbesar detail paket.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in slide-in-from-bottom-8 duration-700">
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
