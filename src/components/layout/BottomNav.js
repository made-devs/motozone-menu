import { Home, Tag, Wrench, User, MessageCircle } from 'lucide-react';

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-black border-t border-white/10 h-20 px-6 flex justify-between items-center z-50">
      <NavItem icon={Home} label="Home" active />
      <NavItem icon={Tag} label="Promo" />

      {/* Floating Action Button */}
      <div className="relative -top-6">
        <button className="w-14 h-14 bg-racing-yellow rounded-full flex items-center justify-center border-4 border-black text-black shadow-[0_0_20px_rgba(255,215,0,0.4)] hover:scale-110 transition-transform active:scale-95">
          <MessageCircle size={24} fill="currentColor" />
        </button>
      </div>

      <NavItem icon={Wrench} label="Servis" />
      <NavItem icon={User} label="Profil" />
    </nav>
  );
}

function NavItem({ icon: Icon, label, active }) {
  return (
    <a
      href="#"
      className={`flex flex-col items-center gap-1 transition-colors ${active ? 'text-racing-yellow' : 'text-gray-500 hover:text-white'}`}
    >
      <Icon size={20} />
      <span className="text-[10px] font-medium">{label}</span>
    </a>
  );
}
