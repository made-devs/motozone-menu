"use client";

import Link from "next/link";
import { ArrowRight, Grid, Plus } from "lucide-react";
import { servicesData } from "@/data/servicesData";

// Helper: Format Rupiah
const formatRupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(number);
};

export default function ServiceSection() {
  // Ambil hanya 5 data pertama untuk ditampilkan di Home
  const displayedServices = servicesData.slice(0, 5);

  return (
    <section className="px-5 mb-12">
      {/* Header */}
      <div className="flex items-end justify-between mb-6">
        <div>
          <h3 className="text-xl md:text-3xl font-orbitron font-bold text-white">
            SERVICE <span className="text-racing-yellow italic">MENU</span>
          </h3>
          <p className="text-gray-400 text-xs md:text-sm font-rajdhani max-w-lg">
            Top 5 Paket perawatan favorit pilihan mekanik.
          </p>
        </div>
        <Link
          href="/services"
          className="hidden md:flex items-center gap-1 text-racing-yellow text-sm font-rajdhani font-bold hover:gap-2 transition-all hover:text-white"
        >
          MENU LENGKAP <ArrowRight size={16} />
        </Link>
      </div>

      {/* Grid Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {displayedServices.map((service) => {
          const lowestPrice = Math.min(
            ...service.variants.map((v) => v.price.promo),
          );

          // --- LOGIC GAMBAR BARU ---
          // Gunakan service.cover jika ada, jika tidak ada fallback ke Unsplash
          const bgImage = service.cover
            ? `url('${service.cover}')`
            : `url('https://source.unsplash.com/random/400x300/?motorcycle,${service.category.split(" ")[0].toLowerCase()}&sig=${service.id}')`;

          return (
            <Link
              key={service.id}
              href="/services"
              className="group relative flex flex-col bg-zinc-900 border border-white/10 rounded-xl overflow-hidden hover:border-racing-yellow hover:shadow-[0_0_20px_-5px_rgba(255,215,0,0.3)] transition-all duration-300"
            >
              {/* Image Area */}
              <div className="relative h-32 md:h-40 overflow-hidden bg-zinc-800">
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{
                    backgroundImage: bgImage,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent opacity-90" />

                {/* Badge Category High Contrast Yellow */}
                <span className="absolute top-0 right-0 bg-racing-yellow text-black font-bold px-3 py-1 rounded-bl-lg text-[10px] font-orbitron shadow-lg tracking-wider">
                  {service.category}
                </span>
              </div>

              {/* Content Info */}
              <div className="p-3 md:p-4 flex flex-col flex-1">
                <h4 className="text-white font-orbitron font-bold text-sm md:text-base leading-tight mb-1 line-clamp-2 min-h-[2.5em] group-hover:text-racing-yellow transition-colors">
                  {service.title}
                </h4>

                <p className="text-gray-400 font-rajdhani text-[10px] md:text-xs line-clamp-2 mb-3">
                  {service.shortDesc}
                </p>

                {/* Footer Card: Yellow Separator & Accents */}
                <div className="mt-auto pt-3 border-t border-racing-yellow/20 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-gray-500 font-rajdhani">
                      Mulai dari
                    </span>
                    <span className="text-racing-yellow font-orbitron font-bold text-sm md:text-lg drop-shadow-sm">
                      {formatRupiah(lowestPrice)}
                    </span>
                  </div>
                  {/* Button: Outline Yellow Default -> Block Yellow Hover */}
                  <div className="h-8 w-8 rounded bg-transparent border border-racing-yellow/50 flex items-center justify-center text-racing-yellow group-hover:bg-racing-yellow group-hover:text-black group-hover:border-racing-yellow transition-all shadow-[0_0_10px_rgba(255,215,0,0.1)] group-hover:shadow-[0_0_15px_rgba(255,215,0,0.5)]">
                    <ArrowRight size={16} />
                  </div>
                </div>
              </div>
            </Link>
          );
        })}

        {/* --- SLOT KE-6: CTA CARD YELLOW VERSION --- */}
        <Link
          href="/services"
          className="group flex flex-col items-center justify-center gap-4 bg-racing-yellow/5 backdrop-blur-sm border border-dashed border-racing-yellow/30 rounded-xl p-4 text-center hover:bg-racing-yellow hover:border-solid hover:border-racing-yellow transition-all duration-300 min-h-[250px] relative overflow-hidden"
        >
          {/* Subtle Glow Effect Behind */}
          <div className="absolute inset-0 bg-gradient-to-br from-racing-yellow/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

          <div className="relative z-10 w-16 h-16 rounded-full bg-racing-yellow/10 border border-racing-yellow/20 flex items-center justify-center text-racing-yellow group-hover:bg-black group-hover:text-racing-yellow group-hover:scale-110 transition-all duration-300 shadow-[0_0_15px_rgba(255,215,0,0.2)]">
            <Grid size={28} />
            <div className="absolute -top-1 -right-1 bg-racing-yellow text-black rounded-full p-0.5">
              <Plus size={12} strokeWidth={4} />
            </div>
          </div>

          <div className="relative z-10">
            <h4 className="text-white font-orbitron font-bold text-lg mb-0 group-hover:text-black transition-colors">
              LIHAT SEMUA
            </h4>
            <p className="text-racing-yellow font-rajdhani text-sm font-bold group-hover:text-black/70 transition-colors">
              + {servicesData.length - 5} Paket Lainnya
            </p>
          </div>

          <div className="relative z-10 px-6 py-2 rounded border border-racing-yellow text-[10px] font-orbitron font-bold text-racing-yellow group-hover:bg-black group-hover:border-black group-hover:text-racing-yellow transition-colors tracking-widest uppercase">
            Tap to View
          </div>
        </Link>
      </div>
    </section>
  );
}
