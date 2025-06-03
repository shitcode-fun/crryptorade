

import { TokenInfo } from '@/components/TokenInfo';

export const metadata = {
  title: 'Home | Crypto-Race',
  description:
    'Collect coins, dodge market obstacles, and earn real crypto rewards!',
};

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center flex-1 px-4 py-8 bg-background">
      <h1 className="text-4xl font-bold mb-4">Crypto-Race</h1>
      <p className="text-lg mb-8 text-center">
        Collect coins, dodge market obstacles, and earn real crypto rewards!
      </p>
      <TokenInfo />
    </main>
  );
}
