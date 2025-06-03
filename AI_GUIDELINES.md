# AI Code Generation Guidelines (Reinforced)

## Package Versions (as of template)
- `wagmi@2.15.4`
- `@rainbow-me/rainbowkit@2.2.5`
- `next@14.2.28`
- `react@18.2.0`, `react-dom@18.2.0`
- `ethers@6.14.1`
- `@tanstack/react-query@5.36.0`

## wagmi Usage
- Use ONLY `useReadContract`, `useReadContracts`, and `useWriteContract` for contract interaction.
- **Do NOT use** `useContractRead`, `useContractWrite`, or `usePrepareContractWrite` (these are v1 APIs, not present in v2+).
- See `/docs/wagmi.md` for correct usage patterns and examples.
- **You do NOT have access to the internet or external documentation. Only use the usage patterns and examples provided in the `/docs` directory and the codebase.**
- **Never assume the existence of properties or methods on hook return values. Always check the type definitions and documentation provided in the repo for the current version.**

## RainbowKit Usage
- Use RainbowKit v2.2.5 for wallet integration, following the patterns in `/docs` and the codebase.
- Ensure compatibility with wagmi v2+.
- **You do NOT have access to the internet or external documentation. Only use the usage patterns and examples provided in the `/docs` directory and the codebase.**

## Next.js Usage
- Use Next.js v14.2.28 best practices as shown in `/docs` and the codebase.
- **You do NOT have access to the internet or external documentation. Only use the usage patterns and examples provided in the `/docs` directory and the codebase.**

## ethers Usage
- Use ethers v6.14.1 for contract ABIs and utilities, following the examples in `/docs` and the codebase.
- **You do NOT have access to the internet or external documentation. Only use the usage patterns and examples provided in the `/docs` directory and the codebase.**

## React Query Usage
- Use @tanstack/react-query v5.36.0 for data fetching and caching, following the examples in `/docs` and the codebase.
- **You do NOT have access to the internet or external documentation. Only use the usage patterns and examples provided in the `/docs` directory and the codebase.**

## Environment Variable Handling
- When using environment variables (e.g., `process.env.NEXT_PUBLIC_...`) in TypeScript:
  - Always check or assert that the variable is defined before using it as a required argument.
  - Never pass `process.env.*` directly to a function or component that expects a non-optional value.
  - For contract addresses, ensure the value is a string starting with `0x` and not `undefined`.
  - Example:
    ```ts
    const address = process.env.NEXT_PUBLIC_ANIMAL_NFT_ADDRESS;
    if (!address) throw new Error('NEXT_PUBLIC_ANIMAL_NFT_ADDRESS is not set');
    writeContract({ address, ... });
    ```

## General Rules
- **You do NOT have access to the results of `npx tsc`, `npm run lint`, or `npm run build` during code generation. These commands are run externally after your code is generated.**
- **Any errors from these commands will be provided to you explicitly in the prompt in fix-only mode. Do NOT attempt to run these commands yourself or assume their output.**
- **Never generate code, scripts, or documentation that includes or suggests running `npm run build`, `npm run lint`, or `npx tsc`.**
- **When in fix-only mode, focus exclusively on resolving the provided errors, and do not introduce new features or unrelated changes.**
- Always check the `/docs` directory for usage examples of key npm packages. Always follow these patterns.
- If a command or patch fails, log the error and do not retry with the same invalid input.
- Do not use any npm or npx commands in generated code or scripts.
- Never ask for user input; proceed with all steps automatically.
- Do not check for the existence of files or directories; generate them directly if required.
- Focus on generating only the necessary files and code. Avoid unnecessary checks or redundant operations.

## Shell Commands and Tooling

- Do NOT use non-standard shell tools (e.g., `rg`, `ag`, `fd`, `bat`, etc.) in any generated code, scripts, or documentation.
- Only use POSIX-compliant tools that are available in all standard Linux environments, such as `find`, `grep`, `ls`, `cat`, `awk`, `sed`.
- Do NOT assume the presence of developer utilities unless they are explicitly installed in the project Dockerfile or setup scripts.
- If you need to search for files, use `find` and `grep` only.
- If using `grep`, handle exit code 1 (no matches) gracefully and do not treat it as an error.

## Patch and File Editing

- When generating patches or file edits, always base your changes on the latest version of the file as it exists in the repository at the time of generation.
- Avoid making assumptions about the file's content or structure; always read the current file state before generating a patch.
- If you must generate a patch, ensure the context lines in the patch exactly match the current file content to avoid context errors.
- If the patch fails to apply due to context mismatch, re-fetch the latest file content and regenerate the patch accordingly.

## TypeScript, Lint, and Build Errors

- You will be provided with the full error output from `npx tsc --noEmit`, `npm run lint`, and `npm run build` in fix-only mode.
- Always address all provided errors, and do not introduce unrelated changes.
- Never attempt to run these commands yourself or generate code/scripts that do so.

## Common Mistakes to Avoid
- Do NOT use any v1 wagmi APIs (`useContractRead`, `useContractWrite`, `usePrepareContractWrite`).
- Do NOT use deprecated or removed APIs from any package.
- Always use the latest recommended usage patterns and APIs for all libraries, as shown in `/docs` and the codebase.
- If you are unsure about an API, consult the `/docs` directory or the codebase.
- Do NOT use non-standard shell tools (such as `rg`, `ag`, `fd`, etc.) in any generated code, scripts, or documentation. Only use POSIX-compliant tools like `find` and `grep`. If using `grep`, handle exit code 1 (no matches) gracefully and do not treat it as an error.
- Do NOT generate or suggest running any build, lint, or type-checking commands in code, scripts, or documentation.

## Hardhat Presence and Usage

- **Assume that Hardhat is present in `devDependencies` of `package.json`, but no smart contract work has been done yet.**
- **Do not check for the existence of any Hardhat files, folders, or configuration.**
- **If smart contract files, configuration, or setup are required, generate them from scratch according to the project specification and template, without searching for or relying on any pre-existing contract code or Hardhat setup.**
- **Never use shell commands or file system checks (such as `find`, `grep`, or `ls`) to detect Hardhat or its files or folders.**

## Token Contract Usage

- **Never deploy a new ERC20 token contract.**
- **Always use the deployed token contract address provided in the `README.md` file, under the "Token Info" section.**
- If you need to reference the token contract address in code, documentation, or configuration, extract it from the `README.md` as the single source of truth.
- Under no circumstances should you generate code, scripts, or documentation that deploys a new ERC20 token contract for this project.

## Reference
- See `/docs` directory for all usage patterns and API references relevant to this project.

## Wagmi & Ethers v6 Import Guidelines for Codegen

**Important:** When generating code for projects using wagmi and ethers, always use the correct import style for ethers v6+ utilities. The old import path `ethers/lib/utils` is no longer valid in ethers v6 and above.

- **Correct (Ethers v6+):**
  ```ts
  import { parseUnits } from "ethers";
  ```
- **Incorrect (Do NOT use):**
  ```ts
  import { parseUnits } from "ethers/lib/utils";
  ```

> **Rule:** All codegen and AI-generated code must use top-level imports from `ethers` for utility functions. Never use `ethers/lib/utils` or any subpath imports from ethers v6+.

- wagmi v1+ expects ethers v6+ as a peer dependency.
- This rule applies to all code, scripts, and templates.

## React Query v5+ Usage Guidelines

**Important:** Only use the object signature for `useQuery` and related hooks (e.g., `useMutation`, `useInfiniteQuery`) in React Query v5+. The old array/function signature is not valid in v5+ and must not be used.

- **Correct (v5+):**
  ```ts
  useQuery({
    queryKey: ['tasks', address],
    queryFn: () => fetch(`/api/tasks?userAddress=${address}`).then((res) => res.json()),
    enabled: isConnected,
  });
  ```
- **Incorrect (Do NOT use):**
  ```ts
  useQuery([
    'tasks',
    address
  ], () => fetch(`/api/tasks?userAddress=${address}`).then((res) => res.json()), { enabled: isConnected });
  ```

> **Rule:** All codegen and AI-generated code must use the object signature for React Query hooks. Never use the array/function signature from v3/v4.

- This rule applies to all code, scripts, and templates.

## Ethereum Address Typing Guidelines

**Important:** Never import `Address` from `wagmi`—it does not exist. For Ethereum addresses, use `string` or, if you are using viem, import `Address` from `viem`.

- **Correct:**
  ```ts
  // Use string
  export const TOKEN_ADDRESS: string = '0x...';

  // Or, if using viem:
  import type { Address } from 'viem';
  export const TOKEN_ADDRESS: Address = '0x...';
  ```
- **Incorrect (Do NOT use):**
  ```ts
  import type { Address } from 'wagmi'; // ❌ Invalid, does not exist
  export const TOKEN_ADDRESS: Address = '0x...';
  ```

> **Rule:** All codegen and AI-generated code must use `string` for Ethereum addresses, or `Address` from `viem` if available. Never import `Address` from `wagmi`.

- This rule applies to all code, scripts, and templates. 