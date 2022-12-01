import { Flex, useDisclosure } from '@chakra-ui/react';
import {
	DashboardHeader,
	Coins,
	CreateOrganizationCard,
	SwapToken,
	HaveProblemCard,
	RecentActivitiesDashboard,
	TeamsList,
	MyAssets,
	ErrorAlert,
	OrganizationsList,
	WithdrawCard,
	WithdrawModal,
} from 'components';
import { usePicasso } from 'hooks';
import React from 'react';
import { IRecentActivitiesList } from 'types';
import useTranslation from 'next-translate/useTranslation';

export const DashboardComponent: React.FC = () => {
	const { t: translate } = useTranslation('dashboard');

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
	const shouldNotDisplayError = error ? 'none' : 'flex';
	const shouldDisplayError = error ? 'flex' : 'none';
	const shouldNotDisplayDash = isConnected ? 'none' : 'flex';
	const shouldDisplayDash = isConnected ? 'flex' : 'none';
	const theme = usePicasso();
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<Flex
			bg={theme.bg.dashboard}
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
				<WithdrawCard />
				<SwapToken />
			</Flex>
			<Flex
				align="center"
				w="full"
				justify="center"
				display={shouldDisplayError}
			>
				<ErrorAlert />
			</Flex>
			<WithdrawModal isOpen={isOpen} onClose={onClose} />
		</Flex>
	);
};

export default DashboardComponent;
