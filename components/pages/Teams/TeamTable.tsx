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
import { TeamFilters } from './Filters';
import { FilterSandwichMenu } from './Filters/FilterSandwichMenu';

interface IEmployeeData {
	name: string;
	address: string;
	group: {
		name: string;
		color: string;
	};
	amount: number;
	withdrawable: number;
	coin: string;
}

const employeeData: IEmployeeData[] = [
	{
		name: 'Bradley Cooper',
		address: '0x969Cf86eeb3f9354D89f357c8dFe43DE8e645148',
		group: {
			name: 'Marketing',
			color: 'blue.600',
		},
		amount: 15000,
		withdrawable: 192312,
		coin: 'USDT',
	},
	{
		name: 'Denzel Washington',
		address: '0x969Cf86eeb3f9354D89f357c8dFe43DE8e645148',
		group: {
			name: 'Dev',
			color: 'green.600',
		},
		amount: 230789,
		withdrawable: 320,
		coin: 'USDT',
	},
	{
		name: 'Jackie Chan',
		address: '0x969Cf86eeb3f9354D89f357c8dFe43DE8e645148',
		group: {
			name: 'Business',
			color: 'blue.600',
		},
		amount: 1563,
		withdrawable: 1240,
		coin: 'USDT',
	},
];

export const TeamTable: React.FC = () => {
	const theme = usePicasso();
	const { t: translate } = useTranslation('teams-page');

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
						{employeeData.map((employee, index) => (
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
