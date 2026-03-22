"use client";

import { motion } from "framer-motion";
import { PROCESS_STEPS } from "@/lib/data";

export default function Process() {
  return (
    <section id="surec" className="relative bg-[#080808] py-28 lg:py-36 overflow-hidden">

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-900/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-cyan-400/70 mb-4">
            — Nasıl Çalışıyoruz
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            Sonuç Odaklı
            <br />
            <span className="text-white/35">Bir Süreç.</span>
          </h2>
        </motion.div>

        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-0">

          <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />

          {PROCESS_STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex flex-col lg:items-center lg:text-center px-0 lg:px-6"
            >
              <div className={`relative w-20 h-20 rounded-2xl ${step.bg} border ${step.border} flex items-center justify-center mb-6 shrink-0`}>
                <span className={`text-2xl font-black ${step.color} leading-none`}>
                  {step.num}
                </span>
              </div>
              <h3 className="text-lg font-black text-white mb-3 tracking-tight">{step.title}</h3>
              <p className="text-sm text-white/38 leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
