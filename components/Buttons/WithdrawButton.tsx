import { Button, Text } from '@chakra-ui/react';
import { usePicasso } from 'hooks';

export const WithdrawButton = () => {
	const theme = usePicasso();
	return (
		<Button w="100%" bg={theme.bg.primary} _hover={{}}>
			<Text fontSize="sm">Withdraw</Text>
		</Button>
	);
};
