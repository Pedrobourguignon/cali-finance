import { Flex, Grid, GridItem, Text, useDisclosure } from '@chakra-ui/react';
import { NavigationBack } from 'components/Buttons';
import {
	OrganizationsHeader,
	NotificationPopover,
	ActiveTeamsBar,
	TeamsCard,
	EmployeesDashboard,
} from 'components';
import { useOrganizations, usePicasso } from 'hooks';
import { AppLayout } from 'layouts';
import { navigationPaths } from 'utils';
import NextLink from 'next/link';

const layoutLimit = 800;
const teams = [
	{
		name: 'Marketing',
		logo: '/images/team1.png',
		funds: '2,234.05',
		members: 27,
	},
	{
		name: 'Sales',
		logo: '/images/team2.png',
		funds: '92,234.11',
		members: 170,
	},
	{
		name: 'Finance',
		logo: '/images/team3.png',
		funds: '5,234.11',
		members: 13,
	},
];

export const TeamsComponent = () => {
	const theme = usePicasso();
	const { onClose, isOpen, onOpen } = useDisclosure();
	const { setNotificationsList, notificationsList } = useOrganizations();
	return (
		<AppLayout right={<ActiveTeamsBar />}>
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
				maxW={layoutLimit}
			>
				<Flex w="100%" justify="space-between" pr="2">
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
				<OrganizationsHeader />
			</Flex>
			<Flex
				color={theme.text.primary}
				p="6"
				maxW={layoutLimit}
				direction="column"
				gap="10"
			>
				<Flex direction="column" gap="4">
					<Flex justify="space-between">
						<Flex fontWeight="medium" gap="1">
							<Text>{teams.length}</Text>
							<Text>Teams</Text>
						</Flex>
						<NextLink href="">
							<Text
								bg={theme.bg.primary}
								px="6"
								py="1"
								cursor="pointer"
								color="white"
								borderRadius="base"
								fontWeight="medium"
								fontSize="xs"
							>
								Create Team
							</Text>
						</NextLink>
					</Flex>
					<Grid gap="4" w="full" templateColumns="repeat(3, 1fr)">
						{teams.map((team, index) => (
							<GridItem key={+index} w="max-content">
								<TeamsCard team={team} />
							</GridItem>
						))}
					</Grid>
				</Flex>

				<EmployeesDashboard />
			</Flex>
		</AppLayout>
	);
};
