import {
	Flex,
	Table,
	TableContainer,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
} from '@chakra-ui/react';
import { useState } from 'react';
import truncateEthAddress from 'truncate-eth-address';
import useTranslation from 'next-translate/useTranslation';
import { ITeamsData } from 'types';
import { usePicasso } from 'hooks';
import { TeamFilters, FilterSandwichMenu } from './Filters';
import { Paginator } from './Misc';

interface ITeamTableProps {
	selectedTeam: ITeamsData;
}

export const TeamTable: React.FC<ITeamTableProps> = props => {
	const { selectedTeam } = props;
	const theme = usePicasso();
	const { t: translate } = useTranslation('teams-page');
	const [actualPage, setActualPage] = useState(1);
	const [maxPage, setMaxPage] = useState(1);

	return (
		<Flex
			h="max-content"
			w={{
				base: '18rem',
				sm: '29rem',
				md: '35rem',
				lg: 'max-content',
			}}
			bg={theme.bg.primary}
			borderRadius="12"
			flexDirection="column"
		>
			<Flex
				display={{
					base: 'none',
					md: 'flex',
				}}
			>
				<TeamFilters />
			</Flex>
			<Flex display={{ base: 'flex', md: 'none' }} justify="end" p="2">
				<FilterSandwichMenu />
			</Flex>
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
						{selectedTeam.employees.map((employee, index) => (
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
				<Paginator actualPage={actualPage} maxPage={maxPage} />
			</TableContainer>
		</Flex>
	);
};

export default TeamTable;
