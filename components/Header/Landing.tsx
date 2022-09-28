import { Button, Flex, Img } from '@chakra-ui/react';
import { usePicasso } from 'hooks';

export const LandingHeader: React.FC = () => {
	const theme = usePicasso();
	return (
		<Flex
			minH="20"
			justify="space-between"
			align="center"
			bg={theme.bg.landing}
			px="6"
		>
			<Img src="/images/cali-logo-with-text.svg" />
			<Button
				borderRadius="none"
				bg="white"
				color={theme.text.black}
				h="10"
				w="48"
				fontSize="md"
				fontWeight="normal"
			>
				Launch App
			</Button>
		</Flex>
	);
};
