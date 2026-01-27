"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Tag, Wrench, Camera, MessageCircle } from "lucide-react";

export default function BottomNav() {
  const pathname = usePathname();

  const handleWhatsApp = () => {
    const phoneNumber = "6281234567890";
    const message =
      "Halo Admin TJM Motozone, saya mau konsultasi mengenai service motor.";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  // Helper untuk mengecek active state
  // pathname === href (halaman exact) atau startsWith untuk sub-halaman
  const isActive = (path) => {
    if (path === "/" && pathname !== "/") return false;
    return pathname.startsWith(path);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-black border-t border-white/10 h-20 px-6 flex justify-between items-center z-50">
      <NavItem href="/" icon={Home} label="Home" active={pathname === "/"} />

      <NavItem
        href="/promo"
        icon={Tag}
        label="Promo"
        active={isActive("/promo")}
      />

      {/* Floating Action Button Wrapper */}
      <div className="relative -top-6 flex flex-col items-center z-10">
        {/* Label Popup Static */}
        <div className="absolute -top-9 animate-bounce duration-[2000ms]">
          <div className="relative bg-racing-yellow text-black text-[10px] font-orbitron font-bold px-2 py-1 rounded shadow-[0_0_10px_rgba(255,215,0,0.4)] whitespace-nowrap">
            CHAT ADMIN
            {/* Arrow Pointer */}
            <div className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-2 h-2 bg-racing-yellow rotate-45"></div>
          </div>
        </div>

        <button
          onClick={handleWhatsApp}
          className="w-14 h-14 bg-racing-yellow rounded-full flex items-center justify-center border-4 border-black text-black shadow-[0_0_20px_rgba(255,215,0,0.4)] hover:scale-110 transition-transform active:scale-95"
          aria-label="Chat WhatsApp Admin"
        >
          <MessageCircle size={24} fill="currentColor" />
        </button>
      </div>

      <NavItem
        href="/services"
        icon={Wrench}
        label="Servis"
        active={isActive("/services")}
      />

      <NavItem
        href="/gallery"
        icon={Camera}
        label="Gallery"
        active={isActive("/gallery")}
      />
    </nav>
  );
}

function NavItem({ href, icon: Icon, label, active }) {
  return (
    <Link
      href={href}
      className={`flex flex-col items-center gap-1 transition-colors w-12 ${
        active ? "text-racing-yellow" : "text-gray-500 hover:text-white"
      }`}
    >
      <Icon size={20} />
      <span className="text-[10px] font-medium">{label}</span>
    </Link>
  );
}
