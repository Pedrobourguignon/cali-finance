import { parseUnits } from 'viem';

export const formatDecimals = (
	amount: number,
	decimals: number | undefined
) => {
	const result = parseUnits(`${amount}`, (decimals as number) || 18);
	return result;
};
