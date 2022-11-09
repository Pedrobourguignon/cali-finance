import { Flex } from '@chakra-ui/react';

interface ILanding {
	children: React.ReactNode;
}

export const LandingPage: React.FC<ILanding> = ({ children }) => (
	<Flex minH="100vh" direction="column" maxW="100%" position="relative">
		{children}
	</Flex>
);
