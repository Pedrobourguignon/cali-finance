import { Button, Flex, Img } from '@chakra-ui/react';
import { usePicasso } from 'hooks';

export const LandingHeader: React.FC = () => {
	const theme = usePicasso();
	return (
		<Flex
			h="20"
			w="100%"
			justify={{ base: 'center', md: 'space-between' }}
			align="center"
			bg={theme.text.black}
			px="6"
			position="absolute"
		>
			<Img minH="10" src="/images/cali-logo-with-text.svg" />
			<Button
				_hover={{ bg: 'white' }}
				_focus={{ border: '2px solid white', color: 'white' }}
				display={{ base: 'none', md: 'flex' }}
				borderRadius="none"
				bg="white"
				color={theme.text.black}
				px="12"
				py="3"
				fontSize="md"
				fontWeight="normal"
			>
				Launch App
			</Button>
		</Flex>
	);
};
