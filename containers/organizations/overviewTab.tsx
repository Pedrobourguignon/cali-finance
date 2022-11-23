import { Flex, Text } from '@chakra-ui/react';
import {
	NavigationBack,
	OrganizationsHeader,
	RecentActivities,
	TeamsCard,
	WithdrawalsBanner,
} from 'components';
import { OrganizationsProvider } from 'contexts';
import { usePicasso } from 'hooks';
import { AppLayout } from 'layouts';
import { navigationPaths } from 'utils';
import NextLink from 'next/link';

const teams = [
	{
		teamName: 'Marketing',
		logo: '/images/team1.png',
		funds: '2,234.05',
		members: 27,
	},
	{
		teamName: 'Sales',
		logo: '/images/team2.png',
		funds: '92,234.11',
		members: 170,
	},
	{
		teamName: 'Finance',
		logo: '/images/team3.png',
		funds: '5,234.11',
		members: 13,
	},
];

export const OverviewTab = () => {
	const theme = usePicasso();
	return (
		<OrganizationsProvider>
			<AppLayout right={<WithdrawalsBanner />}>
				<Flex
					w="100%"
					bg="white"
					h="64"
					position="absolute"
					borderRadius="base"
				/>

				<Flex
					color="black"
					pt="6"
					zIndex="docked"
					direction="column"
					align="start"
				>
					<NavigationBack href={navigationPaths.dashboard.organizations.home}>
						Back to Organizations
					</NavigationBack>
					<OrganizationsHeader />
				</Flex>
				<Flex p="6" direction="column" gap="4">
					<Flex justify="space-between">
						<Text color={theme.text.primary} fontWeight="medium">
							Teams
						</Text>
						<NextLink href={navigationPaths.dashboard.organizations.teams}>
							<Text
								color="gray.500"
								fontWeight="medium"
								fontSize="xs"
								cursor="pointer"
							>
								See all
							</Text>
						</NextLink>
					</Flex>
					<Flex gap="4">
						{teams.map((team, index) => (
							<TeamsCard key={+index} team={team} />
						))}
					</Flex>
					<RecentActivities />
				</Flex>
			</AppLayout>
		</OrganizationsProvider>
	);
};
