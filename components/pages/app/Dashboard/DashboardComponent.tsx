import { Flex, useDisclosure } from '@chakra-ui/react';
import {
	DashboardHeader,
	Coins,
	CreateCompanyCard,
	RecentActivitiesDashboard,
	MyAssets,
	CompaniesList,
	WithdrawModal,
} from 'components';
import React from 'react';
import { IRecentActivitiesList } from 'types';
import useTranslation from 'next-translate/useTranslation';
import { useSession } from 'next-auth/react';
import { NotFoundContainer } from 'containers';

export const DashboardComponent: React.FC = () => {
	const { t: translate } = useTranslation('dashboard');
	const { data: session } = useSession();
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

	return (
		<Flex w="full">
			<Flex direction="column" w="full">
				<Flex direction="column">
					<DashboardHeader />
					<Coins />
				</Flex>
				<Flex direction="column" gap="9" pt={!session ? '4' : 0}>
					{session ? <CompaniesList /> : <CreateCompanyCard />}
					{session && (
						<Flex justify="space-between" w="full" gap="6">
							<Flex w="full" flex="5.5">
								<MyAssets />
							</Flex>
							<Flex w="100%" h="max-content" flex={{ md: '5.5', xl: '4.5' }}>
								<RecentActivitiesDashboard
									recentActivitiesList={recentActivitiesList}
								/>
							</Flex>
						</Flex>
					)}
				</Flex>
			</Flex>
		</Flex>
	);
};

export default DashboardComponent;
