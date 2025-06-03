# React Query v5+ Usage Guide

## Overview
- React Query v5+ requires the object signature for all hooks (e.g., `useQuery`, `useMutation`, `useInfiniteQuery`).
- The old array/function signature from v3/v4 is not supported and will cause errors.

## Correct Usage (v5+)
```ts
useQuery({
  queryKey: ['tasks', address],
  queryFn: () => fetch(`/api/tasks?userAddress=${address}`).then((res) => res.json()),
  enabled: isConnected,
});
```

## Incorrect Usage (Do NOT use)
```ts
useQuery([
  'tasks',
  address
], () => fetch(`/api/tasks?userAddress=${address}`).then((res) => res.json()), { enabled: isConnected });
```

## Why?
- The object signature is required for all React Query hooks in v5+.
- Using the old signature will result in runtime errors and is not supported.

## Codegen/AI Rule
- All generated code must use the object signature for React Query hooks.
- Never use the array/function signature from v3/v4. 