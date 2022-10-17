import { Box, Button, Flex, Icon, Img, Link } from '@chakra-ui/react';
import React from 'react';
import { FaDiscord, FaTwitter } from 'react-icons/fa';
import { usePath, usePicasso } from 'hooks';
import useTranslation from 'next-translate/useTranslation';

import {
	TeamsIcon,
	FundsIcon,
	DashboardIcon,
	OrganizationIcon,
	EditProfileIcon,
	HistoryIcon,
	CustomizeIcon,
	ConnectWalletButton,
} from 'components';
import { socialMediaLinks } from 'utils';

interface IMenuItem {
	icon: typeof Icon;
	route: string;
	option: () => void;
}

export const Sidebar: React.FC = () => {
	const { t: translate } = useTranslation('sidebar');
	const menuOptions: IMenuItem[] = [
		{
			icon: DashboardIcon,
			route: '/app/dashboard',
			option: translate('dashboard'),
		},
		{
			icon: OrganizationIcon,
			route: '/app/organizations',
			option: translate('organizations'),
		},
		{
			icon: TeamsIcon,
			route: '/app/teams',
			option: translate('teams'),
		},
		{
			icon: FundsIcon,
			route: '/app/funds',
			option: translate('funds'),
		},
		{
			icon: EditProfileIcon,
			route: '/app/edit-profile',
			option: translate('editProfile'),
		},
		{
			icon: HistoryIcon,
			route: '/app/history',
			option: translate('history'),
		},
		{
			icon: CustomizeIcon,
			route: '/app/customize',
			option: translate('customize'),
		},
	];
	const theme = usePicasso();
	const { isSamePath } = usePath();
	return (
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
				<Link href="/">
					<Img src="/images/cali-logo.svg" h="8" w="20" cursor="pointer" />
				</Link>
				<ConnectWalletButton />
			</Flex>
			<Flex direction="column" gap="7" w="full">
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
										w="4px"
										borderRightRadius="sm"
									/>
								)}
								<Flex
									align="center"
									justify="center"
									gap="3"
									position="fixed"
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
				<Link
					href="/"
					_hover={{
						textDecoration: 'none',
						opacity: 0.8,
					}}
				>
					{translate('help')}
				</Link>
				<Link
					href="/"
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
	);
};

export default Sidebar;
