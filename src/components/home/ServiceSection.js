import { Trophy, Settings } from 'lucide-react';

const services = [
  {
    title: 'Tune Up Harian',
    desc: 'Pembersihan TB, Cek Kelistrikan, Setting Klep',
    price: 'Rp 85rb',
  },
  {
    title: 'Servis Injeksi Total',
    desc: 'Infus Injeksi, Reset ECU, Cek Filter',
    price: 'Rp 150rb',
  },
  {
    title: 'Bore Up 150cc',
    desc: 'Piston Kit, Noken As, Porting Polish',
    price: 'Start 2jt',
  },
  {
    title: 'Detailing Body',
    desc: 'Cuci Premium, Polish, Waxing',
    price: 'Rp 75rb',
  },
];

export default function ServiceSection() {
  return (
    <section className="px-5 mb-8">
      <div className="flex justify-between items-center mb-4 pl-3">
        <h3 className="font-rajdhani font-bold text-xl uppercase flex items-center gap-2">
          <Trophy className="text-racing-yellow" size={20} /> Paket Terlaris
        </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {services.map((svc, i) => (
          <div
            key={i}
            className="bg-racing-dark p-4 rounded-lg border border-white/5 flex items-center gap-4 hover:border-racing-yellow/30 transition-colors cursor-pointer group"
          >
            <div className="w-12 h-12 bg-racing-yellow/10 rounded-lg flex items-center justify-center text-racing-yellow group-hover:bg-racing-yellow group-hover:text-black transition-colors shrink-0">
              <Settings size={24} />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-sm md:text-base">{svc.title}</h4>
              <p className="text-xs text-gray-500 truncate">{svc.desc}</p>
            </div>
            <div className="bg-neutral-900 px-3 py-1 rounded border border-white/10 text-racing-yellow text-sm font-bold font-rajdhani whitespace-nowrap">
              {svc.price}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
