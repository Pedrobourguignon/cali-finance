import {
	Button,
	Flex,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
} from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import useTranslation from 'next-translate/useTranslation';
import { IoChevronDownOutline } from 'react-icons/io5';
import { SearchFilter } from './SearchFilter';

const groupOptions = ['Dev', 'Marketing', 'Business'];
const numberOfRowsOptions = [5, 10, 15];

export const TeamFilters = () => {
	const theme = usePicasso();
	const { t: translate } = useTranslation('teams-page');

	return (
		<Flex p="4" justifyContent="space-between" direction="row" w="full">
			<Flex>
				<Menu>
					<MenuButton
						as={Button}
						rightIcon={<IoChevronDownOutline />}
						color={theme.text.gray}
						h="9"
					>
						{translate('teamTableFilter.allGroups')}
					</MenuButton>
					<MenuList bg={theme.bg.card}>
						<MenuItem>{translate('teamTableFilter.allGroups')}</MenuItem>
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
						bg={theme.bg.card}
						color={theme.text.gray}
					>
						{translate('teamTableFilter.rows')}
					</MenuButton>
					<MenuList bg={theme.bg.card}>
						{numberOfRowsOptions.map((option, index) => (
							<MenuItem key={+index}>{option}</MenuItem>
						))}
					</MenuList>
				</Menu>
			</Flex>
		</Flex>
	);
};
