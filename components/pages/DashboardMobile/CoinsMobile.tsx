import { Flex, Text, useDisclosure } from '@chakra-ui/react';
import { NewCoinButton } from 'components/Buttons';
import { usePicasso } from 'hooks';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

export const CoinsMobile = () => {
	const theme = usePicasso();
	const { t: translate } = useTranslation('dashboard');
	const { onOpen } = useDisclosure();

	return (
		<Flex w="full" h="245px" bg={theme.text.primary} borderRadius="base">
			<Flex pl="4" pt="2.5" direction="column" gap="1.5">
				<Text fontWeight="medium">{translate('coins')}</Text>
				<Text fontSize="sm" lineHeight="5">
					{translate('stayConnectedMobile')}
				</Text>
				<Flex w="full">
					<NewCoinButton onOpen={onOpen} />
				</Flex>
			</Flex>
		</Flex>
	);
};

export default CoinsMobile;
