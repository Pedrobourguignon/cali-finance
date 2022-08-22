import { Button, Icon } from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import { IoNotificationsOutline } from 'react-icons/io5';

export const NotificationButton = () => {
	const theme = usePicasso();
	return (
		<Button bgColor="transparent" gap="4" fontWeight="400">
			<Icon
				as={IoNotificationsOutline}
				p="2"
				w="max-content"
				h="max-content"
				bgColor={theme.bg.primary}
				borderRadius="full"
			/>
			Notification
		</Button>
	);
};
