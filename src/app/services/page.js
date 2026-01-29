'use client';

import Header from '@/components/layout/Header';
import PageHero from '@/components/layout/PageHero';
import ServicesGrid from '@/components/services/ServicesGrid';
import BottomNav from '@/components/layout/BottomNav';

export default function ServicesPage() {
  return (
    <div className="pb-37 min-h-screen ">
      <Header />

      {/* Reusable Hero Component */}
      <PageHero
        title="DAFTAR"
        highlight="PAKET"
        subtitle="Pilih kategori service dan varian yang sesuai dengan kebutuhan motor Anda."
        bgImage="/Gallery/gallery3.webp"
      />

      <main className="px-5 -mt-6 relative z-10 sm:mt-8 sm:px-8 max-w-7xl mx-auto">
        {/* Grid Component */}
        <ServicesGrid />

        <div className="text-center mt-8 text-gray-500 text-xs font-rajdhani">
          <p>Menampilkan seluruh 15 paket layanan Motozone</p>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
