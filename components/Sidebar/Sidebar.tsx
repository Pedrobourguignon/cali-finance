import { Button, Flex, Icon, Img, Link } from '@chakra-ui/react';
import React from 'react';
import { FaDiscord, FaTwitter } from 'react-icons/fa';
import { usePath, usePicasso } from 'hooks';
import { ConnectWalletButton } from 'components';

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
		icon: '/icons/work.svg',
		route: '/app/organizations',
		option: 'Organizations',
	},
	{
		icon: '/icons/user.svg',
		route: '/app/teams',
		option: 'Teams',
	},
	{
		icon: '/icons/card.svg',
		route: '/app/funds',
		option: 'Funds',
	},
	{
		icon: '/icons/edit.svg',
		route: '/app/edit-profile',
		option: 'Edit Profile',
	},
	{
		icon: '/icons/folder.svg',
		route: '/app/history',
		option: 'History',
	},
	{
		icon: '/icons/filter.svg',
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
				<Link href="/app/dashboard">
					<ConnectWalletButton />
				</Link>
			</Flex>
			<Flex direction="column" gap="7" w="full">
				{menuOptions.map((item, index) => {
					const comparedPath = isSamePath(item.route);
					return (
						<Link href={item.route} key={+index} display="flex">
							<Button
								w="full"
								p="2"
								gap="3.5"
								justifyContent="flex-start"
								bgColor="transparent"
								fontSize="sm"
								borderRadius="none"
								boxShadow={comparedPath ? theme.branding.blue : ''}
								borderLeft={comparedPath ? 'solid' : ''}
								color={comparedPath ? theme.branding.blue : 'white'}
								_hover={{
									textDecoration: 'none',
								}}
							>
								<Img src={item.icon} color="white" ml="4" />
								{item.option}
								<Flex
									justify="space-between"
									display={comparedPath ? 'flex' : 'none'}
									w="full"
									borderTop="1rem solid transparent"
									borderBottom="1rem solid transparent"
									borderRight="1rem solid"
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
				ml="6"
				mt="20"
				mb="12"
			>
				<Link href="/">Help</Link>
				<Link href="/">Docs</Link>
			</Flex>
			<Flex flexDirection="row" ml="2">
				<Link href="/">
					<Button bg="transparent" borderRadius="full">
						<Icon as={FaDiscord} w="6" h="5" color={theme.branding.blue} />
					</Button>
				</Link>
				<Link href="/">
					<Button bg="transparent" borderRadius="full">
						<Icon as={FaTwitter} w="6" h="5" color={theme.branding.blue} />
					</Button>
				</Link>
			</Flex>
		</Flex>
	);
};

export default Sidebar;
