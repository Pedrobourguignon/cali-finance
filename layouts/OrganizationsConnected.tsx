import { Flex } from '@chakra-ui/react';
import {
	DashboardHeader,
	CreateOrganizationCard,
	NewOrganizationsDashboard,
	SwapTokenBar,
	RecentActivities,
	WithdrawalsBanner,
} from 'components';
import { usePicasso } from 'hooks';
import React from 'react';
import { AppLayout } from './appLayout';

const organizations = [
	{
		organizationsQuantity: '3',
		teamsQuantity: '18',
		organizationsMemberQuantity: '185',
		totalFunds: '67,986.09',
		yourOrganizations: [
			{
				logo: '/',
				name: 'kylie Cosmetics',
				funds: '2,234.05',
				members: '2',
			},
			{
				logo: '/',
				name: 'kylie Skin',
				funds: '92,234.11',
				members: '170',
			},
			{
				logo: '/',
				name: 'kylie Baby',
				funds: '5,234.11',
				members: '13',
			},
		],
	},
];
const activities = [
	{
		name: 'Kylie Cosmetics',
		type: 'Deposit',
		date: '08 Aug 22, 20:57',
		value: '10,000',
		coin: 'USDT',
		status: 'Completed',
	},
	{
		name: 'Kylie Baby',
		type: 'Deposit',
		date: '08 Aug 22, 20:57',
		value: '10,000',
		coin: 'USDT',
		status: 'Completed',
	},
	{
		name: 'Kylie Skin',
		type: 'Deposit',
		date: '08 Aug 22, 20:57',
		value: '10,000',
		coin: 'USDT',
		status: 'Completed',
	},
];
export const OrganizationsConnected: React.FC = () => {
	const theme = usePicasso();
	return (
		<AppLayout right={<SwapTokenBar />}>
			<Flex p="6" direction="column" gap="4">
				<DashboardHeader />
				<NewOrganizationsDashboard />
				{organizations[0].organizationsQuantity ? (
					''
				) : (
					<CreateOrganizationCard />
				)}
				{activities ? <RecentActivities activities={activities} /> : ''}
				<WithdrawalsBanner />
			</Flex>
		</AppLayout>
	);
};

export default OrganizationsConnected;
