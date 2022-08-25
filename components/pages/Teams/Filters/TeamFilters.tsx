import {
	Button,
	Flex,
	Icon,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
} from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import useTranslation from 'next-translate/useTranslation';
import { FiFilter } from 'react-icons/fi';
import {
	IoChevronDownCircleOutline,
	IoChevronDownOutline,
} from 'react-icons/io5';
import { SearchFilter } from './SearchFilter';

export const TeamFilters = () => {
	const theme = usePicasso();
	const { t: translate } = useTranslation('common');

	return (
		<Flex m="3.5" justifyContent="space-between" direction="row" w="full">
			<Flex>
				<Menu>
					<MenuButton
						as={Button}
						rightIcon={<IoChevronDownCircleOutline />}
						color={theme.text.gray}
						w="32"
						h="9"
					>
						{translate('teamTableFilter.allGroups')}
					</MenuButton>
					<MenuList bg={theme.bg.bgCard}>
						<MenuItem>Dev</MenuItem>
						<MenuItem>Marketing</MenuItem>
						<MenuItem>Business</MenuItem>
					</MenuList>
				</Menu>
			</Flex>
			<Flex>
				<SearchFilter />
			</Flex>
			<Flex>
				<Button w="12" bg="none" color="white">
					{translate('teamTableFilter.filter')}
				</Button>
			</Flex>
			<Flex>
				<Menu>
					<MenuButton
						as={Button}
						rightIcon={<IoChevronDownOutline />}
						h="9"
						bg={theme.bg.bgCard}
						color={theme.text.gray}
					>
						{translate('teamTableFilter.rows')}
					</MenuButton>
					<MenuList bg={theme.bg.bgCard}>
						<MenuItem>5</MenuItem>
						<MenuItem>10</MenuItem>
						<MenuItem>15</MenuItem>
					</MenuList>
				</Menu>
			</Flex>
		</Flex>
	);
};
