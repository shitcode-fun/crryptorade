 'use client';

 import React, { useEffect } from 'react';

 interface ErrorProps {
  error: Error;
  reset: () => void;
 }

 export default function RaceError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center flex-1 p-8 space-y-4">
      <h2 className="text-2xl font-bold">Failed to load race</h2>
      <p className="text-gray-600">{error.message}</p>
      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-blue-600 text-white rounded transition-colors duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
      >
        Try again
      </button>
    </div>
  );
}