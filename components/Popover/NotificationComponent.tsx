import { Flex, Img, Text } from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import { INotificationList } from 'types';
import { dateHandler } from 'utils';
import { useRouter } from 'next/router';

export const NotificationComponent: React.FC<{
	notification: INotificationList;
}> = ({ notification }) => {
	const theme = usePicasso();
	const { locale } = useRouter();

	console.log(notification.meta.description.enDescription);

	const handleNotifications = () => {
		if (notification.event.description === 'Added team member')
			return {
				icon: '/icons/add-user.svg',
				text: notification.meta.description.enDescription,
			};
		if (notification.event.description === 'Created company')
			return {
				icon: '/icons/companies.svg',
				text: notification.meta.description.enDescription,
			};
		return null;
	};

	return (
		<Flex
			justify="space-between"
			bg="gray.50"
			color="white"
			borderRadius="base"
			align="center"
			px="3"
			h="12"
		>
			<Flex gap="2" align="center" py="1" w="full">
				<Img src={handleNotifications()?.icon} boxSize="4" color="black" />
				<Flex direction="column" justify="center">
					<Text
						color={theme.text.primary}
						fontSize="sm"
						fontWeight="normal"
						lineHeight="shorter"
					>
						{handleNotifications()?.text}
					</Text>
					<Text color="gray.500" fontSize="xs">
						{dateHandler(notification.created_at, locale)}
					</Text>
				</Flex>
			</Flex>
		</Flex>
	);
};
