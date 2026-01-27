"use client";

import Link from "next/link";
import {
  ArrowRight,
  Gauge,
  Settings,
  Disc,
  Wrench,
  Thermometer,
} from "lucide-react";
import { servicesData } from "@/data/servicesData";

// Helper & Mapping
const formatRupiah = (num) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(num);

const iconMap = {
  Gauge: Gauge,
  Engine: Settings,
  Wheel: Disc,
  Brake: Disc,
  Steering: Wrench,
  Radiator: Thermometer,
};

export default function ServicesGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
      {servicesData.map((service) => {
        const lowestPrice = Math.min(
          ...service.variants.map((v) => v.price.promo),
        );
        const bgImage = service.cover
          ? `url('${service.cover}')`
          : `url('https://source.unsplash.com/random/400x300/?motorcycle,${service.category.split(" ")[0].toLowerCase()}&sig=${service.id}')`;
        const Icon = iconMap[service.icon] || Settings;

        return (
          <Link
            key={service.id}
            href={`/services/${service.slug}`}
            className="relative flex flex-col h-full bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden group hover:border-racing-yellow hover:shadow-[0_0_25px_-5px_rgba(255,215,0,0.3)] transition-all duration-300"
          >
            {/* Image Header */}
            <div className="relative h-40 shrink-0 overflow-hidden bg-zinc-800">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: bgImage }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent opacity-90" />

              <div className="absolute top-0 right-0 bg-racing-yellow px-3 py-1 rounded-bl-lg">
                <span className="text-[10px] font-orbitron font-bold text-black uppercase tracking-wider">
                  {service.variants.length} Varian
                </span>
              </div>

              <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-black/50 backdrop-blur border border-white/20 flex items-center justify-center text-racing-yellow">
                <Icon size={16} />
              </div>
            </div>

            {/* Content Body */}
            <div className="p-4 pt-2 flex flex-col flex-grow">
              <div className="mb-2">
                <span className="text-[10px] font-rajdhani text-gray-400 uppercase tracking-widest block mb-1">
                  {service.category}
                </span>
                <h3 className="text-white font-orbitron font-bold text-sm md:text-base leading-tight group-hover:text-racing-yellow transition-colors line-clamp-2 h-10 flex items-center">
                  {service.title}
                </h3>
              </div>

              <p className="text-gray-500 font-rajdhani text-xs mb-4 line-clamp-3">
                {service.shortDesc}
              </p>

              <div className="mt-auto pt-3 border-t border-dashed border-white/20 flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-gray-400 font-rajdhani">
                    Best Price
                  </p>
                  <p className="text-racing-yellow font-bold font-orbitron text-lg">
                    {formatRupiah(lowestPrice)}
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full border border-white/20 group-hover:bg-racing-yellow group-hover:border-racing-yellow group-hover:text-black flex items-center justify-center transition-all text-gray-400">
                  <ArrowRight size={16} />
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
