import {
	Button,
	Flex,
	Icon,
	Input,
	Menu,
	MenuItem,
	MenuList,
} from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import { FiFilter } from 'react-icons/fi';
import { IoChevronDownOutline } from 'react-icons/io5';
import { SearchFilter } from './SearchFilter';

export const TeamFilters = () => {
	const theme = usePicasso();
	return (
		<Flex m="3.5">
			<Flex mr="28">
				<Menu>
					<Button
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
				<SearchFilter />
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
	);
};
