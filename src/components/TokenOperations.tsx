"use client";

import React, { useState, useEffect } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import { parseUnits } from 'ethers';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import TokenABI from '@/abis/Token.json';
import { useToast } from './Toast';

const tokenAddress = process.env.NEXT_PUBLIC_TOKEN_ADDRESS as string;

export function TokenOperations() {
  const { address, isConnected } = useAccount();
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const { writeContract, isPending, isSuccess, error } = useWriteContract();
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  const recordTxn = useMutation({
    mutationFn: (txHash: string) =>
      fetch('/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address, txHash, type: 'transfer' }),
      }),
  });

  const handleTransfer = () => {
    if (!recipient || !amount) return;
    try {
      const parsed = parseUnits(amount, 18);
      writeContract({
        address: tokenAddress,
        abi: TokenABI,
        functionName: 'transfer',
        args: [recipient, parsed],
        onSuccess(data) {
          if (data && 'hash' in data) {
            recordTxn.mutate((data as any).hash);
            addToast({ type: 'info', message: 'Transfer submitted' });
          }
        },
        onError(err) {
          addToast({ type: 'error', message: (err as Error).message });
        },
      });
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      queryClient.invalidateQueries(['progress', address]);
      addToast({ type: 'success', message: 'Transfer successful' });
    }
  }, [isSuccess, queryClient, address, addToast]);

  if (!isConnected) {
    return <div>Please connect your wallet to perform token operations.</div>;
  }

  return (
    <div className="mt-4 p-4 bg-background border border-black/10 dark:border-white/10 rounded-lg">
      <h2 className="text-lg font-bold mb-2">Token Operations</h2>
      <div className="flex flex-col space-y-2">
        <input
          type="text"
          aria-label="Recipient Address"
          placeholder="Recipient Address"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          className="px-2 py-1 border rounded transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <input
          type="text"
          aria-label="Amount"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="px-2 py-1 border rounded transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <button
          onClick={handleTransfer}
          disabled={isPending}
          className="px-4 py-2 bg-blue-600 text-white rounded transition-colors hover:bg-blue-700 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          Transfer
        </button>
        {/* Feedback via toast notifications */}
      </div>
    </div>
  );
}