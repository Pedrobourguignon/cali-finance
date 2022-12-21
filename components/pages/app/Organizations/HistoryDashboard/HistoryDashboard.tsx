import { Flex, Select, Text } from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import { HistoryData } from 'components';
import { IUserHistory } from 'types';
import { useState } from 'react';

const selectOptions = ['All', 'Withdrawal', 'Deposit'];

const userHistory: IUserHistory[] = [
	{
		icon: '',
		wallet: '0x52908400098527886E0F7030069857D2E4169EE7',
		team: 'Sales Team',
		type: 'Withdrawal',
		date: '08 Aug 22, 20:57',
		amount: 10000,
		coin: 'USDT',
		status: 'Completed',
	},
	{
		icon: '',
		wallet: '0x52908400098527886E0F7030069857D2E4169EE7',
		team: 'Sales Team',
		type: 'Withdrawal',
		date: '08 Aug 22, 20:57',
		amount: 10000,
		coin: 'USDT',
		status: 'Completed',
	},
	{
		icon: '',
		wallet: '0x52908400098527886E0F7030069857D2E4169EE7',
		team: 'Sales Team',
		type: 'Withdrawal',
		date: '08 Aug 22, 20:57',
		amount: 10000,
		coin: 'USDT',
		status: 'Completed',
	},
	{
		icon: '',
		wallet: '0x52908400098527886E0F7030069857D2E4169EE7',
		team: 'Sales Team',
		type: 'Deposit',
		date: '08 Aug 22, 20:57',
		amount: 10000,
		coin: 'USDT',
		status: 'Pending',
	},
];

export const HistoryDashboard = () => {
	const theme = usePicasso();
	const [filteredUserHistory, setFilteredUserHistory] =
		useState<IUserHistory[]>(userHistory);

	const filterUserHistory = (filter: string) => {
		setFilteredUserHistory(userHistory.filter(data => data.type === filter));
		if (filter === 'All') {
			setFilteredUserHistory(userHistory);
		}
	};
	return (
		<Flex direction="column" gap="4">
			<Flex
				w="100%"
				justify="space-between"
				align="center"
				color={theme.text.primary}
			>
				<Text fontWeight="medium">History</Text>
				<Select
					w="max-content"
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
		</Flex>
	);
};
