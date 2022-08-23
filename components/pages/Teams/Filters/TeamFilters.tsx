import { Button, Flex, Icon, Menu, MenuItem, MenuList } from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import useTranslation from 'next-translate/useTranslation';
import { FiFilter } from 'react-icons/fi';
import { IoChevronDownOutline } from 'react-icons/io5';
import { SearchFilter } from './SearchFilter';

export const TeamFilters = () => {
	const theme = usePicasso();
	const { t: translate } = useTranslation('common');

	return (
		<Flex m="3.5" justifyContent="space-between" direction="row" w="full">
			<Flex>
				<Menu>
					<Button
						rightIcon={<IoChevronDownOutline />}
						h="9"
						bg={theme.bg.bgCard}
						color={theme.text.gray}
					>
						{translate('teamTableFilter.allGroups')}
					</Button>
					<MenuList bg="none">
						<MenuItem>Download</MenuItem>
					</MenuList>
				</Menu>
			</Flex>
			<Flex>
				<SearchFilter />
			</Flex>
			<Flex>
				<Button w="12" bg="none" color="white">
					<Icon as={FiFilter} mr="1" />
					{translate('teamTableFilter.filter')}
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
						{translate('teamTableFilter.rows')}
					</Button>
					<MenuList bg="none">
						<MenuItem>Teste</MenuItem>
					</MenuList>
				</Menu>
			</Flex>
		</Flex>
	);
};
