import { Button, Flex, Grid, GridItem, Link, Text } from '@chakra-ui/react';
import {
	OrganizationsHeader,
	ActiveTeamsBar,
	TeamsCard,
	EmployeesDashboard,
} from 'components';
import { usePicasso } from 'hooks';
import { AppLayout } from 'layouts';
import { layoutLimit } from 'utils';

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

interface ITeamsComponent {
	display: string;
	changeToCreateTeamTab: () => void;
	children: React.ReactNode;
}

export const TeamsComponent: React.FC<ITeamsComponent> = ({
	display,
	changeToCreateTeamTab,
	children,
}) => {
	const theme = usePicasso();
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
				<OrganizationsHeader />
			</Flex>
			<Flex
				color={theme.text.primary}
				p="6"
				maxW={layoutLimit}
				direction="column"
				gap="10"
				display={display}
			>
				<Flex direction="column" gap="4" pt="6" pb="4">
					<Flex justify="space-between">
						<Flex fontWeight="medium" gap="1">
							<Text>{teams.length}</Text>
							<Text>Teams</Text>
						</Flex>
						<Link href="/">
							<Button
								bg={theme.bg.primary}
								px="6"
								py="1"
								h="max-content"
								cursor="pointer"
								color="white"
								borderRadius="base"
								fontWeight="medium"
								fontSize="xs"
								_hover={{ opacity: '80%' }}
								_focus={{}}
								_active={{}}
								onClick={changeToCreateTeamTab}
							>
								Create Team
							</Button>
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

				<EmployeesDashboard />
			</Flex>
			<Flex w={layoutLimit} px="6" pt="10">
				{children}
			</Flex>
		</AppLayout>
	);
};
