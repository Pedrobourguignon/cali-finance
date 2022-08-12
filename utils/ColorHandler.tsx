// e.g. src/Chakra.js
// a) import `ChakraProvider` component as well as the storageManagers
import React, { ReactNode } from 'react';
import {
	ChakraProvider,
	cookieStorageManager,
	localStorageManager,
} from '@chakra-ui/react';
import { theme } from 'styles';

// TODO Documentation
const ColorHandler = ({
	cookies,
	children,
}: {
	cookies: string;
	children: ReactNode;
}) => {
	const colorModeManager =
		typeof cookies === 'string'
			? cookieStorageManager(cookies)
			: localStorageManager;

	return (
		<ChakraProvider resetCSS theme={theme} colorModeManager={colorModeManager}>
			{children}
		</ChakraProvider>
	);
};

export { ColorHandler };
