// eslint-disable no-useless-concat
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
import { FaDiscord, FaEthereum, FaTwitter } from 'react-icons/fa';
import { usePath, usePicasso } from 'hooks';
import Router, { useRouter } from 'next/router';

import {
	DashboardIcon,
	OrganizationIcon,
	EditProfileIcon,
	HistoryIcon,
	ConnectWalletButton,
	ChangeNetworkButton,
	NetworkModal,
	BnbChainIcon,
	PolygonIcon,
} from 'components';
import { navigationPaths, socialMediaLinks } from 'utils';
import { INetwork } from 'types';

interface IMenuItem {
	icon: typeof Icon;
	route: string;
	option: string;
}

const menuOptions: IMenuItem[] = [
	{
		icon: DashboardIcon,
		route: '/app/dashboard',
		option: 'Dashboard',
	},
	{
		icon: OrganizationIcon,
		route: '/app/organizations',
		option: 'Organizations',
	},
	{
		icon: EditProfileIcon,
		route: '/app/edit-profile',
		option: 'Edit Profile',
	},
	{
		icon: HistoryIcon,
		route: '/app/history',
		option: 'History',
	},
];

const networks: INetwork[] = [
	{
		name: 'Ethereum',
		icon: FaEthereum,
	},
	{
		name: 'Polygon',
		icon: FaEthereum,
	},
	{
		name: 'BNB Chain',
		icon: FaEthereum,
	},
];

export const Sidebar: React.FC = () => {
	const theme = usePicasso();
	const { isSamePath } = usePath();
	const [locale, setLocale] = useState<string | undefined>(useRouter().locale);
	const [asPath, setAsPath] = useState<string | undefined>(useRouter().asPath);
	const [networkData, setNetworkData] = useState<INetwork>({
		name: 'Ethereum',
		icon: FaEthereum,
	} as INetwork);
	const { isOpen, onOpen, onClose } = useDisclosure();

	const changeApplicationLanguage = () => {
		if (locale === 'en') {
			Router.push(`/pt-BR/${asPath}`);
			setLocale('pt-BR');
		} else {
			Router.push(`/en/${asPath}`);
			setLocale('en');
		}
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
				minH="100vh"
				flexDirection="column"
				display={{ base: 'none', md: 'flex' }}
				bg={theme.bg.primary}
				align="center"
				color="white"
				w="220px"
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
					<ConnectWalletButton />
					<ChangeNetworkButton
						onClick={onOpen}
						networkIcon={networkData.icon}
						networkName={networkData.name}
					/>
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
											w="1.5"
											borderRightRadius="sm"
										/>
									)}
									<Flex
										align="center"
										justify="center"
										gap="3"
										fontWeight="normal"
									>
										<Icon
											as={item.icon}
											boxSize="6"
											ml={comparedPath ? '6' : '6'}
										/>
										{item.option}
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
						<Text
							cursor="pointer"
							boxSize="max-content"
							onClick={changeApplicationLanguage}
							fontSize="sm"
							fontWeight="semibold"
							color={locale === 'en' ? theme.branding.blue : 'white'}
						>
							{locale === 'en' ? '[En]' : 'En'}
						</Text>
						<Text
							cursor="pointer"
							boxSize="max-content"
							onClick={changeApplicationLanguage}
							fontSize="sm"
							fontWeight="semibold"
							color={locale === 'pt-BR' ? theme.branding.blue : 'white'}
						>
							{locale === 'pt-BR' ? '[Pt]' : 'Pt'}
						</Text>
					</Flex>
					<Link
						href={navigationPaths.help}
						_hover={{
							textDecoration: 'none',
							opacity: 0.8,
						}}
					>
						Help
					</Link>
					<Link
						href={navigationPaths.docs}
						_hover={{
							textDecoration: 'none',
							opacity: 0.8,
						}}
					>
						Docs
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

export default Sidebar;
