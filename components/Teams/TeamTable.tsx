import {
	Button,
	Flex,
	Icon,
	Input,
	Menu,
	MenuItem,
	MenuList,
} from '@chakra-ui/react';
import { usePicasso } from 'hooks/usePicasso';
import { FiFilter } from 'react-icons/fi';
import { IoChevronDownOutline } from 'react-icons/io5';

export const TeamTable = () => {
	const theme = usePicasso();

	return (
		<Flex
			h="60vh"
			mx="48"
			my="32"
			position="absolute"
			bg={theme.bg.tertiary}
			borderRadius="12"
		>
			<Flex m="3.5">
				<Flex mr="28">
					<Menu>
						<Button
							as={Button}
							rightIcon={<IoChevronDownOutline />}
							h="9"
							bg="#9B93AB"
						>
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
		</Flex>
	);
};

export default TeamTable;
