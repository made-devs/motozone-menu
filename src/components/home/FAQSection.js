"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle, ArrowDown } from "lucide-react";

const faqList = [
  {
    question: "Apa perbedaan paket Tune Up Nendang, Ngacir, dan Tipis-Tipis?",
    answer:
      "Paket 'Tipis-Tipis' adalah perawatan ringan untuk harian. Paket 'Nendang' adalah standar tune-up komplit dengan pembersihan injektor. Sedangkan 'Ngacir' adalah paket performa advance dengan tambahan kalibrasi sensor, leak down test, dan optimalisasi pembakaran untuk performa maksimal.",
  },
  {
    question: "Apa itu 150 Titik Inspeksi Motozone?",
    answer:
      "Ini adalah standar pengecekan eksklusif kami. Mekanik akan memeriksa 150 bagian vital pada motor Anda, mulai dari sistem mesin, kelistrikan, pengereman, hingga kaki-kaki, untuk memastikan tidak ada masalah tersembunyi sebelum Anda berkendara.",
  },
  {
    question: "Apakah service di Motozone ada garansinya?",
    answer:
      "Tentu saja! Hampir seluruh paket service kami (Tune Up, Kaki-Kaki, hingga Full Engine) dilindungi Garansi Service selama 2 Minggu. Jika ada keluhan pada bagian yang sama dalam periode tersebut, kami perbaiki GRATIS.",
  },
  {
    question: "Berapa lama waktu pengerjaan service?",
    answer:
      "Tergantung paket yang diambil. Untuk 'Fast Lane' hanya butuh 30 menit. Tune Up reguler berkisar 1-2 jam. Untuk pekerjaan berat seperti Turun Mesin (Full Engine) atau Kaki-Kaki Extreme, estimasi waktu 3-4 jam.",
  },
  {
    question: "Motor apa saja yang bisa ditangani?",
    answer:
      "Kami melayani hampir semua jenis motor, mulai dari Matic kecil (100cc) hingga Moge Sport (1000cc). Kami memiliki *special tools* dan mekanik berpengalaman untuk motor ABS maupun Non-ABS.",
  },
  {
    question: "Apa saja bonus yang didapat saat service?",
    answer:
      "Banyak paket kami (seperti Nendang & Ngacir) yang sudah *include* bonus menarik seperti Gratis 2 Liter Pertamax, Gratis Nitrogen, Octane Booster+, hingga Free O-Ring. Cek detail paket untuk bonus spesifiknya.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0); // Default open item pertama

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="px-5 mb-10 container mx-auto max-w-4xl">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center p-3 rounded-full bg-racing-yellow/10 text-racing-yellow mb-4 border border-racing-yellow/20">
          <HelpCircle size={24} />
        </div>
        <h3 className="text-2xl md:text-4xl font-orbitron font-bold text-white mb-2">
          FREQUENTLY ASKED{" "}
          <span className="text-racing-yellow italic">QUESTIONS</span>
        </h3>
        <p className="text-gray-400 font-rajdhani text-sm md:text-base">
          Jawaban untuk pertanyaan yang sering diajukan seputar layanan
          Motozone.
        </p>
      </div>

      {/* Accordion List */}
      <div className="flex flex-col gap-3">
        {faqList.map((item, idx) => {
          const isOpen = openIndex === idx;

          return (
            <div
              key={idx}
              onClick={() => toggleFAQ(idx)}
              className={`group border rounded-xl overflow-hidden transition-all duration-300 cursor-pointer ${
                isOpen
                  ? "bg-zinc-900 border-racing-yellow shadow-[0_4px_20px_-5px_rgba(255,215,0,0.2)]"
                  : "bg-zinc-900/50 border-white/10 hover:border-white/30"
              }`}
            >
              {/* Question Header */}
              <div className="flex items-center justify-between p-4 md:p-5">
                <h4
                  className={`font-orbitron font-bold text-sm md:text-base transition-colors ${
                    isOpen
                      ? "text-racing-yellow"
                      : "text-white group-hover:text-gray-200"
                  }`}
                >
                  {item.question}
                </h4>
                <div
                  className={`transform transition-transform duration-300 ${
                    isOpen ? "rotate-180 text-racing-yellow" : "text-gray-500"
                  }`}
                >
                  <ChevronDown size={20} />
                </div>
              </div>

              {/* Answer Body */}
              <div
                className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="p-4 md:p-5 pt-0 text-gray-400 text-sm md:text-base font-rajdhani leading-relaxed border-t border-dashed border-white/5 mt-0">
                    {item.answer}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Still Have Question Cue */}
      <div className="mt-8 text-center bg-zinc-900/30 p-4 rounded-2xl border border-dashed border-white/10">
        <p className="text-white font-orbitron font-bold mb-1">
          Masih bingung?
        </p>
        <p className="text-gray-400 font-rajdhani text-sm">
          Tekan tombol{" "}
          <span className="text-racing-yellow font-bold">Chat</span> di menu
          bawah untuk konsultasi langsung.
        </p>
        <div className="mt-2 flex justify-center text-racing-yellow animate-bounce">
          <ArrowDown size={20} />
        </div>
      </div>
    </section>
  );
}
