/* eslint-disable no-param-reassign */
import {
	Button,
	Flex,
	Img,
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	Text,
} from '@chakra-ui/react';
import React from 'react';
import { INotificationModal, INotificationList } from 'types';
import { usePicasso } from 'hooks';

export const NotificationModal: React.FC<INotificationModal> = ({
	notificationsList,
	notificationNumber,
	isOpen,
	onClose,
}) => {
	const theme = usePicasso();
	const clearAllNotifications = (list: INotificationList[]) => {
		list.length = 0;
		onClose();
	};
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalContent
				w="max-content"
				border="1px solid"
				borderColor="black"
				top="24"
				right="12"
			>
				<ModalHeader>
					<Flex justify="space-between" align="center" fontSize="sm">
						<Text fontSize="md" fontWeight="medium" px="1">
							{notificationNumber} pending notifications
						</Text>
						<Button
							disabled={notificationsList.length <= 0}
							fontSize="sm"
							color={theme.branding.blue}
							_hover={{ color: 'theme.branding.blue', bg: 'none' }}
							h="max-content"
							w="max-content"
							px="1"
							bg="none"
							onClick={() => clearAllNotifications(notificationsList)}
						>
							Clear all
						</Button>
					</Flex>
				</ModalHeader>
				<ModalBody>
					<Flex
						h="56"
						direction="column"
						gap="2"
						overflow="auto"
						overflowY="scroll"
						sx={{
							'&::-webkit-scrollbar': {
								width: '2',
								borderRadius: '8px',
								backgroundColor: 'blackAlpha.50',
							},
							'&::-webkit-scrollbar-thumb': {
								backgroundColor: 'blackAlpha.200',
							},
							px: '1',
						}}
					>
						{notificationsList.map((notification, index) => (
							<Flex
								w="full"
								key={+index}
								justify="space-between"
								bg="gray.50"
								color="white"
								borderRadius="base"
								align="center"
								cursor="pointer"
							>
								<Flex gap="2" align="center" px="6" py="1">
									<Img src={notification.icon} boxSize="4" />
									<Flex direction="column" justify="center">
										<Text color="black" fontSize="sm" fontWeight="normal">
											{notification.type}
										</Text>
										<Text color="gray.500" fontSize="xs">
											{notification.date}
										</Text>
									</Flex>
								</Flex>
							</Flex>
						))}
					</Flex>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};

export default NotificationModal;
