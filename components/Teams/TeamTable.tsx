import {
	Button,
	Flex,
	Icon,
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
						<Tr>
							<Td>Bradley Cooper</Td>
							<Td>
								{truncateEthAddress(
									'0x969Cf86eeb3f9354D89f357c8dFe43DE8e645148'
								)}
							</Td>
							<Td bg="red.600">Marketing</Td>
							<Td>15,000/month</Td>
							<Td>1,923.12</Td>
							<Td>USDT</Td>
						</Tr>
						<Tr>
							<Td>Bradley Cooper</Td>
							<Td>
								{truncateEthAddress(
									'0x969Cf86eeb3f9354D89f357c8dFe43DE8e645148'
								)}
							</Td>
							<Td bg="blue.600">Marketing</Td>
							<Td>15,000/month</Td>
							<Td>1,923.12</Td>
							<Td>USDT</Td>
						</Tr>
						<Tr>
							<Td>Bradley Cooper</Td>
							<Td>
								{truncateEthAddress(
									'0x969Cf86eeb3f9354D89f357c8dFe43DE8e645148'
								)}
							</Td>
							<Td bg="green.600">Marketing</Td>
							<Td>15,000/month</Td>
							<Td>1,923.12</Td>
							<Td>USDT</Td>
						</Tr>
					</Tbody>
					<Tfoot>
						<Tr>
							<Th>
								<Button border="none" bg="none">
									See moore
								</Button>
							</Th>
						</Tr>
					</Tfoot>
				</Table>
			</TableContainer>
		</Flex>
	);
};

export default TeamTable;
