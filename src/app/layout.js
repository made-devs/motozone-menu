import { Orbitron, Rajdhani, Poppins } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
});

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-rajdhani",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata = {
  title: "TJM Motozone",
  description: "Racing Spirit Workshop Menu",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      {/* Tambahkan bg-zinc-950 agar area di luar layout terlihat gelap (aesthetic) */}
      <body
        className={`${orbitron.variable} ${rajdhani.variable} ${poppins.variable} antialiased  flex justify-center min-h-screen`}
      >
        {/* --- CONTAINER PEMBATAS UTAMA --- */}
        {/* Ubah max-w-md menjadi max-w-xl atau max-w-2xl jika ingin lebih lebar */}
        <div className="w-full max-w-[768px]  h-full min-h-screen relative shadow-2xl overflow-x-hidden border-x border-white/5">
          {children}
        </div>
      </body>
    </html>
  );
}
