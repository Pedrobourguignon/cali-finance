import { Flex, Img, ModalCloseButton, Text } from '@chakra-ui/react';
import { usePicasso, useProfile } from 'hooks';
import { MobileModalLayout } from 'layouts';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import React from 'react';
import { INotificationPopover } from 'types';
import { dateHandler, getNotificationsData } from 'utils';

export const NotificationModalMobile: React.FC<INotificationPopover> = ({
	onClose,
	isOpen,
}) => {
	const theme = usePicasso();
	const { t: translate } = useTranslation('dashboard');
	const { notificationsList } = useProfile();
	const { locale } = useRouter();
	return (
		<MobileModalLayout isOpen={isOpen} onClose={onClose}>
			<Flex
				fontSize="sm"
				pt="6"
				px="7"
				bg="white"
				borderTopRadius="2xl"
				direction="column"
			>
				<Flex align="center">
					<Text
						fontSize="md"
						fontWeight="medium"
						px="2"
						pb="5"
						color={theme.text.primary}
					>
						{notificationsList.length} {translate('pendingNotifications')}
					</Text>
					<ModalCloseButton
						color="gray.400"
						_hover={{ bg: 'transparent' }}
						p="0"
						pr="6"
						pt="5"
					/>
				</Flex>
				<Flex
					h="56"
					direction="column"
					gap="2"
					overflow="auto"
					overflowY="scroll"
					sx={{
						'&::-webkit-scrollbar': {
							width: '2',
							borderRadius: 'base',
							backgroundColor: 'blackAlpha.50',
						},
						'&::-webkit-scrollbar-thumb': {
							backgroundColor: 'blackAlpha.200',
							borderRadius: 'base',
						},
						px: '2',
					}}
				>
					{notificationsList.map((notification, index) => (
						<Flex
							key={+index}
							justify="space-between"
							bg="gray.100"
							color="white"
							borderRadius="base"
							align="center"
							px="3"
						>
							<Flex gap="2" align="center" py="1" w="full">
								<Img
									src={getNotificationsData(notification.meta.data.event)?.icon}
									boxSize="4"
								/>
								<Flex direction="column" justify="center">
									<Text
										color={theme.text.primary}
										fontSize="sm"
										fontWeight="normal"
									>
										{locale && notification.meta.description[locale]}
									</Text>
									<Text color="gray.500" fontSize="xs">
										{locale && dateHandler(notification.created_at, locale)}
									</Text>
								</Flex>
							</Flex>
						</Flex>
					))}
				</Flex>
			</Flex>
		</MobileModalLayout>
	);
};

export default NotificationModalMobile;
