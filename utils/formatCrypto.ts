import numbro from 'numbro';
import { formatUnits } from 'viem';

export const formatCrypto = (value: bigint, decimals = 18) => {
	const valueToNumber = formatUnits(value, decimals);
	const formattedValue = numbro(valueToNumber).format({
		mantissa: decimals,
		trimMantissa: true,
	});
	return formattedValue;
};
