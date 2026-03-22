/**
 * lib/data.js
 * Sitedeki tüm statik içerik ve konfigürasyon verileri.
 * İkonlar (React bileşeni oldukları için) burada import edilir
 * ve obje içinde referans olarak saklanır.
 */

import {
  TbCode,
  TbBrandFigma,
  TbCrown,
  TbChartBar,
  TbBrandGoogleAnalytics,
  TbDeviceMobile,
  TbBrandInstagram,
  TbBrandLinkedin,
  TbBrandX,
  TbBrandBehance,
} from "react-icons/tb";

// ─────────────────────────────────────────────────────────────────────────────
// SITE TANIMI
// ─────────────────────────────────────────────────────────────────────────────

export const SITE = {
  name: "karinca.app",
  tagline: "Dijital Web Ajansı",
  description:
    "Manisa merkezli dijital ajans. Markalar için web tasarım, geliştirme ve dijital büyüme çözümleri üretiyoruz.",
  email: "merhaba@karinca.app",
  phone: "+90 555 000 00 00",
  phoneHref: "tel:+905550000000",
  emailHref: "mailto:merhaba@karinca.app",
  location: "Manisa, Türkiye",
  domain: "karinca.app",
  siteUrl: "https://karinca.app",
  ogImage: "/og-image.jpg",
  twitterHandle: "@karincaapp",
  seoKeywords: [
    "web ajansı",
    "dijital ajans",
    "web tasarım",
    "ui ux tasarım",
    "marka kimliği",
    "seo optimizasyon",
    "dijital pazarlama",
    "mobil uygulama",
    "e-ticaret",
    "manisa web ajansı",
    "manisa dijital ajans",
    "karinca.app",
    "next.js ajans",
    "react ajans",
    "türkiye web ajansı",
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// NAVİGASYON
// ─────────────────────────────────────────────────────────────────────────────

export const NAV_LINKS = [
  { label: "Hakkımızda", href: "#hakkimizda" },
  { label: "Hizmetler", href: "#hizmetler" },
  { label: "Portfolyo", href: "#portfolyo" },
];

// ─────────────────────────────────────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────────────────────────────────────

export const HERO_CYCLING_WORDS = [
  "Geleceğe",
  "Zirveye",
  "Dijitale",
  "Başarıya",
  "Ötesine",
];

// ─────────────────────────────────────────────────────────────────────────────
// HİZMETLER
// ─────────────────────────────────────────────────────────────────────────────

export const SERVICES = [
  {
    icon: TbBrandFigma,
    title: "UI / UX Tasarım",
    desc: "Kullanıcı odaklı, dönüşüm getiren arayüzler. Wireframe'den piksel-perfect tasarıma.",
    color: "from-violet-500/20 to-purple-600/10",
    border: "hover:border-violet-500/30",
    glow: "group-hover:shadow-[0_0_40px_rgba(139,92,246,0.15)]",
  },
  {
    icon: TbCode,
    title: "Web Geliştirme",
    desc: "Next.js, React ve modern teknolojilerle hızlı, ölçeklenebilir web uygulamaları.",
    color: "from-cyan-500/20 to-blue-600/10",
    border: "hover:border-cyan-500/30",
    glow: "group-hover:shadow-[0_0_40px_rgba(6,182,212,0.15)]",
  },
  {
    icon: TbCrown,
    title: "Marka Kimliği",
    desc: "Logo, renk paleti, tipografi — markanızın özünü görsel bir dile dönüştürüyoruz.",
    color: "from-amber-500/20 to-orange-600/10",
    border: "hover:border-amber-500/30",
    glow: "group-hover:shadow-[0_0_40px_rgba(245,158,11,0.15)]",
  },
  {
    icon: TbChartBar,
    title: "Dijital Pazarlama",
    desc: "Hedef kitlenize ulaşan stratejik kampanyalar. Meta, Google ve içerik pazarlaması.",
    color: "from-emerald-500/20 to-green-600/10",
    border: "hover:border-emerald-500/30",
    glow: "group-hover:shadow-[0_0_40px_rgba(16,185,129,0.15)]",
  },
  {
    icon: TbBrandGoogleAnalytics,
    title: "SEO Optimizasyon",
    desc: "Organik büyüme için teknik ve içerik SEO. Rakiplerinizin önüne geçin.",
    color: "from-blue-500/20 to-indigo-600/10",
    border: "hover:border-blue-500/30",
    glow: "group-hover:shadow-[0_0_40px_rgba(59,130,246,0.15)]",
  },
  {
    icon: TbDeviceMobile,
    title: "Mobil Uygulama",
    desc: "iOS ve Android için akıcı, performanslı mobil deneyimler. React Native ile.",
    color: "from-rose-500/20 to-pink-600/10",
    border: "hover:border-rose-500/30",
    glow: "group-hover:shadow-[0_0_40px_rgba(244,63,94,0.15)]",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// PORTFOLYO / ÇALIŞMALAR
// ─────────────────────────────────────────────────────────────────────────────

export const PROJECTS = [
  {
    id: "01",
    title: "Nova Studio",
    category: "Marka Kimliği & Web",
    desc: "Bütünleşik marka kimliği ve kurumsal web sitesi. Minimalist estetik, güçlü konumlandırma.",
    gradient: "from-violet-900 via-blue-900 to-slate-900",
    accent: "bg-violet-400",
    tags: ["Tasarım", "Geliştirme", "Marka"],
    year: "2024",
    href: "#",
  },
  {
    id: "02",
    title: "Rüzgar E-Ticaret",
    category: "E-Ticaret Platformu",
    desc: "Yüksek dönüşüm oranlı, özelleştirilmiş e-ticaret deneyimi. Mobil öncelikli tasarım.",
    gradient: "from-cyan-900 via-teal-800 to-slate-900",
    accent: "bg-cyan-400",
    tags: ["UI/UX", "E-Ticaret", "SEO"],
    year: "2024",
    href: "#",
  },
  {
    id: "03",
    title: "Meridian App",
    category: "Mobil Uygulama",
    desc: "Fintech kategorisinde iOS & Android uygulama. 50K+ aktif kullanıcı ilk ayda.",
    gradient: "from-amber-900 via-orange-900 to-slate-900",
    accent: "bg-amber-400",
    tags: ["React Native", "UI/UX", "Fintech"],
    year: "2025",
    href: "#",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// SÜREÇ / NASIL ÇALIŞIYORUZ
// ─────────────────────────────────────────────────────────────────────────────

export const PROCESS_STEPS = [
  {
    num: "01",
    title: "Keşif",
    desc: "Markanızı, hedeflerinizi ve rakiplerinizi derinlemesine analiz ediyoruz. Her büyük iş, doğru sorularla başlar.",
    color: "text-cyan-400",
    bg: "bg-cyan-400/8",
    border: "border-cyan-400/20",
  },
  {
    num: "02",
    title: "Strateji",
    desc: "Veriye dayalı bir yol haritası çiziyoruz. Hangi kanallar, hangi mesajlar, hangi zamanlama?",
    color: "text-violet-400",
    bg: "bg-violet-400/8",
    border: "border-violet-400/20",
  },
  {
    num: "03",
    title: "Tasarım & Geliştirme",
    desc: "Tasarımdan koda — hızlı iterasyonlarla, geri bildirimlerinizle şekillenen bir süreç.",
    color: "text-blue-400",
    bg: "bg-blue-400/8",
    border: "border-blue-400/20",
  },
  {
    num: "04",
    title: "Lansman & Büyüme",
    desc: "Canlıya geçiş sonrası da yanınızdayız. Analiz, optimizasyon ve sürekli büyüme.",
    color: "text-emerald-400",
    bg: "bg-emerald-400/8",
    border: "border-emerald-400/20",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// FOOTER — LİNKLER
// ─────────────────────────────────────────────────────────────────────────────

export const FOOTER_LINKS = {
  Hizmetler: [
    { label: "UI / UX Tasarım", href: "#hizmetler" },
    { label: "Web Geliştirme", href: "#hizmetler" },
    { label: "Marka Kimliği", href: "#hizmetler" },
    { label: "SEO Optimizasyon", href: "#hizmetler" },
    { label: "Dijital Pazarlama", href: "#hizmetler" },
  ],
  Şirket: [
    { label: "Hakkımızda", href: "#hakkimizda" },
    { label: "Portfolyo", href: "#portfolyo" },
    { label: "Blog", href: "#blog" },
    { label: "Kariyer", href: "#" },
  ],
  İletişim: [
    { label: SITE.email, href: SITE.emailHref },
    { label: SITE.phone, href: SITE.phoneHref },
    { label: SITE.location, href: "#" },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// SOSYAL MEDYA
// ─────────────────────────────────────────────────────────────────────────────

export const SOCIALS = [
  { icon: TbBrandInstagram, href: "#", label: "Instagram" },
  { icon: TbBrandLinkedin, href: "#", label: "LinkedIn" },
  { icon: TbBrandX, href: "#", label: "X / Twitter" },
  { icon: TbBrandBehance, href: "#", label: "Behance" },
];

// ─────────────────────────────────────────────────────────────────────────────
// MARKEİ ŞERİDİ (Marquee)
// ─────────────────────────────────────────────────────────────────────────────

export const MARQUEE_ITEMS = [
  "Web Tasarım",
  "Marka Kimliği",
  "UI · UX",
  "SEO Optimizasyon",
  "Dijital Pazarlama",
  "Mobil Uygulama",
  "E-Ticaret",
  "İçerik Üretimi",
];
