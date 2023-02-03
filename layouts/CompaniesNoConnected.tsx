import { Flex, Text } from '@chakra-ui/react';
import {
	DashboardHeader,
	CreateCompanyCard,
	CompaniesDashboardNoConnected,
	CreateAccountBanner,
} from 'components';
import React from 'react';
import { AppLayout } from 'layouts';
import { usePicasso } from 'hooks';

export const CompaniesLayoutNoConnected: React.FC = () => {
	const theme = usePicasso();
	return (
		<AppLayout right={<CreateAccountBanner />}>
			<Flex direction="column" gap="12" py="6" w="100%">
				<Flex direction="column" gap="4">
					<DashboardHeader />
					<CompaniesDashboardNoConnected />
				</Flex>
				<Flex direction="column" gap="4">
					<Text color={theme.text.primary} fontWeight="medium">
						Your Companies
					</Text>
					<CreateCompanyCard />
				</Flex>
			</Flex>
		</AppLayout>
	);
};

export default CompaniesLayoutNoConnected;
