import { Flex } from '@chakra-ui/react';
import { usePicasso } from 'hooks';

interface ILanding {
	children: React.ReactNode;
}

export const LandingPage: React.FC<ILanding> = ({ children }) => {
	const theme = usePicasso();
	return (
		<Flex minH="100vh" direction="column" maxW="100%" position="relative">
			{children}
		</Flex>
	);
};
