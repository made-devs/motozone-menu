'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// Import Components
import Header from '@/components/layout/Header';
import BottomNav from '@/components/layout/BottomNav';
import PromoSpecial from '@/components/home/PromoSpecial';
import PromoGratis from '@/components/home/PromoGratis';
import PromoSection from '@/components/home/PromoSection';
import ServiceSection from '@/components/home/ServiceSection';
import GalleryTeaser from '@/components/home/GalleryTeaser';

gsap.registerPlugin(useGSAP);

export default function HomePage() {
  const container = useRef(null);

  // Orchestrate Animations
  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.from('.app-header', {
        y: -50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      })
        .from(
          '.hero-area',
          { scale: 0.95, opacity: 0, duration: 0.8, ease: 'back.out(1.5)' },
          '-=0.5',
        )
        .from(
          '.cat-item',
          { y: 30, opacity: 0, stagger: 0.05, duration: 0.5, ease: 'back.out' },
          '-=0.3',
        )
        .from(
          '.section-entrance',
          {
            y: 50,
            opacity: 0,
            duration: 0.6,
            stagger: 0.2,
            ease: 'power2.out',
          },
          '-=0.2',
        );
    },
    { scope: container },
  );

  return (
    // Tambahkan 'overflow-x-hidden' dan 'w-full' di sini untuk mencegah horizontal scroll
    <div
      ref={container}
      className="pb-24 min-h-screen relative w-full overflow-x-hidden max-w-[100vw]"
    >
      <Header />

      <main className="pt-6">
        <PromoSpecial />
        <PromoGratis />

        <div className="section-entrance">
          <PromoSection />
        </div>

        <div className="section-entrance">
          <ServiceSection />
        </div>

        <div className="section-entrance">
          <GalleryTeaser />
        </div>
      </main>

      <BottomNav />
    </div>
  );
}

