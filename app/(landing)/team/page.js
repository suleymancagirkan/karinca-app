'use client';

/**
 * @page Team
 * @description A visually striking Team page showcasing the agency's members.
 * Uses a grayscale-to-color interactive grid, bold typography, and a "Collective" theme.
 * Aligned with the 'Unbounded' design system.
 */

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { TbBrandTwitter, TbBrandLinkedin, TbBrandDribbble, TbArrowUpRight } from 'react-icons/tb';

const teamMembers = [
  {
    name: "Süleyman Çagirkan",
    role: "Founder & Lead Developer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2574&auto=format&fit=crop",
    bio: "Obsessed with clean code and scalable architecture. Building the future of digital infrastructure."
  },
  {
    name: "Elif Yılmaz",
    role: "Creative Director",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2574&auto=format&fit=crop",
    bio: "Believes design is intelligence made visible. crafting visual narratives that resonate."
  },
  {
    name: "Mehmet Demir",
    role: "Product Strategist",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2670&auto=format&fit=crop",
    bio: "Turning abstract ideas into concrete product roadmaps. Focus on user value and growth."
  },
  {
    name: "Ayşe Kaya",
    role: "UI/UX Designer",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2661&auto=format&fit=crop",
    bio: "Pixel perfect perfectionist. Creating interfaces that feel natural and intuitive."
  },
  {
    name: "Can Yildiz",
    role: "Frontend Engineer",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2574&auto=format&fit=crop",
    bio: "Master of interactions and animations. Bringing static designs to life."
  },
  {
    name: "Zeynep Çelik",
    role: "Content Manager",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2576&auto=format&fit=crop",
    bio: "Storyteller at heart. Crafting compelling copy that drives engagement and conversion."
  }
];

export default function Team() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#050505] text-neutral-900 dark:text-white pt-32 pb-20">

      {/* Header */}
      <div className="max-w-[1400px] mx-auto px-6 mb-24 md:mb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center text-center"
        >
          <span className="font-unbounded font-bold text-blue-600 tracking-widest uppercase text-sm mb-6">
            The Collective
          </span>
          <h1 className="font-unbounded font-black text-6xl md:text-9xl tracking-tighter leading-none mb-8">
            MEET THE <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-800 to-neutral-400 dark:from-white dark:to-neutral-600">MINDS</span>
          </h1>
          <p className="font-unbounded text-neutral-500 dark:text-neutral-400 max-w-2xl text-sm md:text-lg leading-relaxed">
            We are a group of creators, thinkers, and explorers united by a passion for digital excellence.
          </p>
        </motion.div>
      </div>

      {/* Team Grid */}
      <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
        {teamMembers.map((member, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group"
          >
            <div className="relative aspect-[3/4] w-full mb-6 overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-900">
              {/* Grayscale to Color Effect */}
              <img
                src={member.image}
                alt={member.name}
                fill
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out group-hover:scale-105"
              />

              {/* Overlay Socials */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                <button className="p-3 bg-white rounded-full text-black hover:scale-110 transition-transform">
                  <TbBrandTwitter className="text-xl" />
                </button>
                <button className="p-3 bg-white rounded-full text-black hover:scale-110 transition-transform">
                  <TbBrandLinkedin className="text-xl" />
                </button>
                <button className="p-3 bg-white rounded-full text-black hover:scale-110 transition-transform">
                  <TbBrandDribbble className="text-xl" />
                </button>
              </div>
            </div>

            <div className="flex flex-col items-start px-2">
              <h3 className="font-unbounded font-bold text-2xl mb-1 group-hover:text-blue-600 transition-colors">
                {member.name}
              </h3>
              <span className="font-unbounded text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-3 block">
                {member.role}
              </span>
              <p className="font-unbounded text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-2 group-hover:translate-y-0 text-balance">
                {member.bio}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Join Us Section */}
      <div className="max-w-[1400px] mx-auto px-6 mt-32">
        <div className="bg-neutral-100 dark:bg-neutral-900 rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden">
          <div className="relative z-10 flex flex-col items-center">
            <h2 className="font-unbounded font-black text-4xl md:text-6xl mb-6">
              WANT TO JOIN US?
            </h2>
            <p className="font-unbounded text-neutral-500 dark:text-neutral-400 max-w-xl mb-10">
              We are always looking for talented individuals to join our team.
              If you think you have what it takes, let's talk.
            </p>
            <button className="px-8 py-4 bg-black dark:bg-white text-white dark:text-black rounded-full font-unbounded font-bold text-sm hover:scale-105 transition-transform flex items-center gap-2">
              See Open Positions <TbArrowUpRight className="text-lg" />
            </button>
          </div>

          <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
            <div className="w-full h-full bg-[radial-gradient(#000000_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />
          </div>
        </div>
      </div>

    </main>
  );
};