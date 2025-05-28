'use client';

import { http, createStorage, cookieStorage } from 'wagmi'
import { sepolia, bscTestnet, blastSepolia, mainnet, polygon, optimism, arbitrum } from 'wagmi/chains'
import { Chain, getDefaultConfig } from '@rainbow-me/rainbowkit'

const projectId = 'YOUR_PROJECT_ID';

const supportedChains: Chain[] = [sepolia, bscTestnet, blastSepolia, mainnet, polygon, optimism, arbitrum];

export const config = getDefaultConfig({
  appName: 'WalletConnection',
  projectId,
  chains: supportedChains as any,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  transports: supportedChains.reduce((obj, chain) => ({ ...obj, [chain.id]: http() }), {})
});