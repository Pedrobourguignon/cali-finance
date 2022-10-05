/* eslint-disable no-param-reassign */
import { Button, Icon, useDisclosure } from '@chakra-ui/react';
import { NotificationModal } from 'components';
import { VscBell, VscBellDot } from 'react-icons/vsc';
import { INotificationList } from 'types';

const notificationsList: INotificationList[] = [
	{
		type: 'You made a deposit of $23,456.02',
		date: '08 Aug 22, 20:57',
		icon: '/icons/deposit.svg',
	},
	{
		type: 'You created Kylie Cosmetics',
		date: '08 Aug 22, 20:57',
		icon: '/icons/deposit.svg',
	},
	{
		type: '0x6856...BF99 added to Kylie Baby',
		date: '08 Aug 22, 20:57',
		icon: '/icons/deposit.svg',
	},
	{
		type: 'Marketing Team created Kylie Skin',
		date: '08 Aug 22, 20:57',
		icon: '/icons/deposit.svg',
	},
	{
		type: 'Marketing Team created Kylie Skin',
		date: '08 Aug 22, 20:57',
		icon: '/icons/deposit.svg',
	},
	{
		type: 'Marketing Team created Kylie Skin',
		date: '08 Aug 22, 20:57',
		icon: '/icons/deposit.svg',
	},
	{
		type: 'Marketing Team created Kylie Skin',
		date: '08 Aug 22, 20:57',
		icon: '/icons/deposit.svg',
	},
];

export const NotificationButton: React.FC = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<Button borderRadius="30" bg="transparent" mt="4" onClick={onOpen}>
			<NotificationModal
				notificationsList={notificationsList}
				notificationNumber={notificationsList.length}
				isOpen={isOpen}
				onClose={onClose}
			/>
			<Icon
				as={notificationsList.length > 0 ? VscBellDot : VscBell}
				boxSize="6"
				color="black"
			/>
		</Button>
	);
};

export default NotificationButton;
