"use client";

import { useAccount, useReadContracts, useReadContract } from 'wagmi';
import { formatUnits } from 'ethers';
import TokenABI from '@/abis/Token.json';
import { TokenOperations } from './TokenOperations';
import { Skeleton } from './Skeleton';

const tokenAddress = process.env.NEXT_PUBLIC_TOKEN_ADDRESS as string;

export function TokenInfo() {
  const { data: contractData, isError: isDataError, isLoading: isDataLoading } =
    useReadContracts({
      contracts: [
        { address: tokenAddress, abi: TokenABI, functionName: 'name' },
        { address: tokenAddress, abi: TokenABI, functionName: 'symbol' },
        { address: tokenAddress, abi: TokenABI, functionName: 'totalSupply' },
      ],
    });

  const { address, isConnected } = useAccount();
  const {
    data: rawBalance,
    isError: isBalanceError,
    isLoading: isBalanceLoading,
  } = useReadContract({
    address: tokenAddress,
    abi: TokenABI,
    functionName: 'balanceOf',
    args: isConnected && address ? [address] : undefined,
    enabled: isConnected,
  });

  if (isDataLoading || (isConnected && isBalanceLoading)) {
    return (
      <div className="p-4 bg-background border border-black/10 dark:border-white/10 rounded-lg">
        <div className="space-y-2">
          <Skeleton className="h-5 w-1/2 rounded" />
          <Skeleton className="h-5 w-1/4 rounded" />
          <Skeleton className="h-5 w-3/4 rounded" />
          {isConnected && <Skeleton className="h-5 w-1/3 rounded" />}
        </div>
      </div>
    );
  }

  if (isDataError || (isConnected && isBalanceError)) {
    return (
      <div className="p-4 bg-red-100 dark:bg-red-900 border border-red-300 dark:border-red-700 text-red-700 rounded-lg">
        Error fetching token data.
      </div>
    );
  }

  const [name, symbol, totalSupply] = contractData ?? [];
  const formattedTotalSupply = totalSupply ? formatUnits(totalSupply, 18) : '';
  const formattedBalance = isConnected && rawBalance ? formatUnits(rawBalance, 18) : null;

  return (
    <div className="p-4 bg-background border border-black/10 dark:border-white/10 rounded-lg">
      <h2 className="text-xl font-bold mb-2">Token Information</h2>
      <ul className="space-y-1">
        <li>
          <span className="font-semibold">Name:</span> {name as string}
        </li>
        <li>
          <span className="font-semibold">Symbol:</span> {symbol as string}
        </li>
        <li>
          <span className="font-semibold">Total Supply:</span> {formattedTotalSupply} {symbol as string}
        </li>
        {isConnected && (
          <li>
            <span className="font-semibold">Your Balance:</span> {formattedBalance} {symbol as string}
          </li>
        )}
      </ul>
      {isConnected && <TokenOperations />}
    </div>
  );
}