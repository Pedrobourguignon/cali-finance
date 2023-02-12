import {
	Button,
	Flex,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Text,
} from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import { HistoryData } from 'components';
import { IUserHistory } from 'types';
import { useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { BiChevronDown } from 'react-icons/bi';

export const HistoryDashboard = () => {
	const { t: translate } = useTranslation('company-overall');
	const { t: translateHistory } = useTranslation('history-page');
	const userHistory: IUserHistory[] = [
		{
			icon: '',
			wallet: '0x52908400098527886E0F7030069857D2E4169EE7',
			team: 'Sales Team',
			type: translate('withdrawal'),
			date: '08 Aug 22, 20:57',
			amount: 10000,
			coin: 'USDT',
			status: translate('completed'),
		},
		{
			icon: '',
			wallet: '0x52908400098527886E0F7030069857D2E4169EE7',
			team: 'Sales Team',
			type: translate('withdrawal'),
			date: '08 Aug 22, 20:57',
			amount: 10000,
			coin: 'USDT',
			status: translate('completed'),
		},
		{
			icon: '',
			wallet: '0x52908400098527886E0F7030069857D2E4169EE7',
			team: 'Sales Team',
			type: translate('withdrawal'),
			date: '08 Aug 22, 20:57',
			amount: 10000,
			coin: 'USDT',
			status: translate('completed'),
		},
		{
			icon: '',
			wallet: '0x52908400098527886E0F7030069857D2E4169EE7',
			team: 'Sales Team',
			type: translate('deposit'),
			date: '08 Aug 22, 20:57',
			amount: 10000,
			coin: 'USDT',
			status: translate('pending'),
		},
	];

	const theme = usePicasso();
	const [filteredUserHistory, setFilteredUserHistory] =
		useState<IUserHistory[]>(userHistory);
	const [selectedFilterOption, setSelectedFilterOption] = useState<string>(
		translate('all')
	);

	const filterUserHistory = (filter: string) => {
		setFilteredUserHistory(userHistory.filter(data => data.type === filter));
		if (filter === translate('all')) {
			setFilteredUserHistory(userHistory);
		}
		setSelectedFilterOption(filter);
	};

	const selectOptions = [
		translate('all'),
		translate('withdrawal'),
		translate('deposit'),
	];

	return (
		<Flex direction="column" gap="4">
			<Flex
				w="100%"
				justify="space-between"
				align="center"
				color={theme.text.primary}
			>
				<Text fontWeight="medium">{translate('history')}</Text>
				<Menu gutter={0} autoSelect={false}>
					<MenuButton
						h="max-content"
						py="2"
						px="3"
						w="190px"
						gap="32"
						fontWeight="normal"
						fontSize={{ md: 'sm', '2xl': 'md' }}
						color={theme.text.primary}
						as={Button}
						rightIcon={<BiChevronDown />}
						bg="white"
						_hover={{}}
						_active={{}}
						_focus={{}}
					>
						{selectedFilterOption}
					</MenuButton>
					<MenuList
						p="0"
						borderTopRadius="none"
						borderColor="white"
						minW={theme.sizes.menuItem}
					>
						{selectOptions.map((option, index) => (
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
								onClick={() => filterUserHistory(option)}
								_active={{}}
							>
								{option}
							</MenuItem>
						))}
					</MenuList>
				</Menu>
			</Flex>
			<Flex direction="column" gap="2">
				{filteredUserHistory.map((item, index) => (
					<HistoryData key={+index} userHistory={item} />
				))}
			</Flex>
			{filteredUserHistory.length === 0 && (
				<Flex whiteSpace="normal">
					<Text color={theme.text.primary} fontSize="sm" whiteSpace="normal">
						{translateHistory('noResults')}
						<Text
							decoration="underline"
							color={theme.text.primary}
							fontSize="sm"
							as="span"
							whiteSpace="normal"
							fontWeight="semibold"
							cursor="pointer"
							onClick={() => {
								setFilteredUserHistory(userHistory);
								setSelectedFilterOption(translate('all'));
							}}
						>
							{translateHistory('returnToAllResults')}
						</Text>{' '}
						{translateHistory('orSelectAnother')}
					</Text>
				</Flex>
			)}
		</Flex>
	);
};
