import {
	Flex,
	Img,
	useDisclosure,
	Link,
	MenuItem,
	Menu,
	MenuButton,
	Button,
	Text,
	MenuList,
} from '@chakra-ui/react';
import {
	ConnectWalletButton,
	NotificationPopover,
	NetworkModal,
	ChangeNetworkMobile,
} from 'components';
import { usePicasso, useProfile } from 'hooks';
import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';
import { INetwork, INotificationList } from 'types';
import NextLink from 'next/link';
import useTranslation from 'next-translate/useTranslation';
import { getLogo, truncateWallet } from 'utils';
import { useAccount, useDisconnect, useQuery } from 'wagmi';
import { useRouter } from 'next/router';

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
	const { t: translate } = useTranslation('sidebar');
	const { getProfileData } = useProfile();
	const { address: walletAddress } = useAccount();
	const { data: session } = useSession();
	const { disconnect } = useDisconnect();
	const { onClose, isOpen, onOpen } = useDisclosure();
	const {
		onClose: onCloseNetwork,
		isOpen: isOpenNetwork,
		onOpen: onOpenNetwork,
	} = useDisclosure();
	const {
		isOpen: isOpenMenu,
		onOpen: onOpenMenu,
		onClose: onCloseMenu,
	} = useDisclosure();
	const { data: profileData } = useQuery(['profile-data'], getProfileData);

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

	const handleSignOut = () => {
		disconnect();
		signOut();
	};
	return (
		<Flex
			bg="transparent"
			direction="row"
			h="20"
			w="100%"
			align="center"
			justify="space-between"
			p="4"
			gap="12"
		>
			<NetworkModal
				networks={networks}
				isOpen={isOpenNetwork}
				onClose={onCloseNetwork}
				setNetworkData={setNetworkData}
			/>
			<Flex>
				<Link href="/dashboard" as={NextLink} w="10">
					<Img src="/images/cali-logo-mobile.png" h="6" />
				</Link>
			</Flex>
			<Flex w="full" justify="space-between" align="center">
				{session ? (
					<Flex direction="column" gap="2">
						<Menu
							gutter={0}
							autoSelect={false}
							isOpen={isOpenMenu}
							onClose={onCloseMenu}
							placement="bottom"
						>
							<MenuButton
								h="max-content"
								borderBottomRadius={isOpenMenu ? 'none' : 'base'}
								borderRadius="base"
								w={{
									base: '9.75rem',
									md: '8.25rem',
									xl: '10.313rem',
									'2xl': '13rem',
								}}
								justifyItems="center"
								py="1"
								px="3"
								fontWeight="normal"
								fontSize={{ md: 'sm', '2xl': 'md' }}
								color={theme.text.primary}
								as={Button}
								bg="white"
								disabled={!session}
								onClick={onOpenMenu}
								_hover={{}}
								_active={{}}
								_focus={{}}
							>
								<Flex align="center" gap="2" justify="center">
									<Img
										src={
											!profileData?.picture
												? '/images/editImage.png'
												: getLogo(profileData?.picture)
										}
										borderRadius="full"
										boxSize="6"
										objectFit="cover"
									/>
									<Text fontWeight="medium" fontSize="sm">
										{truncateWallet(walletAddress)}
									</Text>
								</Flex>
							</MenuButton>
							<MenuList
								p="0"
								borderTopRadius="none"
								borderColor="white"
								borderTopColor="black"
								minW={{ md: '8.25rem', xl: '10.313rem', '2xl': '13rem' }}
							>
								<MenuItem
									py="2.5"
									bg="white"
									justifyContent="center"
									color={theme.text.primary}
									_hover={{ opacity: '80%' }}
									fontSize="sm"
									borderBottomRadius="base"
									_active={{}}
									onClick={handleSignOut}
									_focus={{}}
								>
									{translate('logOut')}
								</MenuItem>
							</MenuList>
						</Menu>
					</Flex>
				) : (
					<ConnectWalletButton />
				)}
				<ChangeNetworkMobile
					onClick={onOpenNetwork}
					networkIcon={networkData.icon}
					networkName={networkData.name}
				/>

				<NotificationPopover
					setNotificationsList={setNotificationsList}
					onClose={onClose}
					isOpen={isOpen}
					onOpen={onOpen}
					notificationsList={notificationsList}
				/>
			</Flex>
		</Flex>
	);
};
