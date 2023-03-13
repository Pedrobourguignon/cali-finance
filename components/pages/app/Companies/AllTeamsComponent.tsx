import { Button, Flex, Grid, GridItem, Text } from '@chakra-ui/react';
import {
	CompaniesHeader,
	ActiveTeamsBar,
	TeamsCard,
	EmployeesDashboard,
} from 'components';
import { useCompanies, usePicasso, useTeams } from 'hooks';
import { AppLayout, CompanyWhiteBackground } from 'layouts';
import { IEmployee } from 'types';

const AllEmployees: IEmployee[] = [
	{
		name: 'Kim Kardashian',
		wallet: '0x7E48CA2BD05EC61C2FA83CF34B066A8FF36B4CFE',
		picture: '/images/avatar.png',
		amount: 10.0,
		coin: 'USDT',
		team: 'General',
	},
	{
		name: 'Kylie Jenner',
		wallet: '0x7E48CA2BD05EC61C2FA83CF34B066A8FF36Z9EXD',
		picture: '/images/avatar.png',
		amount: 100.0,
		coin: 'USDT',
		team: 'Marketing',
	},
	{
		name: 'Kloe Kardashian',
		wallet: '0x7E48CA2BD05EC61C2FA83CF34B066A8FF36C3QER',
		picture: '/images/avatar.png',
		amount: 80.0,
		coin: 'USDT',
		team: 'Finance',
	},
	{
		name: 'Kloe Kardashian',
		wallet: '0x7E48CA2BD05EC61C2FA83CF34B066A8FF36C3QER',
		picture: '/images/avatar.png',
		amount: 80.0,
		coin: 'USDT',
		team: 'Finance',
	},
	{
		name: 'Kloe Kardashian',
		wallet: '0x7E48CA2BD05EC61C2FA83CF34B066A8FF36C3QER',
		picture: '/images/avatar.png',
		amount: 80.0,
		coin: 'USDT',
		team: 'Finance',
	},
];

interface IAllTeamsComponent {
	display: string;
	changeToCreateTeamTab: () => void;
	children: React.ReactNode;
}

export const AllTeamsComponent: React.FC<IAllTeamsComponent> = ({
	display,
	changeToCreateTeamTab,
	children,
}) => {
	const theme = usePicasso();
	const { teams } = useTeams();
	const { selectedCompany } = useCompanies();
	return (
		<AppLayout right={<ActiveTeamsBar />}>
			<CompanyWhiteBackground />
			<Flex pt="6" zIndex="docked" direction="column" align="start">
				<CompaniesHeader />
			</Flex>
			<Flex
				color={theme.text.primary}
				p="6"
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
					</Flex>
					<Grid gap="4" w="full" templateColumns="repeat(3, 1fr)">
						{teams.map((team, index) => (
							<GridItem key={+index} w="max-content">
								<TeamsCard team={team} />
							</GridItem>
						))}
					</Grid>
				</Flex>

				<EmployeesDashboard isGeneral />
			</Flex>
			<Flex px="6" pt="10">
				{children}
			</Flex>
		</AppLayout>
	);
};
