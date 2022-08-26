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
import {
	IoChevronDownCircleOutline,
	IoChevronDownOutline,
} from 'react-icons/io5';
import { SearchFilter } from './SearchFilter';

const groupOptions = ['Dev', 'Marketing', 'Business'];
const numberOfRowsOptions = [5, 10, 15];

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
						{groupOptions.map((group, index) => (
							<MenuItem key={+index}>{group}</MenuItem>
						))}
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
						{numberOfRowsOptions.map((option, index) => (
							<MenuItem key={+index}>{option}</MenuItem>
						))}
					</MenuList>
				</Menu>
			</Flex>
		</Flex>
	);
};
