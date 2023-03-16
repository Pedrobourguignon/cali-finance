export const handleLogoImage = (name: string | undefined) =>
	name
		?.toUpperCase()
		.split(' ')
		.map(item => item[0])
		.slice(0, 2);
