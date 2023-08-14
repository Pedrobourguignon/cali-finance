import { formatUnits } from 'viem';

export const formatContractNumbers = (
	value: bigint,
	locale: string,
	decimals: number,
	isDollar?: boolean
) => {
	if (isDollar && value) {
		const formattedDollar = Number(
			Number(formatUnits(value, decimals)).toFixed(2)
		).toLocaleString(locale);
		return formattedDollar;
	}
	if (value) {
		const formattedCoin = Number(formatUnits(value, decimals)).toFixed(7);
		return formattedCoin;
	}
	return '0';
};
