export function Footer() {
  return (
    <footer className="w-full border-t border-black/10 dark:border-white/10 px-4 sm:px-8 py-4 bg-background text-center transition-colors duration-200">
      &copy; {new Date().getFullYear()} Crypto-Race. All rights reserved.
    </footer>
  );
}