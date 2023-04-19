import { Flex, Text } from '@chakra-ui/react';
import { CreateCompanyCard, CompaniesDashboardNoConnected } from 'components';
import React from 'react';
import { usePicasso } from 'hooks';
import useTranslation from 'next-translate/useTranslation';

export const CompaniesNoConnectedMobile: React.FC = () => {
	const theme = usePicasso();
	const { t: translate } = useTranslation('companies');
	return (
		<Flex direction="column" gap="12" py="6" w="100%">
			<Flex direction="column">
				<CompaniesDashboardNoConnected />
			</Flex>
			<Flex direction="column" gap="4">
				<Text color={theme.text.primary} fontWeight="medium">
					{translate('yourCompanies')}
				</Text>
				<CreateCompanyCard />
			</Flex>
		</Flex>
	);
};

export default CompaniesNoConnectedMobile;
