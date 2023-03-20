import { IChainDictionary } from 'types';

export const chainList = (chainId: number) => {
	if (chainId === 1) return 'ethereum';
	if (chainId === 137) return 'polygon-pos';
	return 'binance-smart-chain';
};
