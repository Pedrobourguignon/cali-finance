import { Flex, Img, Text, useDisclosure } from '@chakra-ui/react';
import { useOrganizations, usePath, usePicasso } from 'hooks';
import { navigationPaths } from 'utils';
import NextLink from 'next/link';
import { NavigationBack, NotificationPopover } from 'components';

const organizationData = {
	name: 'Kylie Cosmetics Super Extra',
	logo: '/images/kylie-cosmetics-logo.png',
	totalFunds: '67,986.09',
	network: { name: 'Ethereum', logo: '/images/eth.png' },
};

const menuOptions = [
	{
		name: 'Overview',
		route: navigationPaths.dashboard.organizations.overview('1'),
	},
	{ name: 'Teams', route: navigationPaths.dashboard.organizations.teams('1') },
	{ name: 'Funds', route: navigationPaths.dashboard.organizations.funds('1') },
];

export const OrganizationsHeader = () => {
	const theme = usePicasso();
	const { isSamePath } = usePath();
	const { setNotificationsList, notificationsList } = useOrganizations();
	const { onClose, isOpen, onOpen } = useDisclosure();

	return (
		<Flex direction="column" color={theme.text.primary} px="6" w="100%" gap="7">
			<Flex w="100%" justify="space-between">
				<NavigationBack href={navigationPaths.dashboard.organizations.home}>
					Back to Organizations
				</NavigationBack>
				<NotificationPopover
					setNotificationsList={setNotificationsList}
					onClose={onClose}
					isOpen={isOpen}
					onOpen={onOpen}
					notificationNumber={notificationsList.length}
					notificationsList={notificationsList}
				/>
			</Flex>
			<Flex w="100%" justify="space-between" align="center">
				<Flex gap="3" align="center" w="72">
					<Img src={organizationData.logo} boxSize="20" />
					<Text fontSize="2xl">{organizationData.name}</Text>
				</Flex>
				<Flex direction="column" w="28">
					<Text fontSize="xl">${organizationData.totalFunds}</Text>
					<Text fontSize="sm">Total Funds</Text>
				</Flex>
				<NextLink href={navigationPaths.dashboard.organizations.editOrg('1')}>
					<Text
						borderRadius="base"
						px="5"
						py="1.5"
						bg="gray.50"
						fontSize="sm"
						fontWeight="medium"
						cursor="pointer"
					>
						Edit Informations
					</Text>
				</NextLink>
			</Flex>
			<Flex align="center" justify="space-between">
				<Flex>
					{menuOptions.map((menuOption, index) => {
						const comparedPath = isSamePath(menuOption.route);
						return (
							<NextLink key={+index} href={menuOption.route}>
								<Text
									color={theme.text.primary}
									cursor="pointer"
									py="1"
									px="3"
									fontSize="sm"
									fontWeight={comparedPath ? 'semibold' : 'normal'}
									borderRadius="none"
									borderBottomWidth="0.125rem"
									borderBottomColor={
										comparedPath ? theme.bg.primary : 'transparent'
									}
								>
									{menuOption.name}
								</Text>
							</NextLink>
						);
					})}
				</Flex>
				<Flex
					borderColor="gray.300"
					borderWidth="0.1rem"
					borderRadius="3xl"
					px="3"
					align="center"
					gap="2"
					h="6"
				>
					<Img src={organizationData.network.logo} boxSize="4" />
					<Text fontSize="xs">{organizationData.network.name}</Text>
				</Flex>
			</Flex>
		</Flex>
	);
};
