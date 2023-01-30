import { Flex } from '@chakra-ui/react';
import {
	OrganizationsHeader,
	EmployeesDashboard,
	RecentActivities,
} from 'components';
import { useOrganizations } from 'hooks';

export const OverviewComponent = () => {
	const { selectedOrganization } = useOrganizations();
	return (
		<Flex direction="column">
			<Flex w="100%" bg="white" position="absolute" h="64" left="0" />
			<Flex
				color="black"
				pt="6"
				zIndex="docked"
				direction="column"
				align="start"
			>
				<OrganizationsHeader company={selectedOrganization} />
			</Flex>
			<Flex py="6" direction="column" gap="9">
				<Flex pt="6">
					<EmployeesDashboard
						employees={selectedOrganization.employees!}
						isGeneral={false}
					/>
				</Flex>
				{/* <Flex flexDir="column" w="full">
				<Flex justify="space-between" pt="6" pb="4">
				<Text color={theme.text.primary} fontWeight="medium">
						{translate('teams')}
						</Text>
						<Link
						href={navigationPaths.dashboard.organizations.teams('1')}
						color="gray.500"
						fontWeight="medium"
						fontSize="xs"
						cursor="pointer"
						>
						{translate('seeAll')}
						</Link>
						</Flex>
						<Grid gap="4" w="full" templateColumns="repeat(3, 1fr)">
						{teams.map((team, index) => (
							<GridItem key={+index} w="max-content">
							<TeamsCard team={team} />
							</GridItem>
							))}
							</Grid>
						</Flex> */}
				<RecentActivities />
			</Flex>
		</Flex>
	);
};
