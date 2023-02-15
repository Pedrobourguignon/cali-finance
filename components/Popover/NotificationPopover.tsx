import {
	Popover,
	PopoverTrigger,
	PopoverContent,
	PopoverBody,
	Flex,
	Button,
	Icon,
	Text,
	Img,
	PopoverCloseButton,
} from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import { VscBellDot, VscBell } from 'react-icons/vsc';
import { INotificationPopover } from 'types';

export const NotificationPopover: React.FC<INotificationPopover> = ({
	notificationsList,
	setNotificationsList,
	onClose,
	isOpen,
	onOpen,
}) => {
	const theme = usePicasso();
	const { t: translate } = useTranslation('dashboard');

	const clearAllNotifications = () => {
		setNotificationsList([]);
		onClose();
	};

	return (
		<Popover placement="bottom-end" onClose={onClose} isOpen={isOpen}>
			<PopoverTrigger>
				<Button bg="transparent" onClick={onOpen} h="6" p="0">
					<Icon
						as={notificationsList.length > 0 ? VscBellDot : VscBell}
						boxSize="6"
						color="black"
					/>
				</Button>
			</PopoverTrigger>
			<PopoverContent
				boxShadow="xl"
				borderRadius="base"
				minW={{ md: '14.1rem', lg: '18.8rem', xl: '23.5rem', '2xl': '28.2rem' }}
			>
				<PopoverBody bg="white" borderRadius="base">
					<Flex fontSize="sm" py="3" bg="white">
						<Text
							fontSize="md"
							fontWeight="medium"
							px="1"
							color={theme.text.primary}
						>
							{notificationsList.length} {translate('pendingNotifications')}
						</Text>

						<PopoverCloseButton
							disabled={notificationsList.length <= 0}
							fontSize="sm"
							color={theme.branding.blue}
							_hover={{ color: 'theme.branding.blue', bg: 'none' }}
							_focus={{ color: 'theme.branding.blue', bg: 'none' }}
							w="max-content"
							py="7"
							onClick={() => clearAllNotifications()}
						>
							{translate('clearAll')}
						</PopoverCloseButton>
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
							px: '1',
						}}
					>
						{notificationsList.map((notification, index) => (
							<Flex
								key={+index}
								justify="space-between"
								bg="gray.50"
								color="white"
								borderRadius="base"
								align="center"
								px="3"
							>
								<Flex gap="2" align="center" py="1" w="full">
									<Img src={notification.icon} boxSize="4" />
									<Flex direction="column" justify="center">
										<Text
											color={theme.text.primary}
											fontSize="sm"
											fontWeight="normal"
										>
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
				</PopoverBody>
			</PopoverContent>
		</Popover>
	);
};

export default NotificationPopover;
