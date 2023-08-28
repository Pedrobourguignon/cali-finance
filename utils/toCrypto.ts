import { parseUnits } from 'viem';

export const toCrypto = (value: number, decimals = 18) => {
	const result = parseUnits(`${value}`, decimals);
	return result;
};
