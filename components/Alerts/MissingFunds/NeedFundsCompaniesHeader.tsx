import { Flex, Text } from '@chakra-ui/react';
import { useCompanies, usePicasso } from 'hooks';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

export const NeedFundsCompaniesHeader = () => {
	const theme = usePicasso();
	const { displayNeedFundsCard } = useCompanies();
	const { t: translate } = useTranslation('alerts');
	return (
		<Flex
			bg="red.500"
			h="max-content"
			borderRadius="full"
			py={{ base: '0.25', xl: '0.5' }}
			px="4"
			display={displayNeedFundsCard}
		>
			<Text
				fontWeight="medium"
				fontSize={{ base: '2xs', '2xl': 'xs' }}
				color={theme.text.white}
			>
				{translate('needingFunds')}
			</Text>
		</Flex>
	);
};

export default NeedFundsCompaniesHeader;
