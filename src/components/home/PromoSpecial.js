'use client';

import { useState, useEffect } from 'react';
import { ChevronRight, MoveHorizontal } from 'lucide-react';

const promos = [
  {
    id: 1,
    badge: 'PROMO GRAND OPENING',
    title: 'FREE DYNO TEST',
    highlight: 'PERFORMA PUNCAK',
    desc: 'Gratis Dyno Run setiap pengerjaan servis besar & bore-up mesin.',
    image: '/cover-promo1.webp', // Dyno/Tech vibe
  },
  {
    id: 2,
    badge: 'PROMO GRAND OPENING',
    title: 'FREE WHEEL',
    highlight: 'BALANCING',
    desc: 'Hilangkan getaran pada stang. Gratis setiap penggantian ban luar.',
    image: '/cover-promo2.webp', // Wheel/Tire vibe
  },
  {
    id: 3,
    badge: 'PROMO GRAND OPENING',
    title: 'FREE QUICKWASH',
    highlight: 'NANO SHIELD',
    desc: 'Motor kinclong proteksi maksimal. Gratis setiap servis rutin paket gold.',
    image:
      'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&w=800&q=80', // Washing vibe
  },
  {
    id: 4,
    badge: 'PROMO GRAND OPENING',
    title: 'FREE HELM',
    highlight: 'SPA TREATMENT',
    desc: 'Riding jauh lebih nyaman dengan helm wangi dan bersih.',
    image:
      'https://images.unsplash.com/photo-1558981396-0f72782e9643?auto=format&fit=crop&w=800&q=80', // Helmet vibe
  },
  {
    id: 5,
    badge: 'PROMO GRAND OPENING',
    title: 'COMBO UPGRADE',
    highlight: 'DEAL',
    desc: 'Hemat hingga 30% untuk bundling Kirian CVT + Remap ECU.',
    image:
      'https://images.unsplash.com/photo-1622185135505-2d79504399d9?auto=format&fit=crop&w=800&q=80', // Parts vibe
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

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
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === promos.length - 1 ? 0 : prev + 1));
    }, 5000); // Ganti tiap 5 detik

    return () => clearInterval(timer);
  }, [current]); // Tambahkan dependency 'current' agar timer di-reset saat slide berubah

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
              index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            {/* Background Image */}
            <div
              className={`absolute inset-0 bg-cover bg-center transition-transform duration-[5000ms] ease-linear ${
                index === current ? 'scale-110' : 'scale-100'
              }`}
              style={{ backgroundImage: `url('${promo.image}')` }}
            ></div>

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent"></div>

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
                  <button className="flex items-center gap-2 border-2 border-racing-yellow text-racing-yellow px-4 py-1.5 md:px-5 md:py-2 rounded font-rajdhani font-bold text-xs md:text-base hover:bg-racing-yellow hover:text-black transition-all w-fit group/btn">
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
                  ? 'w-8 bg-racing-yellow shadow-[0_0_8px_var(--color-racing-yellow)]'
                  : 'w-2 bg-gray-600 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
