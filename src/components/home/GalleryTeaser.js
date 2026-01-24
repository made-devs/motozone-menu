import { Camera } from 'lucide-react';

export default function GalleryTeaser() {
  return (
    <section className="px-5 mb-4">
      <div className="flex justify-between items-center mb-4 pl-3">
        <h3 className="font-rajdhani font-bold text-xl uppercase flex items-center gap-2">
          <Camera className="text-racing-yellow" size={20} /> Gallery
        </h3>
      </div>
      <div className="grid grid-cols-3 grid-rows-2 gap-2 h-48">
        <div className="col-span-2 row-span-2 rounded-lg bg-[url('https://images.unsplash.com/photo-1533473359331-0135ef1bcfb0?auto=format&fit=crop&w=600&q=60')] bg-cover bg-center border border-white/5"></div>
        <div className="col-span-1 row-span-1 rounded-lg bg-[url('https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=300&q=60')] bg-cover bg-center border border-white/5"></div>
        <div className="col-span-1 row-span-1 rounded-lg bg-[url('https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=300&q=60')] bg-cover bg-center border border-white/5"></div>
      </div>
    </section>
  );
}
