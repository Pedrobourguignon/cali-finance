import { Button, Flex, Icon, Img, Link } from '@chakra-ui/react';
import React from 'react';
import { FaDiscord, FaTwitter } from 'react-icons/fa';
import { usePath, usePicasso } from 'hooks';

interface IMenuItem {
	icon: string;
	route: string;
	option: string;
}

const menuOptions: IMenuItem[] = [
	{
		icon: '/icons/category.svg',
		route: '/app/dashboard',
		option: 'Dashboard',
	},
	{
		icon: '/icons/category.svg',
		route: '/app/organizations',
		option: 'Organizations',
	},
	{
		icon: '/icons/category.svg',
		route: '/app/teams',
		option: 'Teams',
	},
	{
		icon: '/icons/category.svg',
		route: '/app/funds',
		option: 'Funds',
	},
	{
		icon: '/icons/category.svg',
		route: '/app/edit-profile',
		option: 'Edit Profile',
	},
	{
		icon: '/icons/category.svg',
		route: '/app/history',
		option: 'History',
	},
	{
		icon: '/icons/category.svg',
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
			w="56"
			flexDirection="column"
			display={{ base: 'none', md: 'flex' }}
			bg="black"
			align="flex-start"
			color="white"
		>
			<Flex
				w="full"
				justify="center"
				mt="10"
				mb="12"
				direction="column"
				align="center"
				gap="6"
			>
				<Link href="/">
					<Img src="/images/cali-logo.svg" boxSize="20" cursor="pointer" />
				</Link>
				<Link href="/">
					<Flex
						position="relative"
						display=" block"
						p="4"
						border=" 2px solid white"
						borderRadius="base"
						w="40"
					>
						<Button
							w="40"
							h="8"
							fontSize="sm"
							color="black"
							borderRadius="base"
							display=" block"
							borderWidth="0 2.5"
							m="-22px 0px -10px -22px"
							bg="white"
							_hover={{ bg: 'white' }}
						>
							Connect Wallet
						</Button>
					</Flex>
				</Link>
			</Flex>
			<Flex direction="column" gap="7" ml="4" w="full">
				{menuOptions.map((item, index) => {
					const comparedPath = isSamePath(item.route);
					return (
						<Link href={item.route} key={+index}>
							<Button
								w="max-content"
								p="2"
								gap="3.5"
								bgColor="transparent"
								fontSize="sm"
								boxShadow={comparedPath ? theme.branding.blue : ''}
								color={comparedPath ? theme.branding.blue : 'white'}
								_hover={{
									textDecoration: 'none',
								}}
								borderLeft={comparedPath ? 'solid' : ''}
								borderRadius="none"
							>
								<Img src={item.icon} w="6" h="6" />
								{item.option}
							</Button>
						</Link>
					);
				})}
			</Flex>
			<Flex
				direction="column"
				align="flex-start"
				gap="3"
				ml="10"
				mt="20"
				mb="12"
			>
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
