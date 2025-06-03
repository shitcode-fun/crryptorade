"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/race', label: 'Race' },
    { href: '/leaderboard', label: 'Leaderboard' },
  ];

  return (
    <nav
      aria-label="Main navigation"
      className="w-full fixed top-0 left-0 z-10 bg-background border-b border-black/10 dark:border-white/10 px-4 sm:px-8 h-16 flex items-center justify-between"
    >
      <ul className="flex items-center space-x-6">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`text-lg font-medium transition-colors duration-200 ${
                  isActive
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
                } focus:outline-none focus:ring-2 focus:ring-blue-600 rounded`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
      <ConnectButton />
    </nav>
  );
}