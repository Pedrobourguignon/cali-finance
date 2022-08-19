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

export const TeamTable = () => {
	const theme = usePicasso();
	const { t: translate } = useTranslation('common');

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
							<Th color="white">{translate('teamTable.name')}</Th>
							<Th color="white">{translate('teamTable.address')}</Th>
							<Th color="white">{translate('teamTable.group')}</Th>
							<Th color="white">{translate('teamTable.amount')}</Th>
							<Th color="white">{translate('teamTable.withdrawable')}</Th>
							<Th color="white">{translate('teamTable.coin')}</Th>
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
					{translate('teamTable.seeMore')}
				</Button>
			</TableContainer>
		</Flex>
	);
};

export default TeamTable;
