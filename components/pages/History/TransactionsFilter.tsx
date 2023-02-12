import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { useCompanies, usePicasso, useProfile } from 'hooks';
import useTranslation from 'next-translate/useTranslation';
import React, { useState } from 'react';
import { BiChevronDown } from 'react-icons/bi';
import { IHistoryNotification, IHistoryPage } from 'types';

export const TransactionsFilter: React.FC<IHistoryPage> = ({ history }) => {
	const { t: translate } = useTranslation('history-page');
	const { setFilteredNotifications, filteredNotifications } = useCompanies();
	const [selectedFilterOption, setSelectedFilterOption] = useState<string>(
		translate('all')
	);

	const { isConnected } = useProfile();

	const theme = usePicasso();

	const historyFilterOptions = [
		translate('all'),
		translate('deposit'),
		translate('withdrawal'),
		translate('addedToTeam'),
		translate('teamCreated'),
	];

	const filterHistoryNotifications = (filter: string) => {
		setFilteredNotifications(
			history.filter(notification => notification.type === filter)
		);
		if (filter === translate('all')) {
			setFilteredNotifications(history);
		}
		setSelectedFilterOption(filter);
	};

	return (
		<Menu gutter={0} autoSelect={false}>
			<MenuButton
				h="max-content"
				py="2"
				px="3"
				gap="32"
				fontWeight="normal"
				fontSize={{ md: 'sm', '2xl': 'md' }}
				color={theme.text.primary}
				as={Button}
				rightIcon={<BiChevronDown />}
				bg="white"
				disabled={!isConnected}
				_hover={{}}
				_active={{}}
				_focus={{}}
			>
				{isConnected ? translate('all') : selectedFilterOption}
			</MenuButton>
			<MenuList
				p="0"
				borderTopRadius="none"
				borderColor="white"
				minW={theme.sizes.menuItem}
			>
				{historyFilterOptions.map((option, index) => (
					<MenuItem
						key={+index}
						bg="white"
						color={theme.text.primary}
						fontSize={{ md: 'xs', lg: 'sm' }}
						_hover={{ bg: theme.bg.black, color: 'white' }}
						borderBottom="1px solid"
						borderBottomColor="gray.200"
						borderBottomRadius={
							option === translate('teamCreated') ? 'base' : 'none'
						}
						onClick={() => {
							filterHistoryNotifications(option);
							console.log(filteredNotifications.length);
						}}
						_active={{}}
					>
						{option}
					</MenuItem>
				))}
			</MenuList>
		</Menu>
	);
};

export default TransactionsFilter;
