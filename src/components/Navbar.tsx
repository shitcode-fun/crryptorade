"use client";

import { ConnectButton } from '@rainbow-me/rainbowkit';

export function Navbar() {
  return (
    <nav className="w-full fixed top-0 left-0 z-10 bg-background border-b border-black/10 dark:border-white/10 px-4 sm:px-8 h-16 flex items-center justify-between">
      <span className="font-semibold text-lg tracking-tight">Web3 App</span>
      <div>
        <ConnectButton />
      </div>
    </nav>
  );
} 