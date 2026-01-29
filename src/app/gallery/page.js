'use client';

import { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import Header from '@/components/layout/Header';
import BottomNav from '@/components/layout/BottomNav';
import PageHero from '@/components/layout/PageHero';

// Generate Array Image 1-16
const galleryData = Array.from({ length: 16 }, (_, i) => ({
  id: i + 1,
  src: `/Gallery/gallery${i + 1}.webp`,
  alt: `Motozone Documentation ${i + 1}`,
}));

export default function GalleryPage() {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  // Logic Modal Navigasi
  const handlePrev = (e) => {
    e.stopPropagation();
    setSelectedImageIndex((prev) =>
      prev > 0 ? prev - 1 : galleryData.length - 1,
    );
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setSelectedImageIndex((prev) =>
      prev < galleryData.length - 1 ? prev + 1 : 0,
    );
  };

  return (
    <div className="pb-28 min-h-screen text-white">
      <Header />

      {/* Reusable Hero from previous step */}
      <PageHero
        title="OUR"
        highlight="GALLERY"
        subtitle="Dokumentasi hasil pengerjaan, modifikasi, dan aktivitas di workshop Motozone."
        bgImage="/Gallery/gallery5.webp"
      />

      <main className="px-4 -mt-8 relative z-10 sm:mt-8 sm:px-8 max-w-7xl mx-auto">
        {/* --- MOSAIC / BENTO GRID LAYOUT --- */}
        {/* Menggunakan Grid + auto-rows + dense flow agar celah tertutup rapat dan bawahnya rata */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px] animate-in fade-in slide-in-from-bottom-8 duration-700">
          {galleryData.map((img, index) => {
            // Pola Masonry Buatan:
            // Setiap gambar index kelipatan 3 atau 0 akan dibuat tinggi (2 row)
            // Sisanya tinggi normal (1 row)
            // index % 5 === 0 utk variasi tambahan biar lebih acak
            const isTall = index % 3 === 0 || index === 7;
            const spanClass = isTall ? 'row-span-2' : 'row-span-1';

            return (
              <div
                key={img.id}
                onClick={() => setSelectedImageIndex(index)}
                className={`relative group cursor-pointer rounded-xl overflow-hidden border border-white/10 bg-zinc-900 shadow-lg hover:border-racing-yellow hover:shadow-[0_0_20px_rgba(255,215,0,0.4)] transition-all duration-300 ${spanClass}`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  // h-full w-full object-cover wajib agar gambar mengisi grid dengan sempurna (rata bawah)
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />

                {/* Overlay Hover Effect */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="bg-racing-yellow text-black p-3 rounded-full shadow-lg mx-auto w-fit">
                      <ZoomIn size={24} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {/* ---------------------------------- */}

        <div className="text-center mt-12 mb-8">
          <p className="text-gray-500 font-rajdhani text-sm">
            Showing all {galleryData.length} photos
          </p>
        </div>
      </main>

      <BottomNav />

      {/* --- LIGHTBOX MODAL (Tetap Sama) --- */}
      {selectedImageIndex !== null &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-md flex items-center justify-center animate-in fade-in duration-300"
            onClick={() => setSelectedImageIndex(null)}
          >
            {/* Close Button */}
            <button className="absolute top-6 right-6 p-2 bg-white/10 rounded-full hover:bg-racing-yellow hover:text-black transition-colors z-50">
              <X size={24} />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={handlePrev}
              className="absolute left-4 md:left-8 p-3 bg-racing-yellow/10 border border-racing-yellow/50 text-racing-yellow rounded-full hover:bg-racing-yellow hover:text-black transition-all z-50 group"
            >
              <ChevronLeft
                size={32}
                className="group-active:-translate-x-1 transition-transform"
              />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-4 md:right-8 p-3 bg-racing-yellow/10 border border-racing-yellow/50 text-racing-yellow rounded-full hover:bg-racing-yellow hover:text-black transition-all z-50 group"
            >
              <ChevronRight
                size={32}
                className="group-active:translate-x-1 transition-transform"
              />
            </button>

            {/* Main Image */}
            <div
              className="relative max-w-5xl max-h-[85vh] w-full mx-4 shadow-[0_0_50px_rgba(255,215,0,0.2)] rounded-lg overflow-hidden border-2 border-racing-yellow/30"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={galleryData[selectedImageIndex].src}
                alt="Gallery View"
                className="w-full h-full object-contain max-h-[85vh] bg-black"
              />

              {/* Counter Badge */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur px-4 py-1 rounded-full border border-white/20">
                <span className="text-racing-yellow font-orbitron font-bold">
                  {selectedImageIndex + 1}
                </span>
                <span className="text-gray-400 font-rajdhani mx-1">/</span>
                <span className="text-gray-400 font-rajdhani">
                  {galleryData.length}
                </span>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
