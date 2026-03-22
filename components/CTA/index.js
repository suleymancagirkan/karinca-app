"use client";

import { motion } from "framer-motion";
import { TbArrowRight, TbMail } from "react-icons/tb";
import Link from "next/link";
import { SITE } from "@/lib/data";

export default function CTA() {
  return (
    <section id="iletisim" className="relative bg-[#080808] py-20 lg:py-28 overflow-hidden">

      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl overflow-hidden"
        >
          {/* White base */}
          <div className="absolute inset-0 bg-[#f8f8f6]" />

          {/* Noise texture */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundSize: "300px 300px",
              opacity: 0.08,
              mixBlendMode: "multiply",
            }}
          />

          {/* Warm gradient tint */}
          <div className="absolute inset-0 bg-linear-to-br from-white via-[#f8f8f6] to-slate-100 opacity-60" />

          {/* Subtle grid */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.04]"
            style={{
              backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />

          {/* Content */}
          <div className="relative z-10 px-10 py-16 sm:px-16 sm:py-20 lg:px-20 lg:py-24 flex flex-col items-center text-center">

            <div className="inline-flex items-center gap-x-2 px-4 py-1.5 rounded-full bg-black/6 border border-black/8 mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute h-full w-full rounded-full bg-emerald-500 opacity-75" />
                <span className="relative rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-black/50">
                Proje Kabul Ediyoruz
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-[4.5rem] font-black text-black tracking-tight leading-[1.04] mb-5 max-w-4xl">
              Birlikte Bir Şeyler Yapalım.
            </h2>

            <p className="text-base text-black/45 max-w-2xl leading-relaxed mb-10">
              Projenizi anlatın, size özel teklif hazırlayalım. İlk görüşme tamamen ücretsiz.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <Link
                href={SITE.emailHref}
                className="group inline-flex items-center gap-x-2.5 px-7 py-3.5 rounded-full font-bold text-white bg-black hover:bg-neutral-800 transition-all duration-300 text-sm shadow-[0_8px_30px_rgba(0,0,0,0.2)]"
              >
                <TbMail className="w-4 h-4" />
                Konuşmaya Başla
                <TbArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
              </Link>

              <Link
                href="#portfolyo"
                className="inline-flex items-center gap-x-2 px-7 py-3.5 rounded-full text-sm font-semibold text-black/50 border border-black/12 hover:text-black hover:border-black/25 hover:bg-black/4 transition-all duration-300"
              >
                Portfolyoyu İncele
              </Link>
            </div>

            <div className="mt-10 flex items-center gap-x-4">
              <div className="h-px w-12 bg-black/10" />
              <a href={SITE.emailHref} className="text-xs text-black/30 hover:text-black/60 transition-colors duration-300 tracking-wider">
                {SITE.email}
              </a>
              <div className="h-px w-12 bg-black/10" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
