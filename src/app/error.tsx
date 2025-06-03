 'use client';

 import React, { useEffect } from 'react';

 interface ErrorProps {
  error: Error;
  reset: () => void;
 }

 export default function RootError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center flex-1 p-8 space-y-4">
      <h1 className="text-2xl font-bold">Something went wrong</h1>
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