import { Flex, Text } from '@chakra-ui/react';
import {
	DashboardHeader,
	CreateCompanyCard,
	SwapTokenBar,
	CompaniesDashboardNoConnected,
} from 'components';
import React from 'react';
import { AppLayout } from 'layouts';
import { usePicasso } from 'hooks';

export const CompaniesLayoutNoConnected: React.FC = () => {
	const theme = usePicasso();
	return (
		<AppLayout right={<SwapTokenBar />}>
			<Flex direction="column" gap="4" py="6" w="100%">
				<DashboardHeader />
				<CompaniesDashboardNoConnected />
				<Text color={theme.text.primary} fontWeight="medium">
					Your Companies
				</Text>
				<CreateCompanyCard />
			</Flex>
		</AppLayout>
	);
};

export default CompaniesLayoutNoConnected;
