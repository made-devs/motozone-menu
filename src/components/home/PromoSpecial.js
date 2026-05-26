"use client";

import { useState, useEffect } from "react";
// tambahkan createPortal
import { createPortal } from "react-dom";
// tambahkan icon MessageCircle untuk WA
import {
  ChevronLeft,
  ChevronRight,
  MoveHorizontal,
  X,
  Zap,
  MessageCircle,
} from "lucide-react";

const promos = [
  { id: 1, name: "Promo 1", image: "/Promo/special1.webp" },
  { id: 2, name: "Promo 2", image: "/Promo/special2.webp" },
  { id: 3, name: "Promo 3", image: "/Promo/special3.webp" },
  { id: 4, name: "Promo 4", image: "/Promo/special4.webp" },
  { id: 5, name: "Promo 5", image: "/Promo/special5.webp" },
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

  const nextSlide = (e) => {
    if (e) e.stopPropagation();
    setCurrent((prev) => (prev === promos.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = (e) => {
    if (e) e.stopPropagation();
    setCurrent((prev) => (prev === 0 ? promos.length - 1 : prev - 1));
  };

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
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
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
    const message = `Halo Admin TJM Motozone, saya tertarik dengan promo spesial yang ada di website (${promo.name}). Boleh info lengkapnya?`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <section className="hero-area px-5 mb-8">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h3 className="text-lg md:text-2xl font-orbitron font-bold text-white flex items-center gap-2">
          <Zap className="text-racing-yellow w-5 h-5 md:w-6 md:h-6 fill-racing-yellow" />
          <span className="leading-none">
            PROMO SPESIAL{" "}
            <span className="text-racing-yellow italic">MEGA PERFORMANCE</span>
          </span>
        </h3>
      </div>

      <div
        className="relative w-full max-w-md mx-auto aspect-[4/5] rounded-2xl overflow-hidden group shadow-2xl shadow-racing-yellow/10 border border-white/10 bg-racing-dark touch-pan-y"
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

        {/* Navigation Buttons (Floating Left/Right) */}
        <button
          onClick={prevSlide}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/50 text-white border border-white/10 hover:bg-racing-yellow hover:text-black hover:border-racing-yellow transition-all opacity-60 md:opacity-0 md:group-hover:opacity-100"
          aria-label="Previous slide"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/50 text-white border border-white/10 hover:bg-racing-yellow hover:text-black hover:border-racing-yellow transition-all opacity-60 md:opacity-0 md:group-hover:opacity-100"
          aria-label="Next slide"
        >
          <ChevronRight size={20} />
        </button>

        {promos.map((promo, index) => (
          <div
            key={promo.id}
            onClick={() => setSelectedPromo(promo)}
            className={`absolute inset-0 cursor-pointer transition-opacity duration-1000 ease-in-out ${
              index === current ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {/* Background Image */}
            <div
              className={`absolute inset-0 bg-cover bg-center transition-transform duration-[5000ms] ease-linear ${
                index === current ? "scale-110" : "scale-100"
              }`}
              style={{ backgroundImage: `url('${promo.image}')` }}
            ></div>
          </div>
        ))}

        {/* Indicators (Dots) */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {promos.map((_, idx) => (
            <button
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                setCurrent(idx);
              }}
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
      {selectedPromo &&
        mounted &&
        createPortal(
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 animate-in fade-in duration-200">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
              onClick={() => setSelectedPromo(null)}
            ></div>

            {/* Modal Container */}
            <div className="relative w-full max-w-md bg-zinc-900 border-2 border-racing-yellow rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(255,215,0,0.3)] animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
              {/* Close Button */}
              <button
                onClick={() => setSelectedPromo(null)}
                className="absolute top-3 right-3 z-30 bg-black/60 text-white p-1.5 rounded-full hover:bg-racing-yellow hover:text-black transition-colors border border-white/20"
              >
                <X size={20} />
              </button>

              {/* Modal Image Area */}
              <div className="relative w-full overflow-y-auto custom-scrollbar flex-1 bg-zinc-900">
                <img
                  src={selectedPromo.image}
                  alt={selectedPromo.name}
                  className="w-full h-auto object-contain block"
                />
              </div>

              {/* Action Button - WHATSAPP CTA */}
              <div className="p-4 bg-zinc-900 border-t border-white/5 shrink-0">
                <button
                  onClick={() => handleWhatsApp(selectedPromo)}
                  className="w-full py-3 bg-[#25D366] hover:bg-[#128C7E] text-black hover:text-white font-orbitron font-bold text-base md:text-lg uppercase tracking-wider transition-all skew-x-0 group flex items-center justify-center gap-2 rounded-lg shadow-lg hover:shadow-green-500/20"
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
