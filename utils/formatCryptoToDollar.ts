import numbro from 'numbro';
import { formatUnits } from 'viem';

export const formatCryptoToDollar = (value: bigint, decimals = 18) => {
	const valueToNumber = formatUnits(value, decimals);
	const formattedValue = numbro(valueToNumber).format({
		mantissa: 2,
		trimMantissa: true,
	});
	return formattedValue;
};
