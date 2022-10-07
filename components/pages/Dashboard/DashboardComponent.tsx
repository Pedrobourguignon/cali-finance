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
	ErrorAlert,
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
	const error = false;
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
			<Flex
				direction="column"
				gap="4"
				display={error === true ? 'none' : 'flex'}
			>
				<DashboardHeader />
				<Coins />
				<Flex display={isLogged === true ? 'none' : 'flex'}>
					<CreateOrganizationCard />
				</Flex>
				<Flex display={isLogged === true ? 'flex' : 'none'} px="8">
					<TeamsList />
				</Flex>
				<Flex display={isLogged === true ? 'flex' : 'none'} px="8" gap="6">
					<MyAssets />
					<RecentActivities recentActivitiesList={recentActivitiesList} />
				</Flex>
			</Flex>
			<Flex
				direction="column"
				gap="2"
				display={error === true ? 'none' : 'flex'}
			>
				<SwapToken />
				<HaveProblemCard />
			</Flex>
			<Flex
				align="center"
				w="full"
				justify="center"
				display={error === true ? 'flex' : 'none'}
			>
				<ErrorAlert />
			</Flex>
		</Flex>
	);
};

export default DashboardComponent;
