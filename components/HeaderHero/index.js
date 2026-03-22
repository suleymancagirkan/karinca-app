"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { TbArrowRight, TbMenu2, TbX } from "react-icons/tb";
import logo from "@/public/logo.svg";
import { NAV_LINKS, HERO_CYCLING_WORDS, SITE } from "@/lib/data";

export default function HeaderHero() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);

  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroY = useTransform(scrollY, [0, 400], [0, 60]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setWordIndex((i) => (i + 1) % HERO_CYCLING_WORDS.length);
    }, 2400);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black">

      {/* ── Background ───────────────────────────────────────────── */}
      <div className="absolute inset-0 bg-[url(/background.jpeg)] bg-cover bg-center scale-110 opacity-25" />
      <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/40 to-black/90" />

      {/* ── Living orbs ──────────────────────────────────────────── */}
      <motion.div
        className="absolute pointer-events-none rounded-full"
        style={{ width: 700, height: 700, top: "-15%", left: "-10%", background: "radial-gradient(circle, rgba(56,189,248,0.18) 0%, transparent 70%)" }}
        animate={{ x: [0, 60, -20, 0], y: [0, -40, 30, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute pointer-events-none rounded-full"
        style={{ width: 600, height: 600, bottom: "-10%", right: "-10%", background: "radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)" }}
        animate={{ x: [0, -50, 30, 0], y: [0, 35, -45, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      />
      <motion.div
        className="absolute pointer-events-none rounded-full"
        style={{ width: 450, height: 450, top: "30%", right: "15%", background: "radial-gradient(circle, rgba(34,211,238,0.12) 0%, transparent 70%)" }}
        animate={{ scale: [1, 1.3, 0.85, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      />

      {/* ── Grain texture ────────────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none z-3 opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='250' height='250' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "250px 250px",
          mixBlendMode: "overlay",
        }}
      />

      {/* ── Navbar ───────────────────────────────────────────────── */}
      <motion.nav
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-black/50 backdrop-blur-2xl border-b border-white/8" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-[72px] flex items-center justify-between">

          <Link href="/" className="flex items-center gap-x-2.5 shrink-0">
            <div className="relative w-9 h-9">
              <motion.div
                className="absolute inset-0 rounded-full blur-lg"
                style={{ background: "rgba(34,211,238,0.25)" }}
                animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.4, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              <Image src={logo} alt={SITE.name} width={36} height={36} className="relative invert" />
            </div>
            <span className="text-xl font-black tracking-tight text-white">
              karinca<span className="text-cyan-400">.app</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-x-8">
            {NAV_LINKS.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i + 0.4, duration: 0.4 }}
              >
                <Link href={link.href} className="text-sm font-medium text-white/45 hover:text-white transition-colors duration-300 tracking-wide">
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.4 }}
            className="hidden md:block"
          >
            <Link
              href="#iletisim"
              className="group inline-flex items-center gap-x-2 px-5 py-2.5 rounded-full text-sm font-bold text-white border border-white/18 bg-white/5 hover:bg-white hover:text-black hover:border-white transition-all duration-300"
            >
              Bize Ulaş
              <TbArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
            </Link>
          </motion.div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white p-2 rounded-xl hover:bg-white/10 transition-colors"
          >
            <AnimatePresence mode="wait">
              {menuOpen ? (
                <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <TbX size={22} />
                </motion.span>
              ) : (
                <motion.span key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <TbMenu2 size={22} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden overflow-hidden bg-black/80 backdrop-blur-2xl border-t border-white/10"
            >
              <div className="px-6 py-5 flex flex-col gap-y-4">
                {NAV_LINKS.map((link) => (
                  <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="text-base font-medium text-white/65 hover:text-white transition-colors py-1">
                    {link.label}
                  </Link>
                ))}
                <Link href="#iletisim" onClick={() => setMenuOpen(false)} className="mt-1 inline-flex items-center justify-center gap-x-2 px-5 py-3 rounded-full text-sm font-bold text-white bg-white/10 border border-white/20 hover:bg-white hover:text-black transition-all duration-300">
                  Bize Ulaş <TbArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <motion.div
        style={{ opacity: heroOpacity, y: heroY }}
        className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 text-center select-none"
      >
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.3em" }}
          animate={{ opacity: 1, letterSpacing: "0.25em" }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="text-[10px] font-semibold tracking-[0.25em] uppercase text-white/35 mb-14"
        >
          {SITE.tagline} · {SITE.location}
        </motion.p>

        <div className="overflow-hidden">
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.9, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="text-[2.6rem] sm:text-[3.5rem] lg:text-[5rem] font-black text-white/50 tracking-tight leading-none"
          >
            Markanızı
          </motion.div>
        </div>

        <div className="overflow-hidden" style={{ lineHeight: 1.0 }}>
          <AnimatePresence mode="wait">
            <motion.h1
              key={HERO_CYCLING_WORDS[wordIndex]}
              initial={{ y: "100%", filter: "blur(8px)" }}
              animate={{ y: "0%", filter: "blur(0px)" }}
              exit={{ y: "-100%", filter: "blur(8px)" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-[5rem] sm:text-[7.5rem] lg:text-[11rem] xl:text-[13rem] font-black tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-br from-cyan-200 via-white to-blue-400 py-2"
            >
              {HERO_CYCLING_WORDS[wordIndex]}
            </motion.h1>
          </AnimatePresence>
        </div>

        <div className="overflow-hidden">
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.9, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-[2.6rem] sm:text-[3.5rem] lg:text-[5rem] font-black text-white/50 tracking-tight leading-none"
          >
            Taşıyoruz.
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mt-16"
        >
          <Link
            href="#portfolyo"
            className="group inline-flex items-center gap-x-3 text-sm font-semibold text-white/50 hover:text-white transition-colors duration-400"
          >
            <span className="w-8 h-px bg-white/30 group-hover:w-14 group-hover:bg-white transition-all duration-400" />
            Portfolyoyu Keşfet
            <span className="w-8 h-px bg-white/30 group-hover:w-14 group-hover:bg-white transition-all duration-400" />
          </Link>
        </motion.div>
      </motion.div>

      {/* ── Scroll line ──────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
      >
        <div className="w-px h-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-b from-white/0 via-white/15 to-white/0" />
          <motion.div
            className="absolute top-0 left-0 right-0 h-7 bg-linear-to-b from-cyan-400 to-transparent"
            animate={{ y: [-28, 64] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </motion.div>
    </section>
  );
}