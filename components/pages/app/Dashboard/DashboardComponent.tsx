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
		<Flex
			// w={{ md: '33.2rem', lg: '35.7rem', xl: '44.5rem', '2xl': '57.375rem' }}
			w="full"
		>
			<Flex
				direction="column"
				pl={{ md: '4', xl: '6' }}
				gap={{ md: '4' }}
				w="full"
			>
				<DashboardHeader />
				<Coins />
				<Flex direction="column" gap={{ md: '6', lg: '7', xl: '9' }}>
					{isConnected ? <OrganizationsList /> : <CreateOrganizationCard />}
					{isConnected && (
						<Flex justify="space-between" w="full" gap="8">
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
