import Hero from '@/components/Hero';
import React from 'react';
import Features from '@/components/Features';
import Brands from '@/components/Brands';
import CTA from '@/components/CTA';
import CTA2 from '@/components/CTA2';
import ReleaseNotes from '@/components/Blog';

export default function Home() {
  return (
    <div>
      <Hero />
      <Brands isDark={false} />
      <Features />
      <CTA />
      <ReleaseNotes />
      <CTA2 />
    </div>
  );
};