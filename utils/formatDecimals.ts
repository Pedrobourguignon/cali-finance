import { readContract } from '@wagmi/core';
import caliTokenAbi from 'utils/abi/caliToken.json';
import { Hex, parseUnits } from 'viem';

export const formatDecimals = async (amount: `${number}`) => {
	const decimals = await readContract({
		address: (process.env.NEXT_PUBLIC_CALI_TOKEN || '') as Hex,
		abi: caliTokenAbi,
		functionName: 'decimals',
	});
	const result = await parseUnits(amount, (decimals as number) || 18);
	const formatedDecimals = await Promise.all([result]);
	return Number(formatedDecimals);
};
