export const formatNumbers = (value: number, locale: string) => {
	if (value) {
		const formatedNumber = value.toLocaleString(locale);
		return formatedNumber;
	}
	return 0;
};
