import { Flex, Grid, GridItem, Link, Text } from '@chakra-ui/react';
import {
	OrganizationsHeader,
	RecentActivities,
	TeamsCard,
	WithdrawalsBanner,
} from 'components';
import { usePicasso } from 'hooks';
import { AppLayout, OrganizationWhiteBackground } from 'layouts';
import { navigationPaths, layoutLimit } from 'utils';

const teams = [
	{
		id: 1,
		name: 'Marketing',
		logo: '/images/team1.png',
		balance: 2234.05,
		members: 27,
	},
	{
		id: 2,
		name: 'Sales',
		logo: '/images/team2.png',
		balance: 92234.11,
		members: 170,
	},
	{
		id: 3,
		name: 'Finance',
		logo: '/images/team3.png',
		balance: 5234.11,
		members: 13,
	},
];

export const OverviewTab = () => {
	const theme = usePicasso();

	return (
		<AppLayout right={<WithdrawalsBanner />}>
			<OrganizationWhiteBackground />
			<Flex
				color="black"
				pt="6"
				zIndex="docked"
				direction="column"
				align="start"
				maxW={layoutLimit}
			>
				<OrganizationsHeader />
			</Flex>
			<Flex p="6" direction="column" gap="4" maxW={layoutLimit} w="100%">
				<Flex flexDir="column" w="full">
					<Flex justify="space-between" pt="6" pb="4">
						<Text color={theme.text.primary} fontWeight="medium">
							Teams
						</Text>
						<Link
							href={navigationPaths.dashboard.organizations.teams('1')}
							color="gray.500"
							fontWeight="medium"
							fontSize="xs"
							cursor="pointer"
						>
							See all
						</Link>
					</Flex>
					<Grid gap="4" w="full" templateColumns="repeat(3, 1fr)">
						{teams.map((team, index) => (
							<GridItem key={+index} w="max-content">
								<TeamsCard team={team} />
							</GridItem>
						))}
					</Grid>
				</Flex>
				<RecentActivities />
			</Flex>
		</AppLayout>
	);
};
