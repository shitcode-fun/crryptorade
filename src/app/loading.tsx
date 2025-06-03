import React from 'react';
import { Spinner } from '@/components/Spinner';

export default function RootLoading() {
  return (
    <div className="flex items-center justify-center flex-1 p-8">
      <Spinner />
      <p className="sr-only">Loading...</p>
    </div>
  );
}