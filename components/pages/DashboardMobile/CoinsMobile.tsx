import { Flex, Grid, Text, useDisclosure } from '@chakra-ui/react';
import { NewCoinButton, CoinCardMobile } from 'components';
import { usePicasso } from 'hooks';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import { ICoin } from 'types';

const coinCard: ICoin[] = [
	{
		icon: '/icons/tether.svg',
		name: 'USDT',
		value: '$1,00',
		variation: -0.6,
	},
	{
		icon: '/icons/tether.svg',
		name: 'USDT',
		value: '$1,00',
		variation: 0,
	},
	{
		icon: '/icons/tether.svg',
		name: 'USDT',
		value: '$1,00',
		variation: 0.6,
	},
];

export const CoinsMobile = () => {
	const theme = usePicasso();
	const { t: translate } = useTranslation('dashboard');
	const { onOpen } = useDisclosure();

	return (
		<Flex
			w="full"
			h="full"
			bg={theme.text.primary}
			borderRadius="base"
			boxShadow="md"
		>
			<Flex px="4" pt="3" direction="column" gap="1.5" w="full">
				<Text fontWeight="medium">{translate('coins')}</Text>
				<Text fontSize="sm" lineHeight="5">
					{translate('stayConnectedMobile')}
				</Text>
				<Grid templateColumns="repeat(2, 1fr)" gap="2" pt="2">
					{coinCard.map((card, index) => (
						<CoinCardMobile
							coin={card}
							borderColor="gray.100"
							color="white"
							pr={{ md: '2', xl: '9' }}
							key={+index}
						/>
					))}
				</Grid>
				<Flex>
					<Flex w="full" justify="center" pl="1" pt="4" pb="6">
						<NewCoinButton onOpen={onOpen} />
					</Flex>
				</Flex>
			</Flex>
		</Flex>
	);
};

export default CoinsMobile;
