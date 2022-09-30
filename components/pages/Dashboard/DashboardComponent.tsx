import { Flex } from '@chakra-ui/react';
import {
	DashboardHeader,
	Coins,
	CreateOrganizationCard,
	SwapToken,
	HaveProblemCard,
	TeamsList,
	MyAssets,
	RecentActivities,
} from 'components';
import { usePicasso } from 'hooks';
import React from 'react';
import { IRecentActivitiesList } from 'types';

const recentActivitiesList: IRecentActivitiesList[] = [
	{
		type: 'Deposit',
		date: '08 Aug 22, 20:57',
		value: '10,000 USDT',
		status: 'Completed',
	},
	{
		type: 'Deposit',
		date: '08 Aug 22, 20:57',
		value: '10,000 USDT',
		status: 'Completed',
	},
	{
		type: 'Deposit',
		date: '08 Aug 22, 20:57',
		value: '10,000 USDT',
		status: 'Completed',
	},
	{
		type: 'Deposit',
		date: '08 Aug 22, 20:57',
		value: '10,000 USDT',
		status: 'Completed',
	},
];

export const DashboardComponent: React.FC = () => {
	const isLogged = true;
	const theme = usePicasso();
	return (
		<Flex
			bg="white"
			w="full"
			h="95vh"
			m="auto"
			borderLeft="0.25rem solid"
			borderColor={theme.branding.blue}
		>
			<Flex direction="column">
				<DashboardHeader />
				<Coins />
				<Flex display={isLogged === true ? 'none' : 'flex'}>
					<CreateOrganizationCard />
				</Flex>
				<Flex display={isLogged === true ? 'flex' : 'none'} mt="8">
					<TeamsList />
				</Flex>
				<Flex display={isLogged === true ? 'flex' : 'none'}>
					<MyAssets />
					<RecentActivities recentActivitiesList={recentActivitiesList} />
				</Flex>
			</Flex>
			<Flex direction="column" gap="6">
				<SwapToken />
				<HaveProblemCard />
			</Flex>
		</Flex>
	);
};

export default DashboardComponent;
