"use client";

import { motion } from "framer-motion";
import { TbArrowUpRight } from "react-icons/tb";
import { PROJECTS } from "@/lib/data";

export default function Work() {
  return (
    <section id="portfolyo" className="relative bg-[#050505] py-28 lg:py-36 overflow-hidden">

      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-blue-900/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16"
        >
          <div>
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-cyan-400/70 mb-4">
              — Seçili Çalışmalar
            </p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
              Yaptıklarımıza
              <br />
              <span className="text-white/35">Bir Bakın.</span>
            </h2>
          </div>
          <motion.a
            href="#"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="group inline-flex items-center gap-x-2 text-sm font-semibold text-white/35 hover:text-white transition-colors duration-300 lg:mb-2"
          >
            Tüm projeler
            <TbArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
          </motion.a>
        </motion.div>

        <div className="flex flex-col gap-5">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group relative rounded-2xl overflow-hidden border border-white/8 hover:border-white/15 transition-colors duration-500 cursor-pointer"
            >
              <div className={`relative h-52 sm:h-64 bg-linear-to-br ${project.gradient} overflow-hidden`}>
                <div className="absolute inset-0 opacity-30">
                  <div className="absolute top-8 left-8 w-32 h-32 rounded-full border border-white/20" />
                  <div className="absolute top-16 left-16 w-20 h-20 rounded-full border border-white/15" />
                  <div className="absolute bottom-6 right-10 w-40 h-1 bg-white/20 rounded-full" />
                  <div className="absolute bottom-11 right-10 w-28 h-1 bg-white/10 rounded-full" />
                  <div className="absolute top-6 right-8 w-16 h-16 rounded-xl border border-white/15" />
                </div>
                <span className="absolute top-6 left-8 text-6xl font-black text-white/8 select-none">{project.id}</span>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                <div className="absolute right-6 bottom-6 w-12 h-12 rounded-full bg-white/0 border border-white/0 group-hover:bg-white group-hover:border-white flex items-center justify-center transition-all duration-400">
                  <TbArrowUpRight className="w-5 h-5 text-white/0 group-hover:text-black transition-colors duration-300" />
                </div>
              </div>

              <div className="bg-white/2.5 px-8 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-x-3 mb-1">
                    <span className={`w-1.5 h-1.5 rounded-full ${project.accent}`} />
                    <span className="text-xs font-semibold tracking-widest uppercase text-white/35">{project.category}</span>
                    <span className="text-xs text-white/20">{project.year}</span>
                  </div>
                  <h3 className="text-xl font-black text-white tracking-tight">{project.title}</h3>
                  <p className="text-sm text-white/40 mt-1 max-w-lg">{project.desc}</p>
                </div>
                <div className="flex flex-wrap gap-2 sm:flex-col sm:items-end">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium text-white/40 border border-white/8">{tag}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
