/* eslint-disable no-unused-expressions */
import {
	Box,
	Button,
	Flex,
	Icon,
	Img,
	Link,
	Text,
	useDisclosure,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { FaDiscord, FaTwitter } from 'react-icons/fa';
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
} from 'components';
import { navigationPaths, socialMediaLinks } from 'utils';
import { INetwork } from 'types';
import useTranslation from 'next-translate/useTranslation';
import { useSession, signOut } from 'next-auth/react';

interface IMenuItem {
	icon: typeof Icon;
	route: string;
	option: () => void;
}

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
	const { isSamePath } = usePath();
	const { userProfile } = useProfile();
	const { data: session } = useSession();
	const { locale, asPath } = useRouter();
	const languages: ILanguage[] = ['en-US', 'pt-BR'];
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [networkData, setNetworkData] = useState<INetwork>({
		name: 'Ethereum',
		icon: '/images/eth.png',
	} as INetwork);


	useEffect(() => {
		if (!localStorage.getItem('language')) {
			locale && localStorage.setItem('language', locale);
		}
	}, []);

	const changeLanguage = (lang: string) => {
  	const changeLanguage = (lang: ILanguage) => {
		router.push(`/${asPath}`, `/${asPath}`, { locale: lang });
		localStorage.setItem('language', lang);
	};

	useEffect(() => {
		changeLanguage(localStorage.getItem('language')!);
	}, [locale]);

	return (
		<>
			<NetworkModal
				networks={networks}
				isOpen={isOpen}
				onClose={onClose}
				setNetworkData={setNetworkData}
			/>
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
					<Flex
						justify="center"
						pt="3"
						direction="column"
						align="center"
						pb="2"
					>
						<Link href={navigationPaths.dashboard.home} pb="6">
							<Img src="/images/cali-logo.svg" h="8" w="20" cursor="pointer" />
						</Link>
						{!session && <ConnectWalletButton />}
						<Flex direction="column" gap="2">
							<Flex
								h="max-content"
								py="1"
								justify="center"
								fontSize="sm"
								color={theme.text.primary}
								borderRadius="base"
								bg="white"
								onClick={() => signOut()}
								_hover={{ background: 'white' }}
								_focus={{ background: 'white' }}
								display={session ? 'flex' : 'none'}
								w={{ md: '8.25rem', xl: '10.313rem', '2xl': '52' }}
							>
								<Flex
									align="center"
									gap="2"
									w={{ md: '8rem', xl: '9rem' }}
									justify="center"
								>
									<Img
										src={
											userProfile.picture === ''
												? '/images/editImage.png'
												: userProfile.picture
										}
										borderRadius="full"
										boxSize="6"
										objectFit="cover"
									/>
									<Text fontWeight="medium" fontSize={{ md: 'xs', xl: 'sm' }}>
										{userProfile?.wallet}
									</Text>
								</Flex>
							</Flex>

							{session && (
								<ChangeNetworkButton
									onClick={onOpen}
									networkIcon={networkData.icon}
									networkName={networkData.name}
								/>
							)}
						</Flex>
					</Flex>
					<Flex
						direction="column"
						gap="3"
						w="full"
						pb="6.4rem"
						pt={!session ? '16' : '6'}
					>
						{menuOptions.map((item, index) => {
							const comparedPath = isSamePath(item.route);
							return (
								<Link
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
						<Link
							fontSize="sm"
							href={navigationPaths.help}
							_hover={{
								textDecoration: 'none',
								opacity: 0.8,
							}}
							pl={{ md: '4', lg: '2', xl: '2' }}
						>
							{translate('help')}
						</Link>
						<Link
							fontSize="sm"
							href={navigationPaths.docs}
							_hover={{
								textDecoration: 'none',
								opacity: 0.8,
							}}
							pl={{ md: '4', lg: '2', xl: '2' }}
						>
							{translate('docs')}
						</Link>
						<Flex
							flexDirection="row"
							w="full"
							alignItems="flex-start"
							pl={{ md: '2', lg: '0' }}
							pt="5"
						>
							<Link href={socialMediaLinks.discord} isExternal>
								<Button bg="transparent" borderRadius="full" p="0">
									<Icon
										as={FaDiscord}
										boxSize="6"
										color={theme.branding.blue}
									/>
								</Button>
							</Link>
							<Link href={socialMediaLinks.twitter} isExternal>
								<Button bg="transparent" borderRadius="full">
									<Icon
										as={FaTwitter}
										boxSize="6"
										color={theme.branding.blue}
									/>
								</Button>
							</Link>
						</Flex>
					</Flex>
				</Flex>
			</Flex>
		</>
	);
};
