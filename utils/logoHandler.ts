// eslint-disable-next-line consistent-return
export const handleLogoImage = (logo: string, name: string) => {
	if (!logo)
		return name
			.toUpperCase()
			.split(' ')
			.map(item => item[0]);
};
