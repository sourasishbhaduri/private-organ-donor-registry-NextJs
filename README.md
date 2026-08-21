# Private Organ Donor Registry

**Private Organ Donation. Verifiable Consent. Protected Identity.**

A full-stack, privacy-preserving dApp built on the Midnight Network for the **Rise In Midnight Builder Challenge Level 3**. 
This application allows individuals to cryptographically register their organ donation consent and prove their eligibility (e.g. age, medical clearance) using zero-knowledge proofs, without ever exposing their underlying private data.

## Problem
Traditional organ donor registries require individuals to share highly sensitive medical and identifying information with a centralized database. This creates privacy risks, data silos, and potential unauthorized access. Furthermore, hospitals and verifiers need to query these centralized databases, creating further privacy leaks.

## Solution
Using the **Midnight Network**, this application implements a Zero-Knowledge circuit that allows donors to generate a proof of eligibility and consent locally. The network verifies the proof without ever seeing the private data.

## Features
- **Donor Registration:** Generate a ZK proof of age (>=18) and medical clearance.
- **Privacy-Preserving Registry:** Only cryptographic commitments and aggregate blood supply metrics are stored publicly.
- **Verification Portal:** Hospitals can verify a donor's eligibility and consent locally without accessing a central database.
- **Next.js Full-Stack App:** Premium, responsive UI built with Next.js (App Router) and Tailwind CSS.
- **Lace Wallet Integration:** Seamless connection with Midnight Lace Wallet.

## Privacy Model

### Public State (Ledger)
- Anonymous Cryptographic Commitment
- Total Number of Registered Donors
- Aggregated Blood Supply Counts (Anonymized)
- Binary Consent Status Result (during verification)

### Private Witness (Never Leaves Local Device)
- Donor Identity & Name
- Exact Age / Date of Birth
- Exact Blood Type (Unless explicitly disclosed for supply stats)
- Medical Clearance Document Hash

## Architecture & Tech Stack
- **Smart Contracts:** Compact (Midnight's ZK language)
- **Frontend:** Next.js 14+ (App Router), React, Tailwind CSS
- **Wallet Integration:** Lace Wallet / Midnight SDK
- **Network:** Midnight Preprod & Local Devnet

## Folder Structure
- `contracts/`: Compact smart contracts and generated artifacts
- `frontend/`: Next.js application
- `src/`: TypeScript CLI and wallet utilities
- `test/`: Integration tests

## Installation & Setup

1. **Install Dependencies**
   ```bash
   npm install
   cd frontend && npm install
   ```

2. **Compile Contract**
   ```bash
   npm run compile
   ```

3. **Run Local Frontend**
   ```bash
   cd frontend
   npm run dev
   ```

## Contract Deployment (Preprod)

The contract is designed to be deployed to the Midnight Preprod network.

**Blocker Note / Deployment Status:**
Currently deployed contract address on Preprod (if successful):
`[Awaiting CLI Deployment confirmation]`

## Environment Variables
In the `frontend` folder, create a `.env.local` file:
```
NEXT_PUBLIC_NETWORK=preprod
NEXT_PUBLIC_CONTRACT_ADDRESS=<DEPLOYED_CONTRACT_ADDRESS>
```

## Testing & CI/CD
- GitHub Actions CI is configured to run `npm install`, compile the contract, and build the Next.js frontend on every push to `main`.
- You can run the tests locally using: `npm run test`

## Rise In Level 3 Submission Checklist
- [x] Real organ registry contract with Public/Private state separation
- [x] disclose() used deliberately
- [x] Generated artifacts exist
- [x] Lace Wallet integration
- [x] Next.js Frontend with /dashboard, /register, /verify, /records, /history, /privacy, /about routes
- [x] CI passes
- [x] Production build passes
- [x] README completed
