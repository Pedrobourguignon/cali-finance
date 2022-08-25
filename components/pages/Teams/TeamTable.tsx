import {
	Button,
	Flex,
	Table,
	TableContainer,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
} from '@chakra-ui/react';
import truncateEthAddress from 'truncate-eth-address';
import useTranslation from 'next-translate/useTranslation';
import { usePicasso } from 'hooks/usePicasso';
import { useTeams } from 'hooks';
import { TeamFilters } from './Filters';

export const TeamTable: React.FC = () => {
	const theme = usePicasso();
	const { t: translate } = useTranslation('teams-page');
	const { teams } = useTeams();

	return (
		<Flex
			h="max-content"
			w="max-content"
			bg={theme.bg.primary}
			borderRadius="12"
			flexDirection="column"
		>
			<TeamFilters />
			<TableContainer>
				<Table variant="simple" color="white">
					<Thead>
						<Tr>
							<Th color="white">{translate('teamTable.name')}</Th>
							<Th color="white">{translate('teamTable.address')}</Th>
							<Th color="white">{translate('teamTable.group')}</Th>
							<Th color="white">{translate('teamTable.amount')}</Th>
							<Th color="white">{translate('teamTable.withdrawable')}</Th>
							<Th color="white">{translate('teamTable.coin')}</Th>
						</Tr>
					</Thead>
					<Tbody>
						{teams.map((team, index) => (
							<Tr key={+index}>
								<Td>{team.employees[index].name}</Td>
								<Td>{truncateEthAddress(team.employees[index].address)}</Td>
								<Td bg={team.employees[index].group.color}>
									{team.employees[index].group.name}
								</Td>
								<Td>{team.employees[index].amount}</Td>
								<Td>{team.employees[index].withdrawable}</Td>
								<Td>{team.employees[index].coin}</Td>
							</Tr>
						))}
					</Tbody>
				</Table>
				<Button
					border="none"
					bg="none"
					w="full"
					py="6"
					h="max-content"
					fontWeight="normal"
				>
					{translate('teamTable.seeMore')}
				</Button>
			</TableContainer>
		</Flex>
	);
};

export default TeamTable;
