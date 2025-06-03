"use client";

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from './Skeleton';

interface Progress {
  address: string;
  score: number;
  coins: number;
}

export function Leaderboard() {
  const { data, isLoading, isError } = useQuery<Progress[]>({
    queryKey: ['leaderboard'],
    queryFn: () => fetch('/api/leaderboard').then((res) => res.json()),
  });

  if (isLoading) {
    return (
      <div className="p-4 bg-background border border-black/10 dark:border-white/10 rounded-lg mt-4 w-full max-w-md space-y-2">
        <Skeleton className="h-5 w-1/2 rounded" />
        <Skeleton className="h-5 w-full rounded" />
        <Skeleton className="h-5 w-full rounded" />
        <Skeleton className="h-5 w-full rounded" />
      </div>
    );
  }
  if (isError || !data) {
    return (
      <div className="p-4 bg-red-100 dark:bg-red-900 border border-red-300 dark:border-red-700 text-red-700 rounded-lg mt-4 w-full max-w-md">
        Error loading leaderboard.
      </div>
    );
  }
  return (
    <div className="p-4 bg-background border border-black/10 dark:border-white/10 rounded-lg mt-4 w-full max-w-md">
      <h2 className="text-xl font-bold mb-2">Leaderboard</h2>
      <ol className="list-decimal list-inside space-y-1">
        {data.map((p) => (
          <li key={p.address}>
            {p.address.slice(0, 6)}... - Score: {p.score} | Coins: {p.coins}
          </li>
        ))}
      </ol>
    </div>
  );
}