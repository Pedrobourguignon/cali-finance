import { Flex, Icon, Text } from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import { IDisplayedNotifications } from 'types';

export const DisplayedNotificationsMobile: React.FC<
	IDisplayedNotifications
> = ({ filteredNotifications, pagesVisited, notificationPerPage }) => {
	const { t: translate } = useTranslation('history-page');
	const theme = usePicasso();

	const displayNotifications = filteredNotifications.slice(
		pagesVisited,
		pagesVisited + notificationPerPage
	);

	return (
		<Flex direction="column" gap="2">
			{displayNotifications.map((notification, index) => (
				<Flex
					direction="column"
					key={+index}
					bg="white"
					px="3"
					py="2"
					h="5rem"
					borderRadius="base"
					align="center"
					justify="space-between"
					gap={{ md: '0', lg: '7' }}
				>
					<Flex justify="space-between" w="full">
						<Flex align="center" gap="3">
							<Icon as={notification.companyIcon} boxSize="4" />
							<Text
								fontSize="xs"
								fontWeight="semibold"
								color={theme.text.primary}
								whiteSpace="nowrap"
							>
								{notification.company}
							</Text>
						</Flex>
						<Flex align="center" gap="3" bg="black" px="2" borderRadius="full">
							<Text fontSize="2xs" color={theme.text.white}>
								{notification.userWalletAddress}
							</Text>
						</Flex>
					</Flex>
					<Flex w="full" justify="space-between">
						<Flex align="center" gap="3">
							<Icon
								as={notification.typeIcon}
								boxSize="4"
								color={theme.text.primary}
							/>
							<Flex direction="column">
								<Text fontSize="xs" color={theme.text.primary}>
									{translate(notification.type.toLowerCase())}
								</Text>
								<Text fontSize="xs" color="gray.500" whiteSpace="nowrap">
									{notification.date}
								</Text>
							</Flex>
						</Flex>
						<Flex direction="column" align="end" h="max-content">
							<Text
								color={theme.text.primary}
								fontSize="xs"
								whiteSpace="nowrap"
							>
								{notification.value}
							</Text>
							<Text
								color={
									notification.status === 'Completed'
										? 'green.400'
										: 'yellow.600'
								}
								fontSize="xs"
							>
								{translate(notification.status.toLowerCase())}
							</Text>
						</Flex>
					</Flex>
				</Flex>
			))}
		</Flex>
	);
};

export default DisplayedNotificationsMobile;
