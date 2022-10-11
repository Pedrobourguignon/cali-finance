import { Button, Flex, Icon, Img, Link } from '@chakra-ui/react';
import React from 'react';
import { FaDiscord, FaTwitter, FaEdit } from 'react-icons/fa';
import { usePath, usePicasso } from 'hooks';
import { ConnectWalletButton } from 'components/Buttons';
import { IconType } from 'react-icons';
import { MdWorkOutline } from 'react-icons/md';
import { CgFolderRemove } from 'react-icons/cg';
import { GiSettingsKnobs } from 'react-icons/gi';
import { HiOutlineCreditCard } from 'react-icons/hi';

import { RiTeamLine, RiDashboardLine } from 'react-icons/ri';

interface IMenuItem {
	icon: IconType;
	route: string;
	option: string;
}

const menuOptions: IMenuItem[] = [
	{
		icon: RiDashboardLine,
		route: '/app/dashboard',
		option: 'Dashboard',
	},
	{
		icon: MdWorkOutline,
		route: '/app/organizations',
		option: 'Organizations',
	},
	{
		icon: RiTeamLine,
		route: '/app/teams',
		option: 'Teams',
	},
	{
		icon: HiOutlineCreditCard,
		route: '/app/funds',
		option: 'Funds',
	},
	{
		icon: FaEdit,
		route: '/app/edit-profile',
		option: 'Edit Profile',
	},
	{
		icon: CgFolderRemove,
		route: '/app/history',
		option: 'History',
	},
	{
		icon: GiSettingsKnobs,
		route: '/app/customize',
		option: 'Customize',
	},
];

export const Sidebar: React.FC = () => {
	const theme = usePicasso();
	const { isSamePath } = usePath();
	return (
		<Flex
			minH="100vh"
			flexDirection="column"
			display={{ base: 'none', md: 'flex' }}
			bg={theme.bg.primary}
			align="flex-start"
			color="white"
		>
			<Flex
				w="full"
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
								p="2"
								gap="3.5"
								bgColor="transparent"
								fontSize="sm"
								borderRadius="none"
								boxShadow={comparedPath ? theme.branding.blue : 'none'}
								borderLeft={comparedPath ? 'solid' : 'none'}
								color={comparedPath ? theme.branding.blue : 'white'}
							>
								<Icon as={item.icon} boxSize="6" ml="2" />
								{item.option}
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
			<Flex direction="column" align="flex-start" gap="3" px="4" py="10">
				<Link
					href="/"
					_hover={{
						textDecoration: 'none',
						opacity: 0.8,
					}}
				>
					Help
				</Link>
				<Link
					href="/"
					_hover={{
						textDecoration: 'none',
						opacity: 0.8,
					}}
				>
					Docs
				</Link>
			</Flex>
			<Flex flexDirection="row">
				<Link href="/">
					<Button bg="transparent" borderRadius="full">
						<Icon as={FaDiscord} boxSize="6" color={theme.branding.blue} />
					</Button>
				</Link>
				<Link href="/">
					<Button bg="transparent" borderRadius="full">
						<Icon as={FaTwitter} boxSize="6" color={theme.branding.blue} />
					</Button>
				</Link>
			</Flex>
		</Flex>
	);
};

export default Sidebar;
