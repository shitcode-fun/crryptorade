"use client";

import React, { useState } from 'react';
import { TriviaQuestion } from '@/data/trivia';

interface TriviaModalProps {
  question: TriviaQuestion;
  onAnswer: (correct: boolean) => void;
}

export function TriviaModal({ question, onAnswer }: TriviaModalProps) {
  const [selected, setSelected] = useState('');

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="trivia-title"
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
    >
      <div className="bg-white p-6 rounded-md w-11/12 sm:w-1/2 transform transition-transform duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-blue-600">
        <h2 id="trivia-title" className="text-lg font-bold mb-4">
          {question.question}
        </h2>
        <div role="radiogroup" className="space-y-2">
          {question.options.map((opt) => (
            <button
              key={opt}
              role="radio"
              aria-checked={selected === opt}
              onClick={() => setSelected(opt)}
              className={`w-full text-left px-4 py-2 border rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                selected === opt
                  ? 'bg-blue-200 border-blue-400'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
        <button
          onClick={() => onAnswer(selected === question.correctAnswer)}
          disabled={!selected}
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded transition-colors duration-200 hover:bg-green-700 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-green-600"
        >
          Submit
        </button>
      </div>
    </div>
  );
}