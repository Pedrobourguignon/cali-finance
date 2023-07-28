import { Flex } from '@chakra-ui/react';
import {
	Coins,
	CreateCompanyCard,
	RecentActivitiesDashboard,
	MyAssets,
	CompaniesListFixed,
	DashboardHeader,
} from 'components';
import React from 'react';
import { useAuth } from 'hooks';

export const DashboardComponent: React.FC = () => {
	const { session } = useAuth();

	return (
		<Flex w="full">
			<Flex direction="column" w="full">
				<Flex direction="column">
					<DashboardHeader />
					<Coins />
				</Flex>
				<Flex direction="column" gap="9" pt={!session ? '4' : 0}>
					{session ? <CompaniesListFixed /> : <CreateCompanyCard />}
					{session && (
						<Flex justify="space-between" w="full" gap="6">
							<Flex w="full" flex="5.5">
								<MyAssets />
							</Flex>
							<Flex w="100%" h="max-content" flex={{ md: '5.5', xl: '4.5' }}>
								<RecentActivitiesDashboard />
							</Flex>
						</Flex>
					)}
				</Flex>
			</Flex>
		</Flex>
	);
};

export default DashboardComponent;
