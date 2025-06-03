import { Leaderboard } from '@/components/Leaderboard';

export const metadata = {
  title: 'Leaderboard | Crypto-Race',
  description: 'View top player scores and coins in the Crypto-Race leaderboard.',
};

export default function LeaderboardPage() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 px-4 py-8 bg-background">
      <h1 className="text-3xl font-bold mb-4">Leaderboard</h1>
      <Leaderboard />
    </div>
  );
}