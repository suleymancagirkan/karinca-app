"use client";

import { motion } from "framer-motion";
import { TbStar } from "react-icons/tb";

const testimonials = [
  {
    quote: "Karınca ekibi sadece bir ajans gibi değil, gerçek bir iş ortağı gibi davrandı. Projemize olan yaklaşımları ve hızları rakipsizdi.",
    name: "Ayşe Kaya",
    role: "CEO",
    company: "Nova Studio",
    initials: "AK",
    avatarColor: "from-violet-500 to-purple-700",
  },
  {
    quote: "E-ticaret sitemizin dönüşüm oranı ilk ayda %340 arttı. Tasarım ve teknik kalite beklentilerimizin çok üzerindeydi.",
    name: "Mehmet Yılmaz",
    role: "Founder",
    company: "Rüzgar Commerce",
    initials: "MY",
    avatarColor: "from-cyan-500 to-teal-700",
  },
  {
    quote: "Uygulamamız App Store'da 'Haftanın Uygulaması' seçildi. Karınca'nın UI/UX anlayışı gerçekten dünya standartlarında.",
    name: "Zeynep Arslan",
    role: "CPO",
    company: "Meridian App",
    initials: "ZA",
    avatarColor: "from-amber-500 to-orange-700",
  },
];

export default function Testimonials() {
  return (
    <section id="referanslar" className="relative bg-[#050505] py-28 lg:py-36 overflow-hidden">

      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] rounded-full bg-violet-900/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-cyan-900/8 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-cyan-400/70 mb-4">
            — Müşterilerimiz
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            Onlar Anlatsın
            <br />
            <span className="text-white/35">Bizi.</span>
          </h2>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 mb-16 py-8 border-y border-white/8"
        >
          {[
            { value: "80+", label: "Tamamlanan Proje" },
            { value: "5+", label: "Yıl Deneyim" },
            { value: "%98", label: "Müşteri Memnuniyeti" },
            { value: "12+", label: "Aktif Müşteri" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-3xl sm:text-4xl font-black text-white leading-none">{stat.value}</p>
              <p className="text-xs text-white/35 font-medium mt-1.5 tracking-wide">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Testimonial cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="group relative rounded-2xl border border-white/8 bg-white/[0.025] p-7 flex flex-col hover:border-white/15 hover:bg-white/[0.04] transition-all duration-500"
            >
              {/* Stars */}
              <div className="flex gap-x-1 mb-5">
                {[...Array(5)].map((_, si) => (
                  <TbStar key={si} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-sm text-white/55 leading-relaxed flex-1 mb-7">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-x-3">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.avatarColor} flex items-center justify-center flex-shrink-0`}>
                  <span className="text-xs font-black text-white">{t.initials}</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-white leading-none">{t.name}</p>
                  <p className="text-xs text-white/35 mt-0.5">{t.role} · {t.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
