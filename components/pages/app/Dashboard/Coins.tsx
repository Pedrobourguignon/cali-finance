import { Flex, Text } from '@chakra-ui/react';
import { NewCoinButton, CoinCard } from 'components';
import React from 'react';
import { ICoin } from 'types';
import useTranslation from 'next-translate/useTranslation';
import { usePicasso } from 'hooks';

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

export const Coins = () => {
	const { t: translate } = useTranslation('dashboard');
	const theme = usePicasso();
	return (
		<Flex
			justify="space-between"
			bg={theme.bg.primary}
			py="3"
			px={{ md: '3', xl: '4' }}
			borderRadius="base"
			align="center"
			minW={{ lg: '33.713rem', xl: '43.5rem' }}
			minH={{ md: '5rem', lg: '6.44rem' }}
		>
			<Flex direction="column" gap={{ md: '1', xl: '1.5' }}>
				<Text
					fontSize={{ md: 'sm', xl: 'md' }}
					fontWeight="medium"
					lineHeight="6"
				>
					{translate('coins')}
				</Text>
				<Text
					fontSize={{ md: 'xs', xl: 'sm' }}
					fontWeight="medium"
					lineHeight="5"
					whiteSpace="nowrap"
				>
					{translate('stayConnected')}
				</Text>
				<Text
					fontSize={{ md: 'xs', xl: 'sm' }}
					fontWeight="normal"
					lineHeight="5"
				>
					{translate('principalCoins')}
				</Text>
			</Flex>
			<Flex
				justify="space-between"
				mx="4"
				flex="1"
				gap={{ md: '2', '2xl': '4' }}
			>
				{coinCard.map((card, index) => (
					<CoinCard
						coin={card}
						borderColor="gray.50"
						color="white"
						key={+index}
					/>
				))}
			</Flex>
			<Flex>
				<NewCoinButton />
			</Flex>
		</Flex>
	);
};

export default Coins;
