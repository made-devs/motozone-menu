import { Flame, Clock } from 'lucide-react';

export default function PromoSection() {
  return (
    <section className="px-5 mb-8">
      <div className="flex justify-between items-center mb-4 border-l-4 border-racing-yellow pl-3">
        <h3 className="font-rajdhani font-bold text-xl uppercase flex items-center gap-2">
          <Flame className="text-racing-yellow fill-racing-yellow" size={20} />{' '}
          Promo Spesial
        </h3>
        <span className="text-racing-yellow text-xs font-bold cursor-pointer hover:underline">
          Lihat Semua
        </span>
      </div>

      <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-4 snap-x">
        <PromoCard
          title="Ganti Oli Motul Ester"
          price="Rp 120rb"
          oldPrice="Rp 150rb"
          badge="HEMAT 20%"
          color="bg-red-600"
          img="https://images.unsplash.com/photo-1632733719005-581f0676d0d3?auto=format&fit=crop&w=500&q=60"
        />
        <PromoCard
          title="Service CVT + Roller Pro"
          price="Rp 175rb"
          oldPrice="Rp 200rb"
          badge="BUNDLE"
          color="bg-racing-yellow text-black"
          img="https://images.unsplash.com/photo-1598550487031-0898b48521f3?auto=format&fit=crop&w=500&q=60"
        />
      </div>
    </section>
  );
}

function PromoCard({ title, price, oldPrice, badge, color, img }) {
  return (
    <div className="min-w-[280px] md:min-w-[320px] bg-racing-dark rounded-xl overflow-hidden border border-white/5 snap-center">
      <div
        className="h-36 bg-neutral-800 relative bg-cover bg-center"
        style={{ backgroundImage: `url('${img}')` }}
      >
        <div
          className={`absolute top-3 left-0 ${color} text-xs font-bold px-3 py-1 racing-clip`}
        >
          {badge}
        </div>
      </div>
      <div className="p-4">
        <h4 className="font-rajdhani font-bold text-lg mb-1">{title}</h4>
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-gray-500 text-sm line-through decoration-red-500">
            {oldPrice}
          </span>
          <span className="text-racing-yellow text-xl font-bold">{price}</span>
        </div>
        <div className="flex items-center gap-1 text-gray-500 text-xs">
          <Clock size={12} /> Sisa Pk. 17:00
        </div>
      </div>
    </div>
  );
}
