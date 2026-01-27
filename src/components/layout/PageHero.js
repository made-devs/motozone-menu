"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PageHero({
  title,
  highlight,
  subtitle,
  bgImage = "/Gallery/gallery1.webp", // Default bg
}) {
  return (
    <div className="relative w-full h-[250px] md:h-[300px] overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${bgImage}')` }}
      />

      {/* Gradient Overlay for Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-racing-dark via-racing-dark/80 to-transparent" />
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end px-5 pb-8 container mx-auto">
        {/* Back Button positioned top-left */}
        <Link
          href="/"
          className="absolute top-4 left-4 p-2 bg-white/10 backdrop-blur rounded-full hover:bg-racing-yellow hover:text-black text-white transition-colors"
        >
          <ArrowLeft size={20} />
        </Link>

        <div className="animate-in slide-in-from-bottom-4 duration-700 fade-in">
          <h1 className="text-3xl md:text-5xl font-orbitron font-bold text-white leading-none drop-shadow-md">
            {title}{" "}
            <span className="text-racing-yellow italic">{highlight}</span>
          </h1>
          <p className="text-gray-300 text-sm md:text-base font-rajdhani mt-2 max-w-lg drop-shadow">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
}
