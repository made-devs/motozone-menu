"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle,
  Clock,
  ShieldCheck,
  Gift,
  MessageCircle,
} from "lucide-react";
import { servicesData } from "@/data/servicesData";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";

// Helper Format Rupiah
const formatRupiah = (val) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(val);

export default function ServiceDetailPage({ params }) {
  const unwrappedParams = use(params);
  const { slug } = unwrappedParams;

  const service = servicesData.find((s) => s.slug === slug);

  if (!service) {
    return notFound();
  }

  const handleBooking = (variantName) => {
    const message = `Halo Admin TJM, saya mau booking paket *${service.title}* untuk varian *${variantName}*. Mohon infonya.`;
    window.open(
      `https://wa.me/6281234567890?text=${encodeURIComponent(message)}`,
      "_blank",
    );
  };

  return (
    <div className="min-h-screen bg-racing-dark pb-24 text-white">
      {/* Inject Custom Style for Yellow Scrollbar */}
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
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #e5c100;
        }
      `}</style>

      <Header />

      {/* --- HERO SECTION (Tetap Landscape) --- */}
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

      <main className="container mx-auto px-5 mt-8 max-w-5xl">
        <div className="mb-10 text-center md:text-left">
          <h2 className="text-xl font-orbitron font-bold italic text-racing-yellow mb-2">
            "{service.tagline}"
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Pilih varian di bawah ini sesuai dengan kapasitas mesin (CC) dan
            tipe motor Anda untuk melihat detail paket.
          </p>
        </div>

        {/* --- VARIANTS LIST --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in slide-in-from-bottom-8 pb-15 duration-700">
          {service.variants.map((variant) => (
            <div
              key={variant.id}
              className="bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden hover:border-racing-yellow hover:shadow-[0_0_20px_-5px_rgba(255,215,0,0.2)] transition-all duration-300 flex flex-col"
            >
              {/* --- IMAGE AREA (ASPECT RATIO 4:5) --- */}
              <div className="relative aspect-[4/5] w-full bg-zinc-800">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
                  style={{
                    backgroundImage: `url('${variant.image || service.cover}')`,
                  }}
                />

                {/* Gradient Bottom-Up agar text kebaca */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent opacity-90" />

                <div className="absolute bottom-4 left-4 z-10 w-[90%]">
                  <p className="text-[10px] font-bold text-gray-400 font-rajdhani uppercase mb-0">
                    Variant
                  </p>
                  <h3 className="text-xl font-orbitron font-bold text-white leading-none">
                    {variant.type}{" "}
                    <span className="text-racing-yellow block text-2xl mt-1">
                      {variant.cc}
                    </span>
                  </h3>
                </div>
              </div>

              {/* Pricing Section */}
              <div className="px-4 py-3 border-b border-dashed border-white/10 bg-zinc-900/50">
                <div className="flex flex-col mb-1">
                  {variant.price.normal > variant.price.promo && (
                    <span className="text-[10px] text-gray-500 line-through font-rajdhani">
                      {formatRupiah(variant.price.normal)}
                    </span>
                  )}
                  <span className="text-xl font-orbitron font-bold text-racing-yellow">
                    {formatRupiah(variant.price.promo)}
                  </span>
                </div>

                {/* Micro Badges */}
                <div className="flex gap-2 mt-2">
                  <div className="flex items-center gap-1 text-[10px] text-gray-400 bg-white/5 px-1.5 py-0.5 rounded border border-white/5">
                    <Clock size={10} className="text-racing-yellow" />
                    {variant.details.duration}
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-gray-400 bg-white/5 px-1.5 py-0.5 rounded border border-white/5">
                    <ShieldCheck size={10} className="text-racing-yellow" />
                    {variant.details.guarantee}
                  </div>
                </div>
              </div>

              {/* --- SCROLLABLE FEATURES --- */}
              <div className="p-4 flex-grow flex flex-col">
                <h4 className="font-orbitron font-bold text-[10px] text-gray-500 mb-2 uppercase tracking-wider">
                  Includes:
                </h4>

                {/* Wrapper Scrollable */}
                <ul className="space-y-2 mb-3 max-h-[120px] overflow-y-auto custom-scrollbar pr-2">
                  {variant.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-[11px] text-gray-300 font-rajdhani leading-snug"
                    >
                      <CheckCircle
                        size={12}
                        className="text-racing-yellow shrink-0 mt-0.5"
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Bonus Section (Fixed at bottom of body before button) */}
                {variant.details.bonus && (
                  <div className="mt-auto bg-racing-yellow/5 border border-racing-yellow/20 rounded p-2 flex gap-2 items-start mb-4">
                    <Gift
                      size={14}
                      className="text-racing-yellow shrink-0 mt-0.5"
                    />
                    <div>
                      <p className="text-[10px] font-bold text-racing-yellow font-orbitron">
                        BONUS
                      </p>
                      <p className="text-[10px] text-gray-400 font-rajdhani leading-tight line-clamp-2">
                        {variant.details.bonus}
                      </p>
                    </div>
                  </div>
                )}

                {/* Action Button */}
                <button
                  onClick={() => handleBooking(`${variant.type} ${variant.cc}`)}
                  className="mt-auto w-full py-2.5 rounded-lg bg-yellow-400 text-black hover:bg-racing-yellow transition-colors font-orbitron font-bold text-xs flex items-center justify-center gap-2 shadow-lg"
                >
                  <MessageCircle size={16} />
                  BOOKING
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
