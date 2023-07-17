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
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	Icon,
} from '@chakra-ui/react';
import {
	ConnectWalletMobile,
	ChangeNetworkMobile,
	NotificationModalMobile,
} from 'components';
import { usePicasso, useProfile } from 'hooks';
import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';
import { INetwork } from 'types';
import NextLink from 'next/link';
import useTranslation from 'next-translate/useTranslation';
import { getLogo, truncateWallet } from 'utils';
import { useAccount, useDisconnect, useQuery } from 'wagmi';
import { MobileModalLayout } from 'layouts';
import { VscBell, VscBellDot } from 'react-icons/vsc';

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
	const { getProfileData, notificationsList } = useProfile();
	const { address: walletAddress, isConnected } = useAccount();
	const { data: session } = useSession();
	const { disconnect } = useDisconnect();
	const {
		isOpen: isOpenMenu,
		onOpen: onOpenMenu,
		onClose: onCloseMenu,
	} = useDisclosure();
	const {
		isOpen: isOpenNotifications,
		onOpen: onOpenNotifications,
		onClose: onCloseNotifications,
	} = useDisclosure();
	const {
		isOpen: isOpenNetwork,
		onOpen: onOpenNetwork,
		onClose: onCloseNetwork,
	} = useDisclosure();
	const { data: profileData } = useQuery(
		['profile-data'],
		() => getProfileData(walletAddress),
		{
			enabled: !!isConnected && !!session,
		}
	);

	const [networkData, setNetworkData] = useState<INetwork>({
		name: 'Ethereum',
		icon: '/images/bnbchain.png',
	} as INetwork);

	const handleSignOut = () => {
		disconnect();
		signOut();
	};

	const handleSetNetworkData = (icon: string, name: string) => {
		setNetworkData({ name, icon });
		onCloseNetwork();
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
			<MobileModalLayout isOpen={isOpenNetwork} onClose={onCloseNetwork}>
				<Flex
					pb="10"
					direction="column"
					w="full"
					bg={theme.bg.modal}
					borderRadius="2xl"
				>
					<ModalHeader
						display="flex"
						justifyContent="space-between"
						alignItems="center"
					>
						<Text color="black" fontSize="md" fontWeight="500">
							{translate('changeNetwork')}
						</Text>
						<ModalCloseButton
							color="gray.400"
							p="5"
							_hover={{ bg: 'transparent' }}
						/>
					</ModalHeader>
					<ModalBody display="flex" flexDirection="column" gap="2">
						{networks.map((network, index) => (
							<Flex
								key={+index}
								border="1px"
								borderColor="blackAlpha.200"
								borderStyle="solid"
								color={theme.text.mono}
								fontWeight="medium"
								borderRadius="base"
								py="3"
								bg="white"
								align="center"
							>
								<Button
									onClick={() =>
										handleSetNetworkData(network.icon, network.name)
									}
									gap="4"
									boxSize="full"
									justifyContent="left"
									bg="transparent"
								>
									<Img src={network.icon} boxSize="4" color="black" />
									<Text bg="transparent" fontSize="sm">
										{network.name}
									</Text>
								</Button>
							</Flex>
						))}
					</ModalBody>
				</Flex>
			</MobileModalLayout>
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
								minW={{
									base: '9.75rem',
									md: '8.25rem',
									xl: '10.313rem',
									'2xl': '13rem',
								}}
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
					<ConnectWalletMobile />
				)}
				<ChangeNetworkMobile
					onClick={onOpenNetwork}
					networkIcon={networkData.icon}
					networkName={networkData.name}
				/>
				<NotificationModalMobile
					isOpen={isOpenNotifications}
					onClose={onCloseNotifications}
				/>
				<Button
					bg="transparent"
					onClick={onOpenNotifications}
					h="6"
					p="0"
					minW="max-content"
					disabled={!session}
				>
					<Icon
						as={notificationsList.length > 0 ? VscBellDot : VscBell}
						boxSize="6"
						color={{ base: 'white', sm: 'black' }}
					/>
				</Button>
			</Flex>
		</Flex>
	);
};
