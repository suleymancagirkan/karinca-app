import React from 'react';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Statistics from '@/components/Statistics';
import Process from '@/components/Process';
import FAQ from '@/components/FAQ';
import CTA from '@/components/CTA';
import { useSession } from 'next-auth/react';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-white dark:bg-[#050505] selection:bg-blue-500/30">
      <Hero />
      <Features />
      <Statistics />
      <Process />
      <FAQ />
      <CTA />
    </main>
  );
};