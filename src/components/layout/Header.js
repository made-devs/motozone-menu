import { Search } from 'lucide-react';

export default function Header() {
  return (
    <header className="app-header sticky top-0 z-50 bg-racing-black/90 backdrop-blur-md border-b-2 border-racing-yellow px-5 py-4 flex justify-center items-center shadow-[0_4px_20px_rgba(255,215,0,0.1)]">
      <img
        src="/logo.webp"
        alt="TJM Motozone Logo"
        className="h-12 md:h-16 object-contain"
        style={{ maxWidth: '180px' }}
      />
    </header>
  );
}
