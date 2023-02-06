import { Flex, Text } from '@chakra-ui/react';
import { useCompanies, usePicasso } from 'hooks';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import React from 'react';

interface ISingleCompanieAlert {
	missingValue: number;
}

export const SingleCompanieAlert: React.FC<ISingleCompanieAlert> = ({
	missingValue,
}) => {
	const theme = usePicasso();
	const { t: translate } = useTranslation('alerts');
	const { companiesWithMissingFunds } = useCompanies();
	return (
		<Flex>
			<Link href="/app/companies">
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
			</Link>
			<Link href="/app/companies">
				<Text
					fontSize={{ md: 'xs', xl: 'sm' }}
					color={theme.bg.primary}
					fontWeight="semibold"
					whiteSpace="nowrap"
				>
					&nbsp;{translate('deposit')}&nbsp;
				</Text>
			</Link>
			<Link href="/app/companies/funds">
				<Text
					fontSize={{ md: 'xs', xl: 'sm' }}
					color={theme.bg.primary}
					whiteSpace="nowrap"
				>
					{translate('atLeast', {
						value: missingValue.toLocaleString('en-US'),
					})}
				</Text>
			</Link>
		</Flex>
	);
};

export default SingleCompanieAlert;
