"use client";

import { motion } from "framer-motion";
import { TbArrowUpRight } from "react-icons/tb";
import { SERVICES } from "@/lib/data";

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function Services() {
  return (
    <section id="hizmetler" className="relative bg-[#080808] py-28 lg:py-36 overflow-hidden">

      <div className="absolute top-0 left-0 right-0 h-32 bg-linear-to-b from-black to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 lg:mb-20"
        >
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-cyan-400/70 mb-4">
            — Hizmetlerimiz
          </p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight max-w-xl">
              Her İhtiyacınız
              <br />
              <span className="text-white/35">İçin Buradayız.</span>
            </h2>
            <p className="text-base text-white/40 max-w-sm leading-relaxed lg:text-right">
              360° dijital çözümlerle markanızı uçtan uca inşa edip büyütüyoruz.
            </p>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {SERVICES.map((svc) => (
            <motion.div
              key={svc.title}
              variants={cardVariant}
              className={`group relative rounded-2xl border border-white/8 bg-white/3 p-7 cursor-default transition-all duration-500 ${svc.border} ${svc.glow}`}
            >
              <div className={`absolute inset-0 rounded-2xl bg-linear-to-br ${svc.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:border-white/20 transition-colors duration-300">
                  <svc.icon className="w-5 h-5 text-white/60 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2.5 tracking-tight">{svc.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed group-hover:text-white/55 transition-colors duration-300">{svc.desc}</p>
                <div className="mt-6 flex items-center gap-x-2 text-xs font-semibold text-white/25 group-hover:text-white/60 transition-colors duration-300">
                  Detaylar
                  <TbArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
