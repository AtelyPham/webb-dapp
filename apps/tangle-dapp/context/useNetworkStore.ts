'use client';

import { Network } from '@webb-tools/webb-ui-components/constants';
import { create } from 'zustand';

import { DEFAULT_NETWORK } from '../constants/networks';

/**
 * A store for Network info to use when creating/using
 * Polkadot API instances.
 */
const useNetworkStore = create<{
  rpcEndpoint: string;
  network: Network;
  setNetwork: (network: Network) => void;
  nativeTokenSymbol: string;
  setNativeTokenSymbol: (nativeTokenSymbol: string) => void;
}>((set) => ({
  rpcEndpoint: DEFAULT_NETWORK.rpcEndpoint,
  network: DEFAULT_NETWORK,
  setNetwork: (network) => set({ network, rpcEndpoint: network.rpcEndpoint }),
  nativeTokenSymbol: '',
  setNativeTokenSymbol: (nativeTokenSymbol) => set({ nativeTokenSymbol }),
}));

export default useNetworkStore;
