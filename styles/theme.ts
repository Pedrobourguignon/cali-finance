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
		ultrahide: '-100',
		behind: '-1000',
	},
	colors: {},
	fonts: {
		heading: 'Inter',
		body: 'Inter',
		mono: 'Inter',
	},
});
