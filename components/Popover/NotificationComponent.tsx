import { Flex, Img, Text } from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import { INotificationList } from 'types';
import { dateHandler, notificationsData } from 'utils';
import { useRouter } from 'next/router';

export const NotificationComponent: React.FC<{
	notification: INotificationList;
}> = ({ notification }) => {
	const theme = usePicasso();
	const { locale } = useRouter();

	return (
		<Flex
			justify="space-between"
			bg="gray.50"
			color="white"
			borderRadius="base"
			align="center"
			px="3"
			py="1"
		>
			<Flex gap="2" align="center" w="full">
				<Img
					src={notificationsData[notification.meta.data.event]?.icon}
					boxSize="4"
					color="black"
				/>
				<Flex direction="column" justify="center">
					<Text
						color={theme.text.primary}
						fontSize="sm"
						fontWeight="normal"
						lineHeight="shorter"
						noOfLines={1}
					>
						{notification.meta.description[locale!]}
					</Text>
					<Text color="gray.500" fontSize="xs">
						{dateHandler(notification.created_at, locale)}
					</Text>
				</Flex>
			</Flex>
		</Flex>
	);
};
