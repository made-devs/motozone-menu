"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import {
  Gauge,
  Settings,
  Disc,
  Zap,
  Wrench,
  Thermometer,
  Timer,
  CheckCircle2,
  X,
  MessageCircle,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";
import { servicesData } from "@/data/servicesData";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";

// Mapping icon sama seperti sebelumnya
const iconMap = {
  Gauge: Gauge,
  Wheel: Disc,
  Engine: Settings,
  Brake: Disc,
  Steering: Wrench,
  Radiator: Thermometer,
};

const formatRupiah = (number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(number);

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState(servicesData[0].id);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const activeCategory = servicesData.find(
    (service) => service.id === activeTab,
  );

  const handleWhatsApp = (variant, categoryName) => {
    const phoneNumber = "6281234567890";
    const message = `Halo Admin TJM, saya mau booking service: ${categoryName} - Varian: ${variant.type} ${variant.cc}`;
    window.open(
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
      "_blank",
    );
  };

  return (
    <div className="pb-24 min-h-screen bg-racing-dark">
      <Header />

      <main className="pt-24 px-5">
        {/* Page Title with Back Button */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/"
            className="p-2 bg-white/5 rounded-full hover:bg-racing-yellow hover:text-black transition-colors"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-3xl font-orbitron font-bold text-white leading-none">
              KATALOG <span className="text-racing-yellow italic">SERVICE</span>
            </h1>
            <p className="text-gray-400 text-sm font-rajdhani mt-1">
              Daftar lengkap paket perawatan motor
            </p>
          </div>
        </div>

        {/* --- LOGIKA YANG TADI DI HOME --- */}
        {/* Tabs */}
        <div className="sticky top-[70px] z-30 bg-racing-dark/95 backdrop-blur py-2 -mx-5 px-5 mb-6 border-b border-white/10">
          <div className="flex overflow-x-auto gap-3 custom-scrollbar hide-scrollbar">
            {servicesData.map((service) => {
              const Icon = iconMap[service.icon] || Settings;
              const isActive = activeTab === service.id;
              return (
                <button
                  key={service.id}
                  onClick={() => setActiveTab(service.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all duration-300 font-orbitron font-bold text-xs ${
                    isActive
                      ? "bg-racing-yellow text-black shadow-[0_0_15px_rgba(255,215,0,0.4)]"
                      : "bg-white/5 text-gray-400 border border-white/10"
                  }`}
                >
                  <Icon size={16} />
                  {service.category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content List */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="mb-4">
            <h2 className="text-xl font-orbitron font-bold text-white">
              {activeCategory.title}
            </h2>
            <p className="text-gray-400 text-sm">{activeCategory.shortDesc}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeCategory.variants.map((variant) => (
              <div
                key={variant.id}
                onClick={() => setSelectedVariant(variant)}
                className="bg-zinc-900 border border-white/10 rounded-xl overflow-hidden flex cursor-pointer hover:border-racing-yellow/50 transition-all"
              >
                {/* Small Image Left */}
                <div className="w-28 relative bg-zinc-800">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${variant.image}')` }}
                  />
                </div>
                {/* Info Right */}
                <div className="flex-1 p-3 flex flex-col justify-center">
                  <div className="flex justify-between items-start mb-1">
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${variant.type === "Matic" ? "bg-blue-900 text-blue-200" : "bg-red-900 text-red-200"}`}
                    >
                      {variant.type}
                    </span>
                    <span className="text-racing-yellow font-orbitron font-bold text-sm">
                      {variant.cc}
                    </span>
                  </div>
                  <h3 className="text-white font-bold font-rajdhani text-sm leading-tight mb-2">
                    Paket {variant.type} {variant.cc}
                  </h3>
                  <div className="mt-auto">
                    <span className="text-xs text-gray-500 line-through mr-2">
                      {formatRupiah(variant.price.normal)}
                    </span>
                    <span className="text-racing-yellow font-bold font-orbitron">
                      {formatRupiah(variant.price.promo)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* --- MODAL DETAIL (Sama seperti sebelumnya) --- */}
      {selectedVariant &&
        createPortal(
          <div className="fixed inset-0 z-[9999] flex items-end md:items-center justify-center p-0 md:p-4 animate-in fade-in duration-200">
            <div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setSelectedVariant(null)}
            />
            <div className="relative w-full md:max-w-md bg-zinc-900 border-t-2 border-racing-yellow rounded-t-3xl md:rounded-2xl p-5 max-h-[85vh] overflow-y-auto flex flex-col gap-4 animate-in slide-in-from-bottom">
              {/* Header */}
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-orbitron font-bold text-white">
                    DETAIL PAKET
                  </h3>
                  <p className="text-racing-yellow font-rajdhani font-bold">
                    {selectedVariant.type} - {selectedVariant.cc}
                  </p>
                </div>
                <button onClick={() => setSelectedVariant(null)}>
                  <X className="text-white" />
                </button>
              </div>

              {/* Feature List */}
              <div className="bg-white/5 p-4 rounded-xl space-y-2">
                {selectedVariant.features.map((f, i) => (
                  <div
                    key={i}
                    className="flex gap-2 text-sm text-gray-300 font-rajdhani"
                  >
                    <CheckCircle2
                      size={16}
                      className="text-green-500 shrink-0"
                    />{" "}
                    {f}
                  </div>
                ))}
              </div>

              <button
                onClick={() =>
                  handleWhatsApp(selectedVariant, activeCategory.title)
                }
                className="w-full py-3 bg-[#25D366] text-black font-bold rounded-lg flex justify-center items-center gap-2"
              >
                <MessageCircle /> Booking Sekarang
              </button>
            </div>
          </div>,
          document.body,
        )}

      <BottomNav />
    </div>
  );
}
