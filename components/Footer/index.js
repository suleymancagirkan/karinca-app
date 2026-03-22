"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.svg";
import { SITE, FOOTER_LINKS, SOCIALS } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="relative bg-black border-t border-white/8 overflow-hidden">

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[200px] bg-blue-900/8 blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-12 py-16 lg:py-20">

          {/* Brand column */}
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-x-2.5 mb-5">
              <div className="relative w-8 h-8">
                <Image src={logo} alt={SITE.name} width={32} height={32} className="invert" />
              </div>
              <span className="text-lg font-black tracking-tight text-white">
                karinca<span className="text-cyan-400">.app</span>
              </span>
            </Link>
            <p className="text-sm text-white/35 leading-relaxed max-w-xs mb-7">
              {SITE.description}
            </p>
            <div className="flex items-center gap-x-3">
              {SOCIALS.map((s) => (
                <Link
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-xl border border-white/10 flex items-center justify-center text-white/35 hover:text-white hover:border-white/25 hover:bg-white/5 transition-all duration-300"
                >
                  <s.icon className="w-4 h-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <p className="text-xs font-bold tracking-[0.15em] uppercase text-white/30 mb-5">
                {heading}
              </p>
              <ul className="flex flex-col gap-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-white/45 hover:text-white transition-colors duration-200">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/25">
            © {new Date().getFullYear()} {SITE.name} — Tüm hakları saklıdır.
          </p>
          <div className="flex items-center gap-x-6">
            <Link href="#" className="text-xs text-white/25 hover:text-white/50 transition-colors">
              Gizlilik Politikası
            </Link>
            <Link href="#" className="text-xs text-white/25 hover:text-white/50 transition-colors">
              Kullanım Koşulları
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
