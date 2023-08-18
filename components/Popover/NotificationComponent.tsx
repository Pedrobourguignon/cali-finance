import { Flex, Img, Text } from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import { IHistoryNotifications } from 'types';
import { dateHandler, getNotificationsData } from 'utils';
import { useRouter } from 'next/router';

export const NotificationComponent: React.FC<{
	activities: IHistoryNotifications;
}> = ({ activities }) => {
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
				<Flex align="center" gap="2" w="full" justify="space-between">
					<Flex align="center" gap="2">
						<Img
							src={getNotificationsData(activities.meta.data.event).icon}
							boxSize="4"
						/>
						<Flex direction="column">
							<Flex gap="2">
								<Text
									fontSize="sm"
									fontWeight="normal"
									color={theme.text.primary}
								>
									{locale && activities.meta.description[locale]}
								</Text>
							</Flex>

							<Text color="gray.500" fontSize="xs" wordBreak="break-word">
								{locale && dateHandler(activities.created_at, locale)}
							</Text>
						</Flex>
					</Flex>
				</Flex>
			</Flex>
		</Flex>
	);
};
