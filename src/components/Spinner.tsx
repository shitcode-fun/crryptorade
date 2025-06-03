"use client";

import React from 'react';

export function Spinner() {
  return (
    <div
      role="status"
      className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
      aria-label="Loading"
    />
  );
}