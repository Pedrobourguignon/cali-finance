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
import { usePicasso } from 'hooks/usePicasso';
import { TeamFilters } from './Filters';

interface IEmployeeData {
	name: string;
	address: string;
	group: {
		groupName: string;
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
			groupName: 'Marketing',
			color: 'red.600',
		},
		amount: 15000,
		withdrawable: 192312,
		coin: 'USDT',
	},
	{
		name: 'Denzel Washington',
		address: '0x969Cf86eeb3f9354D89f357c8dFe43DE8e645148',
		group: {
			groupName: 'Dev',
			color: 'green.600',
		},
		amount: 15000,
		withdrawable: 192312,
		coin: 'USDT',
	},
	{
		name: 'Jackie Chan',
		address: '0x969Cf86eeb3f9354D89f357c8dFe43DE8e645148',
		group: {
			groupName: 'Business',
			color: 'blue.600',
		},
		amount: 15000,
		withdrawable: 192312,
		coin: 'USDT',
	},
];

export const TeamTable: React.FC = () => {
	const theme = usePicasso();

	return (
		<Flex
			minH="489px"
			minW="684px"
			bg={theme.bg.primary}
			borderRadius="12"
			flexDirection="column"
		>
			<TeamFilters />
			<TableContainer>
				<Table variant="simple" color="white">
					<Thead>
						<Tr>
							<Th color="white">Name</Th>
							<Th color="white">Adress</Th>
							<Th color="white">Group</Th>
							<Th color="white">Amount</Th>
							<Th color="white">Withdrawable</Th>
							<Th color="white">Coin</Th>
						</Tr>
					</Thead>
					<Tbody>
						{employeeData.map((employee, index) => (
							<Tr key={+index}>
								<Td>{employee.name}</Td>
								<Td>{truncateEthAddress(employee.address)}</Td>
								<Td bg={employee.group.color}>{employee.group.groupName}</Td>
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
					See more
				</Button>
			</TableContainer>
		</Flex>
	);
};

export default TeamTable;
