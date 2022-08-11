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
	Th,
	Thead,
	Tr,
} from '@chakra-ui/react'
import { usePicasso } from 'hooks/usePicasso'
import { AiOutlineSearch } from 'react-icons/ai'
import { FiFilter } from 'react-icons/fi'
import { IoChevronDownOutline } from 'react-icons/io5'

const TeamTable = () => {
	const theme = usePicasso()

	return (
		<Flex
			h="60vh"
			mx="48"
			my="32"
			position="absolute"
			bg={theme.bg.container}
			borderRadius="12"
			flexDirection="column"
		>
			<Flex m="3.5">
				<Flex mr="28">
					<Menu>
						<Button as={Button} rightIcon={<IoChevronDownOutline />} h="9">
							All groups
						</Button>
						<MenuList bg="none">
							<MenuItem>Download</MenuItem>
						</MenuList>
					</Menu>
				</Flex>
				<Flex mr="7">
					{/* <Icon as={AiOutlineSearch} /> */}
					<Input type="text" placeholder="Search someone..." w="48" h="9" />
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
						>
							Rows
						</Button>
						<MenuList bg="none">
							<MenuItem>Download</MenuItem>
						</MenuList>
					</Menu>
				</Flex>
			</Flex>
			<Flex>
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
								<Td>0x969Cf86eeb3f9354D89f357c8dFe43DE8e645148</Td>
								<Td>Marketing</Td>
								<Td>15,000/month</Td>
								<Td>1,923.12</Td>
								<Td>USDT</Td>
							</Tr>
							<Tr>
								<Td>Bradley Cooper</Td>
								<Td>0x969Cf86eeb3f9354D89f357c8dFe43DE8e645148</Td>
								<Td>Marketing</Td>
								<Td>15,000/month</Td>
								<Td>1,923.12</Td>
								<Td>USDT</Td>
							</Tr>
							<Tr>
								<Td>Bradley Cooper</Td>
								<Td>0x969Cf86eeb3f9354D89f357c8dFe43DE8e645148</Td>
								<Td>Marketing</Td>
								<Td>15,000/month</Td>
								<Td>1,923.12</Td>
								<Td>USDT</Td>
							</Tr>
						</Tbody>
					</Table>
				</TableContainer>
			</Flex>
		</Flex>
	)
}

export default TeamTable
