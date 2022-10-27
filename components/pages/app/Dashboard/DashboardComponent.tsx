import { Flex } from '@chakra-ui/react';
import {
	DashboardHeader,
	Coins,
	CreateOrganizationCard,
	SwapToken,
	HaveProblemCard,
	RecentActivitiesDashboard,
	MyAssets,
	ErrorAlert,
	OrganizationsList,
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
	const isConnected = true;
	const error = false;
	const shouldNotDisplayError = error ? 'none' : 'flex';
	const shouldDisplayError = error ? 'flex' : 'none';
	const shouldNotDisplayDash = isConnected ? 'none' : 'flex';
	const shouldDisplayDash = isConnected ? 'flex' : 'none';
	const theme = usePicasso();
	return (
		<Flex
			bg="white"
			w="full"
			h="95vh"
			m="auto"
			borderLeft="0.25rem solid"
			borderColor={theme.branding.blue}
			borderLeftRadius="sm"
			gap="4"
			justify="space-between"
			py="6"
		>
			<Flex direction="column" px="8" gap="4" display={shouldNotDisplayError}>
				<DashboardHeader />
				<Coins />
				<Flex display={shouldNotDisplayDash}>
					<CreateOrganizationCard />
				</Flex>
				<Flex display={shouldDisplayDash}>
					<OrganizationsList />
				</Flex>
				<Flex display={shouldDisplayDash} gap="6">
					<MyAssets />
					<RecentActivitiesDashboard
						recentActivitiesList={recentActivitiesList}
					/>
				</Flex>
			</Flex>
			<Flex direction="column" gap="2" display={shouldNotDisplayError} px="6">
				<SwapToken />
				<HaveProblemCard />
			</Flex>
			<Flex
				align="center"
				w="full"
				justify="center"
				display={shouldDisplayError}
			>
				<ErrorAlert />
			</Flex>
		</Flex>
	);
};

export default DashboardComponent;
