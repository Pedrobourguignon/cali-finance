import { extendTheme, ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
	initialColorMode: 'dark',
	useSystemColorMode: false,
};

export const theme = extendTheme({
	config,
	zIndices: {
		default: 1,
		behind: '-1000',
	},
	colors: {
		gray: {
			'700': '#2c2f36',
		},
	},
	fonts: {
		heading: 'Roboto',
		body: 'Roboto',
		mono: 'Roboto',
	},
});
