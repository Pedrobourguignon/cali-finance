export const formatUsd = (value: number, locale: string) =>
	Number(value.toFixed(2)).toLocaleString(locale);
