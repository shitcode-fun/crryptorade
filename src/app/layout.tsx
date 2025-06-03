import type { Metadata } from "next";
import "./globals.css";
import { Providers } from './providers';
import { Navbar } from '../components/Navbar';

export const metadata: Metadata = {
  title: "Web3 App Template",
  description: "Minimal Next.js web3 template.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
