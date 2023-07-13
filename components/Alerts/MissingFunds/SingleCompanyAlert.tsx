import { Flex, Text, Link } from '@chakra-ui/react';
import { useCompanies, usePicasso } from 'hooks';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import NextLink from 'next/link';
import { navigationPaths } from 'utils';

export const SingleCompanyAlert: React.FC<{ missingValue: number }> = ({
	missingValue,
}) => {
	const theme = usePicasso();
	const { t: translate } = useTranslation('alerts');
	const { companiesWithMissingFunds } = useCompanies();
	return (
		<Flex>
			<Text
				fontSize={{ md: 'xs', xl: 'sm' }}
				color={theme.bg.primary}
				pl="2.5"
				whiteSpace="nowrap"
			>
				{translate('yourCompanieIsMissing', {
					companie: companiesWithMissingFunds[0]?.name,
				})}
			</Text>

			<Link href={navigationPaths.dashboard.companies.funds('1')} as={NextLink}>
				<Text
					cursor="pointer"
					fontSize={{ md: 'xs', xl: 'sm' }}
					color={theme.bg.primary}
					fontWeight="semibold"
					whiteSpace="nowrap"
				>
					&nbsp;{translate('deposit')}&nbsp;
				</Text>
			</Link>
			<Text
				fontSize={{ md: 'xs', xl: 'sm' }}
				color={theme.bg.primary}
				whiteSpace="nowrap"
			>
				{translate('atLeast', {
					value: missingValue.toLocaleString('en-US'),
				})}
			</Text>
		</Flex>
	);
};

export default SingleCompanyAlert;
