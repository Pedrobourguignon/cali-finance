import { Flex } from '@chakra-ui/react';
import {
	DashboardHeader,
	CreateOrganizationCard,
	SwapTokenBar,
	RecentActivities,
	OrganizationsDashboard,
	YourOrganizations,
} from 'components';
import React from 'react';
import { AppLayout } from 'layouts';

const organizations = [
	{
		organizationsQuantity: '3',
		teamsQuantity: '18',
		organizationsMemberQuantity: '185',
		totalFunds: '67,986.09',
		yourOrganizations: [
			{
				logo: '',
				name: 'Kylie Cosmetics',
				funds: '2,234.05',
				members: 2,
			},
			{
				logo: '',
				name: 'Kylie Skin',
				funds: '92,234.11',
				members: 170,
			},
			{
				logo: '',
				name: 'Kylie Baby',
				funds: '5,234.11',
				members: 13,
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
export const OrganizationsConnected: React.FC = () => (
	<AppLayout right={<SwapTokenBar />}>
		<Flex p="6" direction="column" gap="4">
			<DashboardHeader />
			<OrganizationsDashboard
				members={organizations[0].organizationsMemberQuantity}
				organizations={organizations[0].organizationsQuantity}
				teams={organizations[0].teamsQuantity}
				totalFunds={organizations[0].totalFunds}
			/>
			{organizations[0].organizationsQuantity ? (
				<YourOrganizations organization={organizations[0].yourOrganizations} />
			) : (
				<CreateOrganizationCard />
			)}
			{activities ? <RecentActivities activities={activities} /> : ''}
		</Flex>
	</AppLayout>
);

export default OrganizationsConnected;
