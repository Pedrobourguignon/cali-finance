export const handleNotificationAmount = (amount: string) => {
	const splitedAmount = amount.split('.');
	if (splitedAmount[1].includes('0000000')) {
		return splitedAmount[0];
	}
	return Number(amount).toFixed(7);
};
