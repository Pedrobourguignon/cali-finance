import numbro from 'numbro';

export const formatFiat = (value: number | string) =>
	numbro(value).format({
		mantissa: 2,
		trimMantissa: true,
	});
