export interface TriviaQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

export const triviaQuestions: TriviaQuestion[] = [
  {
    id: 1,
    question: 'What does “ETH” stand for in Ethereum?',
    options: ['Ether', 'Ethereum Token', 'Electronic Transfer', 'None of the above'],
    correctAnswer: 'Ether',
  },
  {
    id: 2,
    question: 'Which consensus mechanism does Ethereum currently use?',
    options: ['Proof of Work', 'Proof of Stake', 'Delegated Proof of Stake', 'Proof of Authority'],
    correctAnswer: 'Proof of Stake',
  },
  {
    id: 3,
    question: 'What is gas in Ethereum?',
    options: [
      'A measure to send transactions',
      'Fuel used by cars',
      'Cryptocurrency token',
      'None of the above',
    ],
    correctAnswer: 'A measure to send transactions',
  },
  {
    id: 4,
    question: 'What is a smart contract?',
    options: [
      'A self-executing contract with terms in code',
      'A paper agreement',
      'A traditional legal contract',
      'None of the above',
    ],
    correctAnswer: 'A self-executing contract with terms in code',
  },
  {
    id: 5,
    question: 'What does L2 refer to in blockchain?',
    options: [
      'Layer 2 scaling solutions',
      'Level 2 support',
      'Blockchain layer for storage',
      'None of the above',
    ],
    correctAnswer: 'Layer 2 scaling solutions',
  },
];