export const formatUsd = (value: number, locale: string) =>
	Number(value.toLocaleString(locale)).toFixed(2);
