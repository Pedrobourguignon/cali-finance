import { Flex, Text } from '@chakra-ui/react';
import {
	CreateCompanyCard,
	CompaniesDashNoConnectedMob,
	DashboardHeader,
} from 'components';
import React from 'react';
import { usePicasso } from 'hooks';
import useTranslation from 'next-translate/useTranslation';
import { MobileLayout } from 'layouts';

export const CompaniesNoConnectedMobile: React.FC = () => {
	const theme = usePicasso();
	const { t: translate } = useTranslation('companies');
	return (
		<MobileLayout>
			<Flex direction="column" gap="12" w="100%" h="100vh">
				<Flex direction="column">
					<DashboardHeader />
					<CompaniesDashNoConnectedMob />
				</Flex>
				<Flex direction="column" gap="4">
					<Text color={theme.text.primary} fontWeight="medium">
						{translate('yourCompanies')}
					</Text>
					<CreateCompanyCard />
				</Flex>
			</Flex>
		</MobileLayout>
	);
};

export default CompaniesNoConnectedMobile;
