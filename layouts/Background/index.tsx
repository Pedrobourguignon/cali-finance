import { Flex } from '@chakra-ui/react';
import { Header } from 'components';
import { usePicasso } from 'hooks';

interface IBackground {
	children: React.ReactNode;
}

export const LandingBackground: React.FC<IBackground> = ({ children }) => {
	const theme = usePicasso();
	return (
		<Flex direction="column" w="full" background={theme.bg.gradient}>
			<Header />
			{children}
		</Flex>
	);
};
