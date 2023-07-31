export const subtractFee = (transactionAmount: number, locale: string) =>
	Number(
		(transactionAmount - transactionAmount * 0.005).toFixed(3)
	).toLocaleString(locale);
