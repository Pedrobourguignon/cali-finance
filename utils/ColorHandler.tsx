import React, { ReactNode } from 'react';
import {
	ChakraProvider,
	cookieStorageManagerSSR,
	localStorageManager,
} from '@chakra-ui/react';
import { theme } from 'styles';

const ColorHandler = ({
	cookies,
	children,
}: {
	cookies: string;
	children: ReactNode;
}) => {
	const colorModeManager =
		typeof cookies === 'string'
			? cookieStorageManagerSSR(cookies)
			: localStorageManager;

	return (
		<ChakraProvider resetCSS theme={theme} colorModeManager={colorModeManager}>
			{children}
		</ChakraProvider>
	);
};

// also export a reusable function getServerSideProps
export function getServerSideProps({ req }: any) {
	return {
		props: {
			cookies: req.headers.cookie ?? '',
		},
	};
}

export { ColorHandler };
