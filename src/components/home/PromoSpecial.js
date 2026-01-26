"use client";

import { useState, useEffect } from "react";
// tambahkan createPortal
import { createPortal } from "react-dom";
// tambahkan icon MessageCircle untuk WA
import {
  ChevronRight,
  MoveHorizontal,
  X,
  Zap,
  MessageCircle,
} from "lucide-react";

const promos = [
  {
    id: 1,
    badge: "PROMO GRAND OPENING",
    title: "FREE DYNO TEST",
    highlight: "PERFORMA PUNCAK",
    desc: "Gratis Dyno Run setiap pengerjaan servis besar & bore-up mesin.",
    details:
      "Dapatkan analisis performa mesin akurat menggunakan mesin Dyno terbaru kami. Berlaku untuk semua jenis motor sport & matic 150cc ke atas.",
    cover: "/Promo/cover-special1.webp",
    image: "/Promo/special1.webp", // Updated image path
  },
  {
    id: 2,
    badge: "PROMO GRAND OPENING",
    title: "FREE WHEEL",
    highlight: "BALANCING",
    desc: "Hilangkan getaran pada stang. Gratis setiap penggantian ban luar.",
    details:
      "Berkendara lebih stabil dan aman. Gratis balancing komputer untuk setiap pembelian ban merek Pirelli, Michelin, atau Battlax.",
    cover: "/Promo/cover-special2.webp",
    image: "/Promo/special2.webp", // Updated image path
  },
  {
    id: 3,
    badge: "PROMO GRAND OPENING",
    title: "FREE QUICKWASH",
    highlight: "NANO SHIELD",
    desc: "Motor kinclong proteksi maksimal. Gratis setiap servis rutin paket gold.",
    details:
      "Cuci motor detail dengan shampoo pH balanced dan finishing coating nano shield untuk perlindungan cat tahan lama.",
    cover: "/Promo/cover-special3.webp",
    image: "/Promo/special3.webp", // Updated image path
  },
  {
    id: 4,
    badge: "PROMO GRAND OPENING",
    title: "FREE HELM",
    highlight: "SPA TREATMENT",
    desc: "Riding jauh lebih nyaman dengan helm wangi dan bersih.",
    details:
      "Helm bau apek bikin pusing? Cuci helm gratis (deep clean & anti-bacterial).",
    cover: "/Promo/cover-special4.webp",
    image: "/Promo/special4.webp", // Updated image path
  },
  {
    id: 5,
    badge: "PROMO GRAND OPENING",
    title: "COMBO UPGRADE",
    highlight: "DEAL",
    desc: "Hemat hingga 30% untuk bundling Kirian CVT + Remap ECU.",
    details:
      "Paket upgrade performa harian paling worth it! Termasuk setting roller, per CVT, dan tuning ECU sesuai karakter riding lo.",
    cover: "/Promo/cover-special5.webp",
    image: "/Promo/special5.webp", // Updated image path
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [selectedPromo, setSelectedPromo] = useState(null); // State untuk modal
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // State untuk memastikan DOM sudah siap (untuk Portal)
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Effect untuk mengunci scroll body saat modal terbuka
  useEffect(() => {
    if (selectedPromo) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedPromo]);

  // Swipe logic constants
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      // Next Slide
      setCurrent((prev) => (prev === promos.length - 1 ? 0 : prev + 1));
    }
    if (isRightSwipe) {
      // Prev Slide
      setCurrent((prev) => (prev === 0 ? promos.length - 1 : prev - 1));
    }
  };

  // Reset timer setiap kali slide berubah (baik manual atau otomatis)
  useEffect(() => {
    // Stop autoplay jika modal sedang terbuka
    if (selectedPromo) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev === promos.length - 1 ? 0 : prev + 1));
    }, 5000); // Ganti tiap 5 detik

    return () => clearInterval(timer);
  }, [current, selectedPromo]); // Dependency updated

  // Fungsi handle WA
  const handleWhatsApp = (promo) => {
    const phoneNumber = "6281234567890"; // Ganti dengan nomor Admin TJM
    const message = `Halo Admin TJM Motozone, saya tertarik dengan promo ${promo.badge}: ${promo.title} ${promo.highlight}. Boleh info lengkapnya?`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <section className="hero-area px-5 mb-8">
      <div
        className="relative h-[280px] md:h-[320px] rounded-2xl overflow-hidden group shadow-2xl shadow-racing-yellow/10 border border-white/10 bg-racing-dark touch-pan-y"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Swipe Hint: Small, subtle, mobile only */}
        <div className="absolute top-4 right-4 z-20 md:hidden pointer-events-none opacity-60 flex items-center gap-1 animate-pulse">
          <span className="text-[10px] font-orbitron text-white tracking-widest uppercase">
            Swipe
          </span>
          <MoveHorizontal size={12} className="text-racing-yellow" />
        </div>

        {promos.map((promo, index) => (
          <div
            key={promo.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === current ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {/* Background Image */}
            <div
              className={`absolute inset-0 bg-cover bg-center transition-transform duration-[5000ms] ease-linear ${
                index === current ? "scale-110" : "scale-100"
              }`}
              style={{ backgroundImage: `url('${promo.cover}')` }}
            ></div>

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent"></div>

            {/* Content */}
            <div className="relative h-full flex flex-col px-5 md:px-10 py-5 md:py-6 md:max-w-2xl justify-center">
              <div className="flex flex-col justify-center h-full">
                <div>
                  <div className="bg-racing-yellow text-black font-orbitron text-[10px] md:text-xs font-bold px-2 py-0.5 md:px-3 md:py-1 -skew-x-12 w-fit mb-2 md:mb-3 shadow-[0_0_10px_rgba(255,215,0,0.5)]">
                    {promo.badge}
                  </div>
                  <h2 className="font-orbitron text-2xl md:text-5xl font-black leading-tight mb-2 text-white">
                    {promo.title} <br />
                    <span className="text-racing-yellow italic">
                      {promo.highlight}
                    </span>
                  </h2>
                  <p className="text-gray-300 text-xs md:text-base mb-4 md:mb-5 font-rajdhani md:max-w-[80%] line-clamp-3 md:line-clamp-none leading-relaxed">
                    {promo.desc}
                  </p>
                </div>
                <div>
                  <button
                    onClick={() => setSelectedPromo(promo)}
                    className="flex items-center gap-2 border-2 border-racing-yellow text-racing-yellow px-4 py-1.5 md:px-5 md:py-2 rounded font-rajdhani font-bold text-xs md:text-base hover:bg-racing-yellow hover:text-black transition-all w-fit group/btn"
                  >
                    LIHAT DETAIL
                    <ChevronRight
                      size={16}
                      className="group-hover/btn:translate-x-1 transition-transform"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Indicators (Dots) */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {promos.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`h-1 rounded-full transition-all duration-300 ${
                current === idx
                  ? "w-8 bg-racing-yellow shadow-[0_0_8px_var(--color-racing-yellow)]"
                  : "w-2 bg-gray-600 hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* MODAL POPUP PROMO - DENGAN REACT PORTAL */}
      {/* Menggunakan Portal agal modal keluar dari container 'hero-area' dan overflow parentnya */}
      {selectedPromo &&
        mounted &&
        createPortal(
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 animate-in fade-in duration-200">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
              onClick={() => setSelectedPromo(null)}
            ></div>

            {/* Modal Container - Diperbesar (max-w-md) dan max-h dipertinggi */}
            <div className="relative w-full max-w-md bg-zinc-900 border-2 border-racing-yellow rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(255,215,0,0.3)] animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
              {/* Close Button */}
              <button
                onClick={() => setSelectedPromo(null)}
                className="absolute top-3 right-3 z-30 bg-black/60 text-white p-1.5 rounded-full hover:bg-racing-yellow hover:text-black transition-colors border border-white/20"
              >
                <X size={20} />
              </button>

              {/* Modal Image Header - Aspect Ratio 4:5 */}
              <div className="relative w-full aspect-[4/5] shrink-0">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url('${selectedPromo.image}')` }}
                ></div>
                {/* Gradient overlay agar text terbaca & blending ke body */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent"></div>

                {/* Tag Floating */}
                <div className="absolute bottom-2 left-4 z-10">
                  <span className="flex items-center gap-1 bg-racing-yellow text-black font-orbitron text-[10px] font-bold px-3 py-1 -skew-x-12 shadow-[0_0_10px_rgba(255,215,0,0.6)]">
                    <Zap size={10} fill="black" /> {selectedPromo.badge}
                  </span>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 pt-2 overflow-y-auto custom-scrollbar bg-zinc-900 relative z-20 -mt-10 rounded-t-2xl shadow-[0_-10px_20px_rgba(0,0,0,0.5)] border-t border-white/5 mx-2">
                {/* Header Title */}
                <div className="mb-4 text-center mt-2">
                  <h3 className="font-orbitron text-3xl font-black text-white italic uppercase leading-none">
                    {selectedPromo.title}
                  </h3>
                  <h3 className="font-orbitron text-2xl font-black text-racing-yellow italic uppercase">
                    {selectedPromo.highlight}
                  </h3>
                </div>

                {/* Decorative Line */}
                <div className="w-full h-px bg-gradient-to-r from-transparent via-racing-yellow/50 to-transparent mb-4"></div>

                {/* Description Body */}
                <div className="space-y-3 font-rajdhani text-gray-300 text-center">
                  <p className="font-bold text-white text-lg">
                    {selectedPromo.desc}
                  </p>
                  <p className="text-sm leading-relaxed opacity-90 text-left">
                    {selectedPromo.details
                      ? selectedPromo.details
                      : "Syarat & ketentuan berlaku. Promo terbatas selama persediaan masih ada. Hubungi admin untuk booking slot."}
                  </p>
                </div>

                {/* Action Button - WHATSAPP CTA */}
                <button
                  onClick={() => handleWhatsApp(selectedPromo)}
                  className="mt-6 w-full py-3 bg-[#25D366] hover:bg-[#128C7E] text-black hover:text-white font-orbitron font-bold text-lg uppercase tracking-wider transition-all skew-x-0 group flex items-center justify-center gap-2 rounded-lg shadow-lg hover:shadow-green-500/20"
                >
                  <MessageCircle
                    size={22}
                    className="fill-black group-hover:fill-white text-transparent transition-colors"
                  />
                  <span>BOOKING VIA WA</span>
                </button>
              </div>
            </div>
          </div>,
          document.body, // Target render portal
        )}
    </section>
  );
}
