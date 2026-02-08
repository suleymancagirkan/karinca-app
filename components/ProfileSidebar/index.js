'use client';

import React from "react";
import { motion } from "framer-motion";
import { TbUserCircle, TbSettings, TbLogout, TbStar, TbShieldLock, TbBell, TbRocket, TbCreditCard, TbBrandProducthunt, TbDashboard, TbDashboardFilled, TbUserFilled, TbSettingsFilled, TbCloudComputing, TbCloudFilled, TbCreditCardFilled, TbLifebuoyFilled, TbStarFilled } from "react-icons/tb";
import { useRouter, usePathname } from 'next/navigation';
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const menuItems = [
  {
    label: "Profile",
    icon: <TbUserFilled className="text-xl" />,
    href: "/profile",
  },
  {
    label: "Settings",
    icon: <TbSettingsFilled className="text-xl" />,
    href: "/profile/settings",
  },
  {
    label: "My Services",
    icon: <TbCloudFilled className="text-xl" />,
    href: "/profile/services",
  },
  {
    label: "Billing",
    icon: <TbCreditCardFilled className="text-xl" />,
    href: "/profile/billing",
  },
  {
    label: "Support",
    icon: <TbLifebuoyFilled className="text-xl" />,
    href: "/profile/support",
  },
  {
    label: "Premium",
    icon: <TbStarFilled className="text-xl" />,
    href: "/premium",
  },
];

export default function ProfileSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <motion.aside
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col w-full lg:w-72 h-fit bg-white dark:bg-black rounded-3xl lg:rounded-[2rem] p-6 border border-neutral-200 dark:border-neutral-800 relative z-10 shrink-0"
    >
      {/* Profile Header */}
      <div className="flex flex-col items-center mb-10 pt-4">
        <div className="relative w-20 h-20 mb-4 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xl font-bold shrink-0">
          {session?.user?.name ? (
            session.user.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()
          ) : (
            "..."
          )}
        </div>

        <h2 className="font-unbounded font-bold text-lg text-neutral-900 dark:text-white mb-1">
          {session?.user?.name}
        </h2>
        <span className="font-unbounded text-[10px] text-neutral-500 uppercase tracking-wider mb-4">
          {session?.user?.email}
        </span>

        <div className="px-3 py-1 rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
          <span className="font-unbounded text-[10px] font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
            {session?.user?.role}
          </span>
        </div>
      </div>

      <div className="h-px w-full bg-neutral-100 dark:bg-neutral-800 mb-8" />

      {/* Navigation */}
      <nav className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-col gap-2 w-full flex-1">
        {menuItems.map((item, index) => {
          const isActive = pathname === item.href;
          return (
            <button
              key={item.label}
              onClick={() => router.push(item.href)}
              className={`group relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 w-full ${isActive
                ? 'text-white bg-black dark:bg-white dark:text-black'
                : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-900'
                }`}
            >
              <span className={`transition-colors ${isActive ? 'text-white dark:text-black' : 'text-neutral-400 group-hover:text-black dark:group-hover:text-white'}`}>
                {item.icon}
              </span>

              <span className="font-unbounded text-xs font-bold tracking-wide">
                {item.label}
              </span>

              {item.label === "Premium" && !isActive && (
                <span className="ml-auto text-[9px] font-unbounded font-bold bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-full uppercase tracking-wider">
                  PRO
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="h-px w-full bg-neutral-100 dark:bg-neutral-800 my-5" />

      {session?.user?.role === "admin" && (
        <Link
          href="/dashboard"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors w-full group"
        >
          <TbDashboardFilled className="text-xl group-hover:-translate-x-1 transition-transform" />
          <span className="font-unbounded text-xs font-bold tracking-wide">
            Dashboard
          </span>
        </Link>
      )}

      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors w-full group"
      >
        <TbLogout className="text-xl group-hover:-translate-x-1 transition-transform" />
        <span className="font-unbounded text-xs font-bold tracking-wide">
          Sign Out
        </span>
      </button>
    </motion.aside>
  );
}