import { Flex, Text } from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import React from 'react';

export const MultipleCompaniesAlert = () => {
	const theme = usePicasso();
	const { t: translate } = useTranslation('alerts');
	return (
		<Flex>
			<Text
				pl="2.5"
				fontSize={{ md: 'xs', xl: 'sm' }}
				color={theme.bg.primary}
				whiteSpace="nowrap"
			>
				{translate('yourCompanies')}
			</Text>
			<Link href="/app/companies">
				<Text
					cursor="pointer"
					fontSize={{ md: 'xs', xl: 'sm' }}
					color={theme.bg.primary}
					whiteSpace="nowrap"
					fontWeight="semibold"
				>
					&nbsp;{translate('depositFunds')}&nbsp;
				</Text>
			</Link>
			<Text
				fontSize={{ md: 'xs', xl: 'sm' }}
				color={theme.bg.primary}
				whiteSpace="nowrap"
			>
				{translate('companiesPage')}
			</Text>
		</Flex>
	);
};

export default MultipleCompaniesAlert;
