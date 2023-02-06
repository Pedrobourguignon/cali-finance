import { Flex, Text } from '@chakra-ui/react';
import { useCompanies, usePicasso } from 'hooks';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

interface IMissingFunds {
	display: string;
}

export const NeedFundsCompaniesHeader: React.FC<IMissingFunds> = () => {
	const theme = usePicasso();
	const { displayNeedFundsCard } = useCompanies();
	const { t: translate } = useTranslation('alerts');
	return (
		<Flex
			bg={theme.bg.needingFunds}
			h="max-content"
			borderRadius="full"
			py="0.25"
			px="4"
			display={displayNeedFundsCard}
		>
			<Text fontWeight="medium" fontSize="2xs" color={theme.text.white}>
				{translate('needingFunds')}
			</Text>
		</Flex>
	);
};

export default NeedFundsCompaniesHeader;
