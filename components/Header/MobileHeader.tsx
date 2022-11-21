import { Flex, Img, useDisclosure } from '@chakra-ui/react';
import {
	ConnectWalletButton,
	NotificationPopover,
	NetworkModal,
	ChangeNetworkButton,
} from 'components';
import { usePicasso } from 'hooks';
import NextLink from 'next/link';
import { useState } from 'react';
import { INetwork, INotificationList } from 'types';

const networks: INetwork[] = [
	{
		name: 'Ethereum',
		icon: '/images/eth.png',
	},
	{
		name: 'Polygon',
		icon: '/images/polygon.png',
	},
	{
		name: 'BNB Chain',
		icon: '/images/bnbchain.png',
	},
];

export const MobileHeader = () => {
	const theme = usePicasso();
	const { onClose, isOpen, onOpen } = useDisclosure();
	const {
		onClose: onCloseNetwork,
		isOpen: isOpenNetwork,
		onOpen: onOpenNetwork,
	} = useDisclosure();

	const [notificationsList, setNotificationsList] = useState<
		INotificationList[]
	>([
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
	]);
	const [networkData, setNetworkData] = useState<INetwork>({
		name: 'Ethereum',
		icon: '/images/bnbchain.png',
	} as INetwork);

	return (
		<Flex
			display={{ base: 'flex', sm: 'none' }}
			direction="row"
			h="20"
			w="100%"
			align="center"
			justify="space-between"
			p="4"
		>
			<NetworkModal
				networks={networks}
				isOpen={isOpenNetwork}
				onClose={onCloseNetwork}
				setNetworkData={setNetworkData}
			/>
			<Flex>
				<NextLink href="/dashboard">
					<Img src="/images/cali-logo-mobile.png" h="6" />
				</NextLink>
			</Flex>
			<ConnectWalletButton />
			<ChangeNetworkButton
				onClick={onOpenNetwork}
				networkIcon={networkData.icon}
				networkName={networkData.name}
			/>

			<NotificationPopover
				setNotificationsList={setNotificationsList}
				onClose={onClose}
				isOpen={isOpen}
				onOpen={onOpen}
				notificationNumber={notificationsList.length}
				notificationsList={notificationsList}
			/>
		</Flex>
	);
};
