import { parseUnits } from 'viem';

export const formatDecimals = async (amount: number, decimals: number) => {
	const result = await parseUnits(`${amount}`, (decimals as number) || 18);
	const formatedDecimals = await Promise.all([result]);
	return Number(formatedDecimals);
};
