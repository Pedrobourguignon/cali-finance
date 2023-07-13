/* eslint-disable no-unused-expressions */
import {
	Box,
	Button,
	Flex,
	Icon,
	Img,
	Link,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Text,
	useDisclosure,
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { usePath, usePicasso, useProfile } from 'hooks';
import router, { useRouter } from 'next/router';
import {
	DashboardIcon,
	CompanyIcon,
	EditProfileIcon,
	HistoryIcon,
	ConnectWalletButton,
	ChangeNetworkButton,
	NetworkModal,
	SocialMediasButtons,
	HelpAndDocsButton,
} from 'components';
import { getLogo, navigationPaths, truncateWallet } from 'utils';
import { INetwork } from 'types';
import useTranslation from 'next-translate/useTranslation';
import { useSession, signOut } from 'next-auth/react';
import NextLink from 'next/link';
import { useQuery } from 'react-query';
import { useAccount, useDisconnect } from 'wagmi';

interface IMenuItem {
	icon: typeof Icon;
	route: string;
	option: () => void;
}

const networks: INetwork[] = [
	// {
	// 	name: 'Ethereum',
	// 	icon: '/images/eth.png',
	// },
	{
		name: 'Polygon',
		icon: '/images/polygon.png',
	},
	// {
	// 	name: 'BNB Chain',
	// 	icon: '/images/bnbchain.png',
	// },
];
type ILanguage = 'pt-BR' | 'en-US';

export const Sidebar: React.FC = () => {
	const { t: translate } = useTranslation('sidebar');
	const menuOptions: IMenuItem[] = [
		{
			icon: DashboardIcon,
			route: navigationPaths.dashboard.home,
			option: translate('dashboard'),
		},
		{
			icon: CompanyIcon,
			route: navigationPaths.dashboard.companies.home,
			option: translate('companies'),
		},

		{
			icon: EditProfileIcon,
			route: navigationPaths.dashboard.editProfile,
			option: translate('editProfile'),
		},
		{
			icon: HistoryIcon,
			route: navigationPaths.dashboard.history,
			option: translate('history'),
		},
	];
	const theme = usePicasso();
	const { includesPath } = usePath();
	const { getProfileData } = useProfile();
	const { address: walletAddress, isConnected } = useAccount();
	const { locale, asPath, pathname } = useRouter();
	const { data: session } = useSession();
	const { disconnect } = useDisconnect();
	const languages: ILanguage[] = ['en-US', 'pt-BR'];
	const { isOpen, onOpen, onClose } = useDisclosure();
	const {
		isOpen: isOpenMenu,
		onOpen: onOpenMenu,
		onClose: onCloseMenu,
	} = useDisclosure();
	const [networkData, setNetworkData] = useState<INetwork>({
		name: 'Polygon',
		icon: '/images/polygon.png',
	} as INetwork);

	useEffect(() => {
		if (!localStorage.getItem('language')) {
			locale && localStorage.setItem('language', locale);
		}
	}, []);

	const changeLanguage = (lang: string) => {
		router.push(`${asPath}`, `${asPath}`, { locale: lang });
		localStorage.setItem('language', lang);
	};

	useEffect(() => {
		if (!pathname.includes('404')) {
			changeLanguage(localStorage.getItem('language')!);
		}
	}, [locale]);

	const { data: profileData } = useQuery(
		'profile-data',
		() => getProfileData(walletAddress),
		{
			enabled: !!isConnected,
		}
	);
	const handleSignOut = () => {
		disconnect();
		signOut();
	};

	return (
		<Flex
			h="100vh"
			flexDirection="column"
			display={{ base: 'none', sm: 'flex' }}
			bg={theme.bg.primary}
			align="center"
			color="white"
			minW={{ md: '44', xl: '13.7rem', '2xl': '16.3rem' }}
		>
			<Flex
				h="100vh"
				flexDirection="column"
				display={{ base: 'none', sm: 'flex' }}
				bg={theme.bg.primary}
				align="center"
				color="white"
				minW={{ md: '44', xl: '13.7rem', '2xl': '16.3rem' }}
				position="fixed"
			>
				<Flex justify="center" pt="3" direction="column" align="center" pb="2">
					<Link as={NextLink} href={navigationPaths.dashboard.home} pb="6">
						<Img src="/images/cali-logo.svg" h="8" w="20" cursor="pointer" />
					</Link>
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
									w={{ md: '8.25rem', xl: '10.313rem', '2xl': '13rem' }}
									justifyItems="center"
									py="1"
									px="3"
									gap="32"
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
										<Text fontWeight="medium" fontSize={{ md: 'xs', xl: 'sm' }}>
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
							{session && (
								<ChangeNetworkButton
									onClick={onOpen}
									networkIcon={networkData.icon}
									networkName={networkData.name}
								/>
							)}
						</Flex>
					) : (
						<ConnectWalletButton />
					)}
				</Flex>
				<Flex
					direction="column"
					gap="3"
					w="full"
					pb="6.4rem"
					pt={session ? '6' : '16'}
				>
					{menuOptions.map((item, index) => {
						const comparedPath = includesPath(item.route);
						return (
							<Link
								as={NextLink}
								href={item.route}
								key={+index}
								display="flex"
								_hover={{
									textDecoration: 'none',
								}}
							>
								<Button
									justifyContent="flex-start"
									alignItems="center"
									w="full"
									p="0"
									bgColor="transparent"
									fontSize="sm"
									borderRadius="none"
									boxShadow={comparedPath ? theme.branding.blue : 'none'}
									color={comparedPath ? theme.branding.blue : 'white'}
								>
									{comparedPath && (
										<Box
											position="absolute"
											bgColor={theme.branding.blue}
											w="1"
											h="8"
											borderLeftRadius="none"
											borderRightRadius="sm"
										/>
									)}
									<Flex
										align="center"
										justify="center"
										gap="3"
										fontWeight="normal"
										fontSize="sm"
									>
										<>
											<Icon
												as={item.icon}
												boxSize={{ md: '5', xl: '6' }}
												ml="6"
											/>
											{item.option}
										</>
									</Flex>
									<Flex
										display={comparedPath ? 'flex' : 'none'}
										w="full"
										borderTop="1rem solid transparent"
										borderBottom="1rem solid transparent"
										borderRight="1.5rem solid"
									/>
								</Button>
							</Link>
						);
					})}
				</Flex>
				<Flex
					direction="column"
					align="flex-start"
					gap="3"
					px={{ md: '2', lg: '4', xl: '5' }}
					py="10"
					w="full"
					position="absolute"
					bottom="0"
				>
					<Flex gap="4" pl={{ md: '4', lg: '2', xl: '2' }}>
						{languages.map((lang, index) => (
							<Text
								key={+index}
								cursor="pointer"
								boxSize="max-content"
								onClick={() => changeLanguage(lang)}
								fontSize="sm"
								fontWeight="semibold"
								color={locale === lang ? theme.branding.blue : 'white'}
							>
								{locale === lang
									? `[${lang.toUpperCase()}]`
									: lang.toUpperCase()}
							</Text>
						))}
					</Flex>
					<HelpAndDocsButton gap="4" />
					<SocialMediasButtons
						pl={{ md: '2', lg: '0' }}
						pt="5"
						align="flex-start"
					/>
				</Flex>
			</Flex>
		</Flex>
	);
};
