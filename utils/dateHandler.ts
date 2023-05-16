export const dateHandler = (date: string, locale = 'en-US') => {
	const originalDate = new Date(date);
	const formatedDate = new Intl.DateTimeFormat(locale, {
		dateStyle: 'medium',
		timeStyle: 'short',
	}).format(originalDate);

	return formatedDate;
};
