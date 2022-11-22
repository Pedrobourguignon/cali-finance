export const handleLogoImage = (name: string) =>
	name
		.toUpperCase()
		.split(' ')
		.map(item => item[0]);
