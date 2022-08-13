import { extendTheme, ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
	initialColorMode: 'dark',
	useSystemColorMode: false,
};

export const theme = extendTheme({
	config,
	components: {
		Button: {
			defaultProps: {
				variant: 'solid',
			},
			variants: {
				solid: {
					_hover: {
						opacity: 0.75,
						background: 'unset',
					},
					_active: {
						opacity: 0.7,
						background: 'unset',
					},
					_focus: {
						opacity: 0.6,
						background: 'unset',
					},
				},
			},
		},
	},
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
