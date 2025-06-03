# Wagmi & Ethers v6+ Usage Guide

## Overview
- **wagmi v1+** requires **ethers v6+** as a peer dependency.
- Ethers v6+ changed its import structure: utility functions must be imported from the top-level package, not subpaths.

## Correct Import Example
```ts
import { parseUnits, formatUnits } from "ethers";
```

## Incorrect Import (Do NOT use)
```ts
import { parseUnits } from "ethers/lib/utils"; // ❌ Invalid in ethers v6+
```

## Why?
- `ethers/lib/utils` and other subpath imports were removed in ethers v6+.
- Using the old import style will cause build/runtime errors.

## Codegen/AI Rule
- All generated code must use top-level imports from `ethers` for utilities.
- Never use `ethers/lib/utils` or any subpath import.

## Ethereum Address Typing

- Never import `Address` from `wagmi` (it does not exist).
- Use `string` for Ethereum addresses, or import `Address` from `viem` if available.

**Correct:**
```ts
// Use string
declare const TOKEN_ADDRESS: string;

// Or, if using viem:
import type { Address } from 'viem';
declare const TOKEN_ADDRESS: Address;
```

**Incorrect:**
```ts
import type { Address } from 'wagmi'; // ❌ Invalid
declare const TOKEN_ADDRESS: Address;
```
