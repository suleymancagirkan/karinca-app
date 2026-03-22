"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { TbArrowLeft, TbArrowRight } from "react-icons/tb";

export default function NotFound() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-black flex flex-col items-center justify-center px-6 text-center">

      {/* ── Glitch keyframes ─────────────────────────────────── */}
      <style>{`
        @keyframes glitch-clip-1 {
          0%, 100% { clip-path: inset(80% 0 0 0); transform: translate(-4px, 0); }
          25%       { clip-path: inset(10% 0 70% 0); transform: translate(4px, 0); }
          50%       { clip-path: inset(50% 0 20% 0); transform: translate(-2px, 0); }
          75%       { clip-path: inset(30% 0 50% 0); transform: translate(3px, 0); }
        }
        @keyframes glitch-clip-2 {
          0%, 100% { clip-path: inset(5% 0 85% 0); transform: translate(3px, 0); }
          25%       { clip-path: inset(60% 0 10% 0); transform: translate(-3px, 0); }
          50%       { clip-path: inset(20% 0 60% 0); transform: translate(4px, 0); }
          75%       { clip-path: inset(70% 0 15% 0); transform: translate(-2px, 0); }
        }
        @keyframes scanlines {
          0% { background-position: 0 0; }
          100% { background-position: 0 100px; }
        }
        .glitch-wrap { position: relative; display: inline-block; }
        .glitch-base {
          font-size: clamp(8rem, 22vw, 20rem);
          font-weight: 900;
          letter-spacing: -0.05em;
          line-height: 1;
          background: linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.25) 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .glitch-layer {
          position: absolute;
          inset: 0;
          font-size: clamp(8rem, 22vw, 20rem);
          font-weight: 900;
          letter-spacing: -0.05em;
          line-height: 1;
          -webkit-text-fill-color: transparent;
        }
        .glitch-layer-1 {
          background: linear-gradient(135deg, #22d3ee 0%, #3b82f6 100%);
          -webkit-background-clip: text;
          background-clip: text;
          animation: glitch-clip-1 3.5s infinite step-start;
        }
        .glitch-layer-2 {
          background: linear-gradient(135deg, #818cf8 0%, #6366f1 100%);
          -webkit-background-clip: text;
          background-clip: text;
          animation: glitch-clip-2 4.2s infinite step-start;
          animation-delay: 0.4s;
        }
        .scanlines-overlay {
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0,0,0,0.08) 2px,
            rgba(0,0,0,0.08) 4px
          );
          pointer-events: none;
          mix-blend-mode: overlay;
        }
      `}</style>

      {/* ── Background ───────────────────────────────────────── */}
      <div className="absolute inset-0 bg-[url(/background.jpeg)] bg-cover bg-center opacity-10" />
      <div className="absolute inset-0 bg-linear-to-b from-black/90 via-black/70 to-black" />

      {/* ── Orbs ─────────────────────────────────────────────── */}
      <motion.div
        className="absolute pointer-events-none rounded-full"
        style={{ width: 600, height: 600, top: "-20%", left: "-10%", background: "radial-gradient(circle, rgba(56,189,248,0.12) 0%, transparent 70%)" }}
        animate={{ x: [0, 40, -10, 0], y: [0, -30, 20, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute pointer-events-none rounded-full"
        style={{ width: 500, height: 500, bottom: "-15%", right: "-10%", background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)" }}
        animate={{ x: [0, -35, 20, 0], y: [0, 25, -35, 0] }}
        transition={{ duration: 17, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* ── Grain ────────────────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none z-[1] opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='250' height='250' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "250px 250px",
          mixBlendMode: "overlay",
        }}
      />

      {/* ── Content ──────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center">

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[10px] font-semibold tracking-[0.3em] uppercase text-white/30 mb-6"
        >
          Hata Kodu · 404
        </motion.p>

        {/* Glitch number */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative mb-8"
        >
          <div className="glitch-wrap select-none">
            <span className="glitch-base">404</span>
            <span className="glitch-layer glitch-layer-1" aria-hidden="true">404</span>
            <span className="glitch-layer glitch-layer-2" aria-hidden="true">404</span>
            <div className="scanlines-overlay" />
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight mb-4 max-w-lg"
        >
          Bu sayfa karanlıkta
          <br />
          <span className="text-white/35">kayboldu.</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-sm text-white/35 max-w-sm leading-relaxed mb-10"
        >
          Aradığınız sayfa silinmiş, taşınmış ya da hiç var olmamış olabilir.
          Ama biz hâlâ buradayız.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.85 }}
          className="flex flex-col sm:flex-row items-center gap-3"
        >
          <Link
            href="/"
            className="group inline-flex items-center gap-x-2.5 px-7 py-3.5 rounded-full text-sm font-bold text-black bg-white hover:bg-cyan-50 transition-all duration-300 shadow-[0_0_50px_rgba(100,220,255,0.15)] hover:shadow-[0_0_70px_rgba(100,220,255,0.4)]"
          >
            <TbArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-200" />
            Ana Sayfaya Dön
          </Link>

          <Link
            href="#iletisim"
            className="group inline-flex items-center gap-x-2 px-7 py-3.5 rounded-full text-sm font-semibold text-white/50 border border-white/12 hover:text-white hover:border-white/25 hover:bg-white/5 transition-all duration-300"
          >
            Bize Ulaş
            <TbArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
          </Link>
        </motion.div>

        {/* Bottom brand */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-16 text-xs text-white/15 tracking-wider"
        >
          karinca<span className="text-cyan-400/40">.app</span>
        </motion.p>
      </div>
    </main>
  );
}
