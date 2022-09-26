import { Button, Flex, Icon, Img, Link } from '@chakra-ui/react';
import React from 'react';
import { IconType } from 'react-icons';
import { BsArrowLeftRight, BsBriefcase } from 'react-icons/bs';
import { AiOutlineAppstore, AiOutlineCreditCard } from 'react-icons/ai';
import { RiTeamLine } from 'react-icons/ri';
import { FiFolderMinus } from 'react-icons/fi';
import { TiEdit } from 'react-icons/ti';
import { FaDiscord, FaTwitter } from 'react-icons/fa';
import { usePath, usePicasso } from 'hooks';

interface IMenuItem {
	icon: IconType;
	route: string;
	option: string;
}

const menuOptions: IMenuItem[] = [
	{
		icon: AiOutlineAppstore,
		route: '/app',
		option: 'Dashboard',
	},
	{
		icon: BsBriefcase,
		route: '/app/organizations',
		option: 'Organizations',
	},
	{
		icon: RiTeamLine,
		route: '/app/teams',
		option: 'Teams',
	},
	{
		icon: AiOutlineCreditCard,
		route: '/app/funds',
		option: 'Funds',
	},
	{
		icon: TiEdit,
		route: '/app/edit-profile',
		option: 'Edit Profile',
	},
	{
		icon: FiFolderMinus,
		route: '/app/history',
		option: 'History',
	},
	{
		icon: BsArrowLeftRight,
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
			w="60"
			flexDirection="column"
			display={{ base: 'none', md: 'flex' }}
			bg="black"
			align="flex-start"
			color="white"
			gap="6"
		>
			<Flex w="full" justify="center">
				<Link href="/">
					<Img src="/images/cali-logo.svg" w="20" h="20" cursor="pointer" />
				</Link>
			</Flex>
			<Flex w="full" justify="center">
				<Link href="/">
					<Button w="40" h="8" fontSize="sm" color="black">
						Connect Wallet
					</Button>
				</Link>
			</Flex>
			<Flex direction="column" gap="7" ml="8">
				{menuOptions.map((item, index) => {
					const comparedPath = isSamePath(item.route);
					return (
						<Link href={item.route} key={+index}>
							<Button
								bgColor={comparedPath ? 'gray.700' : 'transparent'}
								w="max-content"
								p="2"
								color={comparedPath ? theme.branding.blue : 'white'}
								_hover={{
									textDecoration: 'none',
								}}
								boxShadow={comparedPath ? theme.branding.blue : ''}
								gap="3.5"
								fontSize="sm"
							>
								<Icon as={item.icon} boxSize="6" />
								{item.option}
							</Button>
						</Link>
					);
				})}
			</Flex>
			<Flex direction="column" align="flex-start" gap="3" ml="10">
				<Link href="/">Help</Link>
				<Link href="/">Docs</Link>
			</Flex>
			<Flex flexDirection="row" ml="6">
				<Link href="/">
					<Button bg="whiteAlpha.50" borderRadius="full">
						<Icon as={FaDiscord} w="6" h="5" color={theme.branding.blue} />
					</Button>
				</Link>
				<Link href="/">
					<Button bg="whiteAlpha.50" borderRadius="full">
						<Icon as={FaTwitter} w="6" h="5" color={theme.branding.blue} />
					</Button>
				</Link>
			</Flex>
		</Flex>
	);
};

export default Sidebar;
