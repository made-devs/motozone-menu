"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Gift } from "lucide-react";

// Data Mockup: 18 Items
const promoItems = [
  { id: 1, image: "/Promo/gratis11.webp" },
  { id: 2, image: "/Promo/gratis1.webp" },
  { id: 3, image: "/Promo/gratis16.webp" },
  { id: 4, image: "/Promo/gratis12.webp" },
  { id: 5, image: "/Promo/gratis17.webp" },
  { id: 6, image: "/Promo/gratis18.webp" },
  { id: 7, image: "/Promo/gratis13.webp" },
  { id: 8, image: "/Promo/gratis2.webp" },
  { id: 9, image: "/Promo/gratis14.webp" },
  { id: 10, image: "/Promo/gratis15.webp" },
  { id: 11, image: "/Promo/gratis6.webp" },
  { id: 12, image: "/Promo/gratis7.webp" },
  { id: 13, image: "/Promo/gratis8.webp" },
  { id: 14, image: "/Promo/gratis9.webp" },
  { id: 15, image: "/Promo/gratis10.webp" },
  { id: 16, image: "/Promo/gratis3.webp" },
  { id: 17, image: "/Promo/gratis4.webp" },
  { id: 18, image: "/Promo/gratis5.webp" },
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
      if (window.innerWidth >= 768)
        setItemsPerScreen(2); // Tablet
      else setItemsPerScreen(1); // Mobile
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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
            PROMO GRATIS{" "}
            <span className="text-racing-yellow italic">MEGA PERFORMANCE</span>
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
              className="px-2 shrink-0"
              style={{ width: `${100 / itemsPerScreen}%` }}
            >
              {/* Card with image area forced to 4:5 */}
              <div className="group relative rounded-xl overflow-hidden border border-white/10 bg-racing-dark shadow-lg flex flex-col">
                {/* Image area fixed to 4:5 */}
                <div
                  className="w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{
                    aspectRatio: "4 / 5",
                    backgroundImage: `url('${item.image}')`,
                  }}
                />
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
