"use client";

import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import PageHero from "@/components/layout/PageHero";
// Import komponen home yang sudah ada
import PromoSpecial from "@/components/home/PromoSpecial";
import PromoGratis from "@/components/home/PromoGratis";

export default function PromoPage() {
  return (
    <div className="pb-24 min-h-screen bg-racing-dark text-white">
      <Header />

      {/* Hero Section */}
      <PageHero
        title="SPESIAL"
        highlight="PROMO"
        subtitle="Dapatkan penawaran terbaik, diskon servis, dan item gratisan spesial bulan ini."
        bgImage="/Promo/cover-special1.webp"
      />

      <main className="relative z-10 max-w-7xl mx-auto mt-8 flex flex-col gap-4">
        {/* 1. Section Special Promo (Carousel Besar) */}
        <div>
          {/* Kita tambahkan title manual karena PromoSpecial aslinya komponen Hero tanpa judul */}
          <div className="px-5 mb-4">
            <h3 className="text-xl md:text-3xl font-orbitron font-bold text-white uppercase">
              LIMITED <span className="text-racing-yellow italic">OFFER</span>
            </h3>
            <p className="text-gray-400 text-xs md:text-sm font-rajdhani mt-1">
              Penawaran eksklusif Grand Opening dengan waktu terbatas.
            </p>
          </div>

          {/* Render Komponen Existing */}
          <PromoSpecial />
        </div>

        {/* Separator Line */}
        <div className="w-full h-px bg-white/10 mx-auto max-w-[90%] mb-6"></div>

        {/* 2. Section Gratisan (Carousel Kecil) */}
        <div>
          {/* PromoGratis sudah include Header text di dalamnya, jadi langsung render saja */}
          <PromoGratis />
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
