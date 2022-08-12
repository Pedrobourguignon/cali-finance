import {
	Button,
	Flex,
	Icon,
	Img,
	Input,
	Menu,
	MenuItem,
	MenuList,
	Table,
	TableContainer,
	Tbody,
	Td,
	Tfoot,
	Th,
	Thead,
	Tr,
} from '@chakra-ui/react';
import truncateEthAddress from 'truncate-eth-address';
import { usePicasso } from 'hooks/usePicasso';
import { AiOutlineSearch } from 'react-icons/ai';
import { FiFilter } from 'react-icons/fi';
import { IoChevronDownOutline } from 'react-icons/io5';

interface IDataRow {
	id: number;
	name: string;
	address: string;
	group: string;
	amount: string;
	withdrawable: string;
	coin: {
		name: string;
		logoUrl: string;
	};
}

const teamData: IDataRow[] = [
	{
		id: 0,
		name: 'Bradley Cooper',
		address: '0xa21sd7o8i3e4adfs3d5j6k8a9s9',
		group: 'marketing',
		amount: '15,000',
		withdrawable: '10,000.00',
		coin: {
			name: 'USDT',
			logoUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/825.png',
		},
	},
	{
		id: 1,
		name: 'Azeitona Preta',
		address: '0xa21sd7o8i3e4adfs3d5j6k8a9s9',
		group: 'dev',
		amount: '15,000',
		withdrawable: '10,000.00',
		coin: {
			name: 'USDT',
			logoUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/825.png',
		},
	},
	{
		id: 2,
		name: 'Azeitona Verde',
		address: '0xa21sd7o8i3e4adfs3d5j6k8a9s9',
		group: 'marketing',
		amount: '15,000',
		withdrawable: '10,000.00',
		coin: {
			name: 'USDT',
			logoUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/825.png',
		},
	},
];

const groupsData: {
	[key: string]: string;
} = {
	marketing: 'red.600',
	dev: 'green.600',
};

const columns = ['Name', 'Adress', 'Group', 'Amount', 'Withdrawable', 'Coin'];

export const TeamTable = () => {
	const theme = usePicasso();

	return (
		<Flex
			h={theme.boxSize.teamTableH}
			w={theme.boxSize.teamTableW}
			bg={theme.bg.primary}
			borderRadius="12"
			flexDirection="column"
		>
			<Flex m="3.5">
				<Flex mr="28">
					<Menu>
						<Button
							as={Button}
							rightIcon={<IoChevronDownOutline />}
							h="9"
							bg={theme.bg.bgCard}
							color={theme.text.gray}
						>
							All groups
						</Button>
						<MenuList bg="none">
							<MenuItem>Download</MenuItem>
						</MenuList>
					</Menu>
				</Flex>
				<Flex mr="7">
					<Input
						type="text"
						placeholder="Search someone..."
						w="48"
						h="9"
						bg={theme.bg.bgCard}
						color={theme.text.gray}
						border="none"
					/>
					<Icon as={AiOutlineSearch} />
				</Flex>
				<Flex mr="7">
					<Button w="12" bg="none" color="white">
						<Icon as={FiFilter} mr="1" />
						Filter
					</Button>
				</Flex>
				<Flex>
					<Menu>
						<Button
							as={Button}
							rightIcon={<IoChevronDownOutline />}
							w="24"
							h="9"
							bg={theme.bg.bgCard}
							color={theme.text.gray}
						>
							Rows
						</Button>
						<MenuList bg="none">
							<MenuItem>Teste</MenuItem>
						</MenuList>
					</Menu>
				</Flex>
			</Flex>
			<TableContainer
				sx={{
					'&::-webkit-scrollbar': {
						height: '10px',
					},
					'&::-webkit-scrollbar-track': {
						height: '4px',
					},
					'&::-webkit-scrollbar-thumb': {
						backgroundColor: 'gray.600',
						borderRadius: '24px',
					},
				}}
			>
				<Table variant="simple" color="white">
					<Thead>
						<Tr>
							{columns.map(column => (
								<Th key={column} color="white">
									{column}
								</Th>
							))}
						</Tr>
					</Thead>
					<Tbody>
						{teamData.map(member => (
							<Tr key={member.id}>
								<Td>{member.name}</Td>
								<Td>{truncateEthAddress(member.address)}</Td>
								<Td bgColor={groupsData[member.group]}>{member.group}</Td>
								<Td>{member.amount}/month</Td>
								<Td>{member.withdrawable}</Td>
								<Td>
									<Flex alignItems="center" gap="2">
										{member.coin.name}
										<Img src={member.coin.logoUrl} w="3" h="3" />
									</Flex>
								</Td>
							</Tr>
						))}
					</Tbody>
				</Table>
			</TableContainer>
			<Button border="none" bg="none" _hover={{ opacity: 0.8 }}>
				See more
			</Button>
		</Flex>
	);
};

export default TeamTable;
