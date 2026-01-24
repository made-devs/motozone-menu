'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Gift } from 'lucide-react';

// Data Mockup: 18 Items
const promoItems = [
  {
    id: 1,
    title: 'VOUCHER DISCOUNT',
    subtitle: 'DETAILING & COATING 50%',
    image:
      'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 2,
    title: 'FREE NITROGEN',
    subtitle: 'LIFETIME REFILL',
    image:
      'https://images.unsplash.com/photo-1578844251758-2f71da645217?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 3,
    title: 'FREE QUICKWASH',
    subtitle: 'NANO SHIELD + DETAILING',
    image:
      'https://images.unsplash.com/photo-1552975084-6e027cd345c2?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 4,
    title: 'VOUCHER DISCOUNT',
    subtitle: 'PAKET KAKI KAKI 15%',
    image:
      'https://images.unsplash.com/photo-1568605403164-16280436d405?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 5,
    title: 'FREE COFFEE CORNER',
    subtitle: 'MOTOZONE LOUNGE',
    image:
      'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 6,
    title: 'FREE STIKER',
    subtitle: 'OFFICIAL MERCH',
    image:
      'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 7,
    title: 'VOUCHER DISCOUNT',
    subtitle: 'ENGINE SERVICE 10%',
    image:
      'https://images.unsplash.com/photo-1626847037657-fd3622613ce3?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 8,
    title: 'FREE SLEEVE',
    subtitle: 'PROTECTOR KIT',
    image:
      'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 9,
    title: 'VOUCHER DISCOUNT',
    subtitle: 'PAKET RADIATOR 20%',
    image:
      'https://images.unsplash.com/photo-1624536696956-c73eef46c7f8?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 10,
    title: 'FREE NANO COATING',
    subtitle: 'HEADLAMP RESTORE',
    image:
      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 11,
    title: 'FREE VALVE CAP',
    subtitle: 'RACING STYLE',
    image:
      'https://images.unsplash.com/photo-1622185135505-2d79504399d9?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 12,
    title: 'FREE HEADLAMP',
    subtitle: 'POLISH TREATMENT',
    image:
      'https://images.unsplash.com/photo-1456086272160-b28b232cd527?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 13,
    title: 'VOUCHER DISCOUNT',
    subtitle: 'SPAREPART 10%',
    image:
      'https://images.unsplash.com/photo-1486262715619-01b80258e0c5?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 14,
    title: 'VOUCHER DISCOUNT',
    subtitle: 'PAKET REM 15%',
    image:
      'https://images.unsplash.com/photo-1599368146197-2a65a3d7065f?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 15,
    title: 'VOUCHER DISCOUNT',
    subtitle: 'ENGINE REBUILD 20%',
    image:
      'https://images.unsplash.com/photo-1597758784157-ba5dfc7c8c3e?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 16,
    title: 'FREE SETEL RANTAI',
    subtitle: '+ CHAIN LUBE',
    image:
      'https://images.unsplash.com/photo-1563720360172-67b8f3dcebb8?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 17,
    title: 'FREE ENGINE SCANNER',
    subtitle: 'CHECKUP',
    image:
      'https://images.unsplash.com/photo-1614030638531-15a4b1361c46?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 18,
    title: 'FREE TIRE PIT',
    subtitle: 'INSPECTION',
    image:
      'https://images.unsplash.com/photo-1562920616-e6962f928a30?auto=format&fit=crop&w=600&q=80',
  },
];

export default function PromoGratis() {
  const [current, setCurrent] = useState(0);
  const [itemsPerScreen, setItemsPerScreen] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);

  // Swipe State
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const minSwipeDistance = 50;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024)
        setItemsPerScreen(3); // Desktop
      else if (window.innerWidth >= 768)
        setItemsPerScreen(2); // Tablet
      else setItemsPerScreen(1); // Mobile
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalSlides = promoItems.length;
  const maxIndex = Math.max(0, totalSlides - itemsPerScreen);

  const nextSlide = () => {
    setCurrent((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  // Swipe Logic Handlers
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    setIsHovered(true); // Pause auto-slide saat disentuh
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    setIsHovered(false); // Resume logic (akan aktif via useEffect)
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

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(timer);
  }, [current, isHovered, itemsPerScreen]);

  return (
    <section className="px-5 mb-12">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h3 className="text-lg md:text-2xl font-orbitron font-bold text-white flex items-center gap-2">
          <Gift className="text-racing-yellow w-5 h-5 md:w-6 md:h-6" />
          <span className="leading-none">
            VOUCHER &{' '}
            <span className="text-racing-yellow italic">GRATISAN</span>
          </span>
        </h3>

        {/* Navigation Buttons (Hidden on Mobile, Visible on Tablet/Desktop) */}
        <div className="hidden md:flex gap-2">
          <button
            onClick={prevSlide}
            className="p-2 border border-white/20 rounded hover:bg-racing-yellow hover:text-black hover:border-racing-yellow transition-all text-white"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={nextSlide}
            className="p-2 border border-white/20 rounded hover:bg-racing-yellow hover:text-black hover:border-racing-yellow transition-all text-white"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Carousel Container */}
      <div
        className="relative overflow-hidden touch-pan-y"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        ref={containerRef}
      >
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(-${current * (100 / itemsPerScreen)}%)`,
          }}
        >
          {promoItems.map((item) => (
            <div
              key={item.id}
              className="px-2 flex-shrink-0"
              style={{ width: `${100 / itemsPerScreen}%` }}
            >
              <div className="group relative h-[160px] md:h-[180px] rounded-xl overflow-hidden border border-white/10 bg-racing-dark shadow-lg">
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url('${item.image}')` }}
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-90 transition-opacity group-hover:opacity-80" />

                {/* Content */}
                <div className="absolute inset-0 p-4 md:p-5 flex flex-col justify-end">
                  <div className="h-0.5 md:h-1 w-8 md:w-10 bg-racing-yellow mb-2 md:mb-3 rounded-full shadow-[0_0_8px_var(--color-racing-yellow)]" />

                  <h4 className="font-orbitron font-bold text-base md:text-lg leading-tight text-white mb-0.5 md:mb-1 line-clamp-2">
                    {item.title}
                  </h4>
                  <p className="font-rajdhani font-semibold text-racing-yellow text-xs md:text-sm tracking-wider line-clamp-1">
                    {item.subtitle}
                  </p>
                </div>

                {/* Number Badge */}
                <div className="absolute top-2 right-2 md:top-3 md:right-3 text-white/10 font-orbitron font-bold text-3xl md:text-4xl">
                  {item.id.toString().padStart(2, '0')}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Bar Indicator */}
      <div className="mt-4 h-1 w-full bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-racing-yellow transition-all duration-500"
          style={{
            width: `${((current + itemsPerScreen) / totalSlides) * 100}%`,
          }}
        />
      </div>
    </section>
  );
}
