import { Flex, Text } from '@chakra-ui/react';
import { NewCoinButton, CoinCard } from 'components';
import React from 'react';
import { ICoin } from 'types';
import useTranslation from 'next-translate/useTranslation';

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
	return (
		<Flex
			bg="black"
			color="white"
			h="max-content"
			p={{ md: '2', lg: '3', xl: '3' }}
			borderRadius="base"
			justify="space-between"
			align="center"
			w="full"
			flexWrap="wrap"
		>
			<Flex direction="column">
				<Text fontSize={{ lg: 'sm', xl: 'md' }} fontWeight="500" lineHeight="6">
					{translate('coins')}
				</Text>
				<Text fontSize={{ md: 'xs', xl: 'sm' }} fontWeight="500" lineHeight="5">
					{translate('stayConnected')}
				</Text>
				<Text fontSize={{ md: 'xs', xl: 'sm' }} fontWeight="500" lineHeight="5">
					{translate('principalCoins')}
				</Text>
			</Flex>
			{coinCard.map((card, index) => (
				<CoinCard
					key={+index}
					coin={card}
					borderColor="gray.50"
					color="white"
				/>
			))}
			<Flex pr={{ lg: '2', xl: '0' }}>
				<NewCoinButton />
			</Flex>
		</Flex>
	);
};

export default Coins;
