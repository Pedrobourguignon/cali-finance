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
import Router, { useRouter } from 'next/router';
import {
	DashboardIcon,
	OrganizationIcon,
	EditProfileIcon,
	HistoryIcon,
	ConnectWalletButton,
	ChangeNetworkButton,
	NetworkModal,
} from 'components';
import { navigationPaths, socialMediaLinks } from 'utils';
import { INetwork } from 'types';
import useTranslation from 'next-translate/useTranslation';

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
			icon: OrganizationIcon,
			route: navigationPaths.dashboard.organizations.home,
			option: translate('organizations'),
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
	const walletAddress = '0x6856...BF99';
	const { userProfile, isConnected } = useProfile();
	const { locale, pathname } = useRouter();
	const languages: ILanguage[] = ['en-US', 'pt-BR'];
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [networkData, setNetworkData] = useState<INetwork>({
		name: 'Ethereum',
		icon: '/images/eth.png',
	} as INetwork);

	const changeLanguage = (lang: ILanguage) => {
		Router.push(`/${pathname}`, `/${pathname}`, { locale: lang });
	};

	return (
		<>
			<NetworkModal
				networks={networks}
				isOpen={isOpen}
				onClose={onClose}
				setNetworkData={setNetworkData}
			/>
			<Flex
				flexDirection="column"
				display={{ base: 'none', sm: 'flex' }}
				bg={theme.bg.primary}
				align="center"
				color="white"
				w="13.75rem"
				h="100%"
			>
				<Flex
					justify="center"
					py="10"
					direction="column"
					align="center"
					gap="6"
					px="8"
				>
					<Link href={navigationPaths.dashboard.home}>
						<Img src="/images/cali-logo.svg" h="8" w="20" cursor="pointer" />
					</Link>
					{isConnected === true ? '' : <ConnectWalletButton />}
					<Flex
						h="max-content"
						py="2"
						fontSize="sm"
						color="black"
						borderRadius="base"
						bg="white"
						_hover={{ background: 'white' }}
						_focus={{ background: 'white' }}
						display={isConnected === true ? 'flex' : 'none'}
					>
						<Flex align="center" gap="2" px="4">
							<Img
								src={userProfile?.picture}
								borderRadius="full"
								boxSize="6"
								objectFit="cover"
							/>
							<Text fontWeight="500" fontSize="sm">
								{walletAddress}
							</Text>
						</Flex>
					</Flex>

					{isConnected === true ? (
						<ChangeNetworkButton
							onClick={onOpen}
							networkIcon={networkData.icon}
							networkName={networkData.name}
						/>
					) : (
						''
					)}
				</Flex>
				<Flex direction="column" gap="7" w="full" pb="36">
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
											bgColor={theme.branding.blue}
											h="full"
											w="2"
											borderLeftRadius="none"
											borderRightRadius="sm"
										/>
									)}
									<Flex
										align="center"
										justify="center"
										gap="3"
										fontWeight="normal"
									>
										<>
											<Icon as={item.icon} boxSize="6" ml="6" />
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
					px="7"
					py="10"
					w="full"
				>
					<Flex gap="4">
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
						href={navigationPaths.help}
						_hover={{
							textDecoration: 'none',
							opacity: 0.8,
						}}
					>
						{translate('help')}
					</Link>
					<Link
						href={navigationPaths.docs}
						_hover={{
							textDecoration: 'none',
							opacity: 0.8,
						}}
					>
						{translate('docs')}
					</Link>
				</Flex>

				<Flex flexDirection="row" px="2" w="full" alignItems="flex-start">
					<Link href={socialMediaLinks.discord} isExternal>
						<Button bg="transparent" borderRadius="full">
							<Icon as={FaDiscord} boxSize="6" color={theme.branding.blue} />
						</Button>
					</Link>
					<Link href={socialMediaLinks.twitter} isExternal>
						<Button bg="transparent" borderRadius="full">
							<Icon as={FaTwitter} boxSize="6" color={theme.branding.blue} />
						</Button>
					</Link>
				</Flex>
			</Flex>
		</>
	);
};
