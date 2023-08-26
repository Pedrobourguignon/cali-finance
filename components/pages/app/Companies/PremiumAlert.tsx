import { Flex, Text } from '@chakra-ui/react';
import { usePicasso } from 'hooks';

export const Premium = () => {
	const theme = usePicasso();
	const walletConnected = true;
	return (
		<Flex>
			<Flex bg={theme.branding.blue2} borderRadius="xl" px="3.5">
				<Text fontSize="xs">{walletConnected ? 'Premium' : 'Free'}</Text>
			</Flex>
		</Flex>
	);
};
