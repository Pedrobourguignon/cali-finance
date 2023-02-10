import { Flex, Select, Text } from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import { HistoryData } from 'components';
import { IUserHistory } from 'types';
import { useState } from 'react';
import useTranslation from 'next-translate/useTranslation';

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
		// {
		// // 	icon: '',
		// // 	wallet: '0x52908400098527886E0F7030069857D2E4169EE7',
		// // 	team: 'Sales Team',
		// // 	type: translate('deposit'),
		// // 	date: '08 Aug 22, 20:57',
		// // 	amount: 10000,
		// // 	coin: 'USDT',
		// // 	status: translate('pending'),
		// // },
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
				<Select
					placeholder={selectedFilterOption}
					w="max-content"
					h="8"
					bg="white"
					onChange={event => filterUserHistory(event.target.value)}
				>
					{selectOptions.map((option, index) => (
						<option style={{ background: 'white' }} key={+index}>
							{option}
						</option>
					))}
				</Select>
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
