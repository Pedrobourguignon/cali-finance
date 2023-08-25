import { Flex, Text, useMediaQuery } from '@chakra-ui/react';
import { useCompanies, usePicasso } from 'hooks';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

export const NeedFundsCompaniesHeader = () => {
	const theme = usePicasso();
	const { displayNeedFundsCard } = useCompanies();
	const [isLargerThan767] = useMediaQuery('(min-width: 767px)');

	const { t: translate } = useTranslation('alerts');
	return isLargerThan767 ? (
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
	) : (
		<Flex
			position="absolute"
			top="7"
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
