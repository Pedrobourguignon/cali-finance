export const handleLogoImage = (name: string) =>
	name
		.toUpperCase()
		.split(' ')
		.map(item => item[0])
		.slice(0, 2);
