import { Flex, Icon, Img, Divider, Button } from '@chakra-ui/react';
import Link from 'next/link';
import { RiTeamLine } from 'react-icons/ri';
import { AiOutlineAppstore } from 'react-icons/ai';
import { IoLogOutOutline } from 'react-icons/io5';
import { BsArrowLeftRight } from 'react-icons/bs';
import { FaDiscord, FaTwitter } from 'react-icons/fa';
import { IconType } from 'react-icons';
import { usePath, usePicasso } from 'hooks';
import { socialMediaLinks } from 'utils';

interface IMenuItem {
	icon: IconType;
	route: string;
}

const menuOptions: IMenuItem[] = [
	{
		icon: AiOutlineAppstore,
		route: '/app',
	},
	{
		icon: RiTeamLine,
		route: '/app/teams',
	},
	{
		icon: BsArrowLeftRight,
		route: '/app/swap',
	},
];

export const Sidebar: React.FC = () => {
	const theme = usePicasso();
	const { isSamePath } = usePath();

	return (
		<Flex
			minH="100vh"
			w="20"
			flexDirection="column"
			justifyContent="space-between"
			alignItems="center"
			display={{ base: 'none', md: 'flex' }}
		>
			<Flex w="full" flexDirection="column">
				<Flex ml="6" mt="8" alignItems="center" position="absolute">
					<Link href="/">
						<Img src="/images/cali-logo.svg" w="16" h="10" cursor="pointer" />
					</Link>
				</Flex>
				<Flex className="menu" flexDirection="column" align="center" ml="6">
					<Flex flexDirection="column" mt="36" gap="8">
						{menuOptions.map((item, index) => {
							const comparedPath = isSamePath(item.route);
							return (
								<Link href={item.route} key={+index}>
									<Button
										bgColor={comparedPath ? 'gray.700' : 'transparent'}
										w="max-content"
										p="2"
										_hover={{
											bgColor: 'gray.600',
											color: 'white',
											boxShadow: comparedPath ? theme.shadow.gray : '',
										}}
										color={comparedPath ? 'white' : 'gray.400'}
										boxShadow={comparedPath ? theme.shadow.gray : ''}
									>
										<Icon as={item.icon} boxSize="5" />
									</Button>
								</Link>
							);
						})}
					</Flex>
					<Flex my="8">
						<Divider orientation="horizontal" w="8" bg="gray.400" />
					</Flex>
					<Flex>
						<Icon as={IoLogOutOutline} boxSize="5" color="gray.400" />
					</Flex>
				</Flex>
			</Flex>

			<Flex flexDirection="column" alignItems="center" ml="6">
				<Link href={socialMediaLinks.discord}>
					<Button
						w="10"
						h="10"
						bg="whiteAlpha.50"
						borderRadius="full"
						justifyContent="center"
						alignItems="center"
						mb="6"
					>
						<Icon as={FaDiscord} boxSize="5" color="gray.400" />
					</Button>
				</Link>
				<Link href={socialMediaLinks.twitter}>
					<Button
						w="10"
						h="10"
						bg="whiteAlpha.50"
						borderRadius="full"
						justifyContent="center"
						alignItems="center"
						mb="6"
					>
						<Icon as={FaTwitter} boxSize="5" color="gray.400" />
					</Button>
				</Link>
			</Flex>
		</Flex>
	);
};

export default Sidebar;
