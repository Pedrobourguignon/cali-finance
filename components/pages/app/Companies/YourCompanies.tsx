import { Flex, Text } from '@chakra-ui/react';
import { CompanyCard } from 'components';
import { useCompanies, usePicasso } from 'hooks';
import useTranslation from 'next-translate/useTranslation';

export const YourCompanies = () => {
	const { companies } = useCompanies();
	const { t: translate } = useTranslation('companies');
	const theme = usePicasso();

	return (
		<Flex direction="column" gap="4" w="full">
			<Text
				color={theme.text.primary}
				fontSize={{ md: 'sm', xl: 'md' }}
				fontWeight="medium"
			>
				{translate('yourCompanies')}
			</Text>
			<Flex gap={{ md: '4', '2xl': '6' }} w="full">
				{companies.map((team, index) => (
					<CompanyCard key={+index} team={team} />
				))}
			</Flex>
		</Flex>
	);
};
