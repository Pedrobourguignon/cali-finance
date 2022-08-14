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

export const TeamTable = () => {
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
