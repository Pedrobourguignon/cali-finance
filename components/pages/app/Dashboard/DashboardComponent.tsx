import { Button, Flex, useDisclosure } from '@chakra-ui/react';
import { Flex, useDisclosure } from '@chakra-ui/react';
import {
	DashboardHeader,
	Coins,
	CreateOrganizationCard,
	SwapToken,
	RecentActivitiesDashboard,
	MyAssets,
	ErrorAlert,
	OrganizationsList,
	EditEmployee,
	WithdrawCard,
	WithdrawModal,
} from 'components';
import { usePicasso } from 'hooks';
import React from 'react';
import { IRecentActivitiesList } from 'types';
import useTranslation from 'next-translate/useTranslation';

export const DashboardComponent: React.FC = () => {
	const { t: translate } = useTranslation('dashboard');
	const { isOpen, onOpen, onClose } = useDisclosure();

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

	const theme = usePicasso();
	const { isOpen, onOpen, onClose } = useDisclosure();

	if (error)
		return (
			<Flex align="center" w="full" justify="center">
				<ErrorAlert />
			</Flex>
		);

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
			<EditEmployee
				employeeName="Kim Kardashian"
				employeeWalletAddress="0x6856...BF99"
				isOpen={isOpen}
				onClose={onClose}
			/>
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
				<Button
					bg="#121212"
					_hover={{}}
					_active={{}}
					_focus={{}}
					onClick={onOpen}
				>
					asdasd
				</Button>
			<Flex direction="column" px="8" gap="4">
				<DashboardHeader />
				<Coins />
				{isConnected ? <OrganizationsList /> : <CreateOrganizationCard />}
				{isConnected && (
					<Flex gap="6" flexWrap="wrap">
						<MyAssets />
						<RecentActivitiesDashboard
							recentActivitiesList={recentActivitiesList}
						/>
					</Flex>
				)}
			</Flex>
			<Flex
				direction="column"
				gap="2"
				px="6"
				display={{ base: 'none', md: 'flex' }}
			>
				<WithdrawCard />
				<SwapToken />
			</Flex>
			<WithdrawModal isOpen={isOpen} onClose={onClose} />
		</Flex>
	);
};

export default DashboardComponent;
