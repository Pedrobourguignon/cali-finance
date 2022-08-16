import { Button, Icon } from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import { IoLogOutOutline } from 'react-icons/io5';

export const LogoutButton = () => {
	const theme = usePicasso();
	return (
		<Button bgColor="transparent" gap="4" fontWeight="400">
			Logout
			<Icon
				as={IoLogOutOutline}
				p="2"
				w="max-content"
				h="max-content"
				bgColor={theme.bg.primary}
				borderRadius="full"
			/>
		</Button>
	);
};
