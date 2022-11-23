import { Button, Flex, Img, Text } from '@chakra-ui/react';
import { usePath, usePicasso } from 'hooks';
import Router from 'next/router';
import { navigationPaths } from 'utils';

const menuOptions = [
	{ name: 'Overview', route: navigationPaths.dashboard.organizations.overview },
	{ name: 'Teams', route: navigationPaths.dashboard.organizations.teams },
	{ name: 'Funds', route: navigationPaths.dashboard.organizations.funds },
];

const organizationData = {
	name: 'Kylie Cosmetics Super Extra',
	logo: '/images/kylie-cosmetics-logo.png',
	totalFunds: '67,986.09',
	network: { name: 'Ethereum', logo: '/images/eth.png' },
};
export const OrganizationsHeader = () => {
	const theme = usePicasso();
	const { isSamePath } = usePath();

	return (
		<Flex direction="column" color={theme.text.primary} p="6" w="100%" gap="7">
			<Flex w="100$" justify="space-between" align="center">
				<Flex gap="3" align="center" maxW="72">
					<Img src={organizationData.logo} boxSize="20" />
					<Text fontSize="2xl">{organizationData.name}</Text>
				</Flex>
				<Flex direction="column" maxW="28">
					<Text fontSize="xl">${organizationData.totalFunds}</Text>
					<Text fontSize="sm">Total Funds</Text>
				</Flex>
				<Button
					borderRadius="base"
					h="8"
					bg="gray.50"
					fontSize="sm"
					fontWeight="medium"
					onClick={() =>
						Router.push(navigationPaths.dashboard.organizations.editOrg)
					}
				>
					Edit Informations
				</Button>
			</Flex>
			<Flex align="center" justify="space-between">
				<Flex>
					{menuOptions.map((menuOption, index) => {
						const comparedPath = isSamePath(menuOption.route);
						return (
							<Button
								key={+index}
								color={theme.text.primary}
								fontSize="sm"
								fontWeight={comparedPath ? 'semibold' : 'normal'}
								borderRadius="none"
								borderBottomWidth={comparedPath ? '0.125rem' : '0rem'}
								borderBottomColor={
									comparedPath ? theme.bg.primary : 'transparent'
								}
								onClick={() => Router.push(menuOption.route)}
							>
								{menuOption.name}
							</Button>
						);
					})}
				</Flex>
				<Flex
					borderColor="gray.300"
					borderWidth="0.1rem"
					borderRadius="3xl"
					px="3"
					align="center"
					gap="4"
					h="6"
				>
					<Img src={organizationData.network.logo} boxSize="4" />
					<Text fontSize="xs">{organizationData.network.name}</Text>
				</Flex>
			</Flex>
		</Flex>
	);
};
