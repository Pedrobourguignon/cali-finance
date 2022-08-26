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
						{teams[0].employees.map((employee, index) => (
							<Tr key={+index}>
								<Td>{employee.name}</Td>
								<Td>{truncateEthAddress(employee.address)}</Td>
								<Td bg={employee.group.color}>{employee.group.name}</Td>
								<Td>{employee.amount}</Td>
								<Td>{employee.withdrawable}</Td>
								<Td>{employee.coin}</Td>
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
