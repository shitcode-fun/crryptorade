"use client";

import React, { useState } from 'react';
import { useAccount } from 'wagmi';
import { useQuery, useMutation } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { Spinner } from '@/components/Spinner';
import { useToast } from '@/components/Toast';
import { triviaQuestions } from '@/data/trivia';

export const metadata = {
  title: 'Race | Crypto-Race',
  description: 'Race virtual cars in Crypto-Race and collect rewards.',
};

const DynamicGameCanvas = dynamic(() => import('@/components/GameCanvas'), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center items-center h-64">
      <Spinner />
    </div>
  ),
});

const DynamicTriviaModal = dynamic(() => import('@/components/TriviaModal'), {
  loading: () => null,
});

interface Progress {
  address: string;
  coins: number;
  score: number;
}

export default function RacePage() {
  const { address, isConnected } = useAccount();
  const {
    data: progress,
    isLoading: isProgressLoading,
    isError: isProgressError,
    refetch,
  } = useQuery<Progress>({
    queryKey: ['progress', address],
    queryFn: () => fetch(`/api/progress?address=${address}`).then((res) => res.json()),
    enabled: isConnected,
  });
  const saveProgress = useMutation({
    mutationFn: (newProgress: Progress) =>
      fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProgress),
      }),
    onSuccess: () => {
      refetch();
    },
  });

  const [showTrivia, setShowTrivia] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(triviaQuestions[0]);
  const [lastResult, setLastResult] = useState<{ coins: number; score: number } | null>(null);
  const { addToast } = useToast();

  const handleTriggerTrivia = () => {
    const q = triviaQuestions[Math.floor(Math.random() * triviaQuestions.length)];
    setCurrentQuestion(q);
    setShowTrivia(true);
  };

  const handleAnswer = (correct: boolean) => {
    setShowTrivia(false);
    window.dispatchEvent(new CustomEvent('triviaResolved', { detail: { correct } }));
  };

  const handleGameOver = (score: number, coins: number) => {
    setLastResult({ score, coins });
    if (isConnected && address) {
      saveProgress.mutate({ address, coins, score });
    }
  };
  // Show loading or error for progress fetch
  if (isConnected && isProgressLoading) {
    return (
      <div className="flex flex-col items-center justify-center flex-1 px-4 py-8 bg-background">
        <Spinner />
        <p className="mt-2 text-gray-600">Loading your progress...</p>
      </div>
    );
  }

  if (isConnected && isProgressError) {
    return (
      <div className="flex flex-col items-center justify-center flex-1 px-4 py-8 bg-background">
        <p className="text-red-700">Failed to load progress. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center flex-1 px-4 py-8 bg-background">
      <h1 className="text-3xl font-bold mb-4">Crypto-Race</h1>
      {!isConnected && <p className="text-lg mb-4">Please connect your wallet to start racing.</p>}
      {isConnected && (
        <>
          {!lastResult && (
            <DynamicGameCanvas
              onGameOver={(score, coins) => {
                handleGameOver(score, coins);
                addToast({
                  type: 'info',
                  message: `Game over! Score: ${score} | Coins: ${coins}`,
                });
              }}
              onTriggerTrivia={handleTriggerTrivia}
            />
          )}
          {showTrivia && (
            <DynamicTriviaModal
              question={currentQuestion}
              onAnswer={(correct) => {
                handleAnswer(correct);
                addToast({
                  type: correct ? 'success' : 'error',
                  message: correct
                    ? 'Correct answer! Health restored.'
                    : 'Incorrect answer.',
                });
              }}
            />
          )}
          {lastResult && (
            <div className="mt-4 text-center">
              <p className="text-lg font-semibold mb-2">Game Over!</p>
              <p className="mb-4">
                Score: {lastResult.score} | Coins Collected: {lastResult.coins}
              </p>
              <button
                onClick={() => setLastResult(null)}
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded transition-colors duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                Play Again
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}