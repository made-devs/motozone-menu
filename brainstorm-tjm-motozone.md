# TJM Motozone PWA - Brainstorm & Planning

## 🎯 Overview Proyek

**Nama Aplikasi:** TJM Motozone Menu  
**Platform Target:** Tablet (Primary) & Mobile (Secondary)  
**Konsep Desain:** Racing, Modern, Youth-oriented

**Color Palette:**

- Primary: Kuning `#FFD700` atau Racing Yellow `#FFCC00`
- Secondary: Hitam `#0D0D0D` atau Jet Black `#1A1A1A`
- Accent: Putih `#FFFFFF` untuk kontras
- Gradient: Yellow to Orange untuk elemen racing

---

## 🔤 Rekomendasi Font

| Penggunaan       | Font               | Alasan                     |
| ---------------- | ------------------ | -------------------------- |
| **Heading/Logo** | Orbitron, Rajdhani | Futuristic, racing, bold   |
| **Sub-heading**  | Bebas Neue         | Clean, impactful, sporty   |
| **Body Text**    | Poppins, Inter     | Modern, readable, friendly |
| **Accent/Label** | Racing Sans One    | Authentic racing feel      |

---

## 📱 Struktur Halaman & Fitur

### 1. 🏠 HOME (Halaman Depan)

- Hero Section: Auto-sliding banner promo aktif (animasi racing flag)
- Highlights Promo: Grid/Carousel promo unggulan, badge "HOT", "NEW", "LIMITED", countdown timer
- Paket Servis Populer: Card-based, quick view harga & benefit
- Gallery Pengerjaan: Masonry/Grid preview, before-after slider
- Quick Navigation: Bottom nav, speed dial menu racing theme

### 2. 🏷️ PROMO

- Filter by kategori & status
- Search promo
- Grid/List view toggle
- Promo Card: Gambar, judul, badge diskon, periode, harga coret & promo, syarat singkat
- Detail Promo: Full image, deskripsi, T&C, cara klaim, share button, related promo

### 3. 🔧 SERVICE / PAKET SERVIS

- Kategori: Servis Rutin, Besar, Paket Hemat, Body, Elektrikal
- Category tabs, sort, comparison tool
- Service Card: Icon, nama, list singkat, estimasi waktu, harga, rating
- Detail Service: Hero image/video, deskripsi, checklist, spare part, estimasi durasi, harga detail, FAQ, CTA booking

### 4. 📸 GALLERY

- Filter by kategori: Before & After, Proses, Modifikasi, Customer's Ride
- Lightbox view, lazy loading
- Gallery Item: Thumbnail, caption, tanggal, kategori
- Detail: Full screen, zoom, swipe, deskripsi, share

### 5. 🏢 COMPANY PROFILE / ABOUT

- Hero: Tagline + foto tim
- Tentang Kami: Sejarah, visi misi
- Keunggulan: Mekanik, spare part, garansi, alat
- Tim Kami: Foto & nama mekanik
- Lokasi & Jam: Maps, alamat, jam buka
- Kontak: WhatsApp, Instagram, TikTok
- Partner/Brand: Logo brand

### 6. ❓ FAQ

- Kategori: Servis, Promo, Garansi, Spare Part, Umum
- Accordion style, search, CTA chat

---

## 🎨 Elemen Desain Racing

| Elemen         | Implementasi                      |
| -------------- | --------------------------------- |
| Checkered Flag | Background, divider, borders      |
| Speed Lines    | Decorative, loading animation     |
| Tire Track     | Page transition, scroll indicator |
| Speedometer    | Rating/progress indicator         |
| Racing Stripes | Card accents, headers             |
| Exhaust Smoke  | Hover effects, transitions        |
| Number Plates  | Badge styling, labels             |

---

## ⚡ Fitur Tambahan PWA

- Offline Support (cache halaman & gambar)
- Install to Home Screen
- Fast Loading (optimized images, lazy load)
- Touch Optimized (gesture friendly)
- Responsive (tablet & mobile)
- Dark Mode Support
- Share API (WhatsApp, Copy Link)
- Smooth Animations (racing theme)

---

## 📐 Layout Rekomendasi Tablet

```
┌─────────────────────────────────────────────────────┐
│  LOGO          [Search]     [Menu Icon]             │
├─────────────────────────────────────────────────────┤
│                                                     │
│   ┌─────────────────────────────────────────────┐   │
│   │           HERO BANNER / PROMO               │   │
│   │              (Auto Slide)                   │   │
│   └─────────────────────────────────────────────┘   │
│                                                     │
│   ═══════════ PROMO HIGHLIGHTS ═══════════          │
│   ┌─────────┐ ┌─────────┐ ┌─────────┐               │
│   │ Promo 1 │ │ Promo 2 │ │ Promo 3 │  [→]          │
│   └─────────┘ └─────────┘ └─────────┘               │
│                                                     │
│   ═══════════ PAKET SERVIS ═══════════              │
│   ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐   │
│   │ Servis  │ │ Servis  │ │ Servis  │ │ Servis  │   │
│   │   1     │ │   2     │ │   3     │ │   4     │   │
│   └─────────┘ └─────────┘ └─────────┘ └─────────┘   │
│                                                     │
├─────────────────────────────────────────────────────┤
│  [🏠]    [🏷️]    [🔧]    [📸]    [ℹ️]               │
│  Home   Promo  Service Gallery  Info                │
└─────────────────────────────────────────────────────┘
```

---

## 📁 Struktur Folder Rekomendasi

```
motozone-menu/
├── public/
│   ├── icons/           # PWA icons
│   ├── images/          # Static images
│   └── manifest.json    # PWA manifest
├── src/
│   ├── components/      # Reusable components
│   ├── pages/           # Page components
│   │   ├── Home/
│   │   ├── Promo/
│   │   ├── Service/
│   │   ├── Gallery/
│   │   ├── About/
│   │   └── FAQ/
│   ├── styles/          # CSS/SCSS files
│   ├── utils/           # Helper functions
│   └── data/            # Static data (promo, services, etc)
├── service-worker.js    # PWA service worker
└── index.html
```

---
