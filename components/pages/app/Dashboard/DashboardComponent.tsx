import { Flex, useDisclosure } from '@chakra-ui/react';
import {
	DashboardHeader,
	Coins,
	CreateOrganizationCard,
	RecentActivitiesDashboard,
	MyAssets,
	ErrorAlert,
	OrganizationsList,
	WithdrawModal,
} from 'components';
import React from 'react';
import { IRecentActivitiesList } from 'types';
import useTranslation from 'next-translate/useTranslation';

export const DashboardComponent: React.FC = () => {
	const { t: translate } = useTranslation('dashboard');
	const { isOpen, onClose } = useDisclosure();

	const recentActivitiesList: IRecentActivitiesList[] = [
		{
			type: translate('deposit'),
			date: '08 Aug 22, 20:57',
			value: '10,000 USDT',
			status: translate('completed'),
		},
		{
			type: translate('deposit'),
			date: '08 Aug 22, 20:57',
			value: '10,000 USDT',
			status: translate('completed'),
		},
		{
			type: translate('deposit'),
			date: '08 Aug 22, 20:57',
			value: '10,000 USDT',
			status: translate('completed'),
		},
		{
			type: translate('deposit'),
			date: '08 Aug 22, 20:57',
			value: '10,000 USDT',
			status: translate('completed'),
		},
	];

	const isConnected = true;

	const error = false;

	if (error)
		return (
			<Flex align="center" w="full" justify="center">
				<ErrorAlert />
			</Flex>
		);

	return (
		<Flex w="45.75rem">
			<Flex direction="column" pl="6" gap={{ lg: '4' }} w="full">
				<DashboardHeader />
				<Coins />
				<Flex direction="column" gap={{ lg: '7', xl: '9' }}>
					{isConnected ? <OrganizationsList /> : <CreateOrganizationCard />}
					{isConnected && (
						<Flex justify="space-between" w="full">
							<MyAssets />
							<RecentActivitiesDashboard
								recentActivitiesList={recentActivitiesList}
							/>
						</Flex>
					)}
				</Flex>
			</Flex>
			<WithdrawModal isOpen={isOpen} onClose={onClose} />
		</Flex>
	);
};

export default DashboardComponent;
