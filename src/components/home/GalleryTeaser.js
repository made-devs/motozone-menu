"use client";

import Link from "next/link";
import { Camera, ArrowRight, Instagram } from "lucide-react";

export default function GalleryTeaser() {
  // Kita generate array path gambar.
  // Ditambahkan 2 foto lagi (gallery6 & gallery7) agar Grid tertutup rapat sampil bawah.
  const galleryImages = [
    { src: "/Gallery/gallery1.webp", className: "col-span-2 row-span-2" }, // Hero Image (Besar)
    { src: "/Gallery/gallery2.webp", className: "col-span-1 row-span-1" },
    { src: "/Gallery/gallery3.webp", className: "col-span-1 row-span-2" }, // Tall Image (Tinggi)
    { src: "/Gallery/gallery4.webp", className: "col-span-1 row-span-1" },
    { src: "/Gallery/gallery5.webp", className: "col-span-1 row-span-1" },
    { src: "/Gallery/gallery6.webp", className: "col-span-1 row-span-1" }, // New Item
    { src: "/Gallery/gallery7.webp", className: "col-span-1 row-span-1" }, // New Item
  ];

  return (
    <section className="px-5 mb-16">
      {/* Header Section */}
      <div className="flex items-end justify-between mb-6">
        <div>
          <h3 className="text-xl md:text-3xl font-orbitron font-bold text-white uppercase flex items-center gap-2">
            MOTOZONE <span className="text-racing-yellow italic">GALLERY</span>
          </h3>
          <p className="text-gray-400 text-xs md:text-sm font-rajdhani mt-1">
            Dokumentasi pengerjaan dan hasil modifikasi terbaik.
          </p>
        </div>
        <Link
          href="https://instagram.com"
          target="_blank"
          className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 hover:border-racing-yellow hover:text-racing-yellow transition-all text-xs font-orbitron text-gray-400"
        >
          <Instagram size={14} /> FOLLOW US
        </Link>
      </div>

      {/* Bento Grid Layout */}
      {/* Mobile: 3 kolom, Desktop: 4 kolom */}
      <div className="grid grid-cols-3 md:grid-cols-4 gap-2 md:gap-3 auto-rows-[100px] md:auto-rows-[140px]">
        {galleryImages.map((img, idx) => (
          <div
            key={idx}
            className={`group relative overflow-hidden rounded-xl bg-zinc-900 border border-white/10 hover:border-racing-yellow transition-all duration-300 ${img.className}`}
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{ backgroundImage: `url('${img.src}')` }}
            />

            {/* Overlay Gradient on Hover */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <Camera
                className="text-racing-yellow drop-shadow-md transform scale-0 group-hover:scale-100 transition-transform duration-300 delay-75"
                size={24}
              />
            </div>
          </div>
        ))}

        {/* CTA Card (Slot Terakhir) */}
        <Link
          href="#"
          className="col-span-1 row-span-1 flex flex-col items-center justify-center bg-racing-yellow text-black rounded-xl p-2 hover:bg-white transition-colors cursor-pointer"
        >
          <span className="text-2xl font-bold font-orbitron">+8</span>
          <span className="text-[10px] font-bold font-rajdhani uppercase text-center leading-tight">
            More
            <br />
            Photos
          </span>
          <ArrowRight size={14} className="mt-1" />
        </Link>
      </div>
    </section>
  );
}
