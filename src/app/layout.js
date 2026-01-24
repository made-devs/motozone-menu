import { Orbitron, Rajdhani, Poppins } from 'next/font/google';
import './globals.css';

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  display: 'swap',
});

const rajdhani = Rajdhani({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-rajdhani',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata = {
  title: 'TJM Motozone',
  description: 'Racing Spirit Workshop Menu',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body
        className={`${orbitron.variable} ${rajdhani.variable} ${poppins.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

