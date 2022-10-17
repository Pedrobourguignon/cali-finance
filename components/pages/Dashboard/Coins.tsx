import { Flex, Text } from '@chakra-ui/react';
import { NewCoinButton, CoinCard } from 'components';
import React from 'react';
import { ICoinCard } from 'types';

const coinCard: ICoinCard[] = [
	{
		icon: '/icons/tether.svg',
		name: 'USDT',
		value: '$1,00',
		variation: '+ 0,6%',
	},
	{
		icon: '/icons/tether.svg',
		name: 'USDT',
		value: '$1,00',
		variation: '+ 0,6%',
	},
	{
		icon: '/icons/tether.svg',
		name: 'USDT',
		value: '$1,00',
		variation: '+ 0,6%',
	},
];

export const Coins = () => (
	<Flex
		bg="black"
		color="white"
		h="max-content"
		p="3"
		borderRadius="base"
		justify="space-between"
	>
		<Flex direction="column">
			<Text fontSize="md" fontWeight="500" lineHeight="6">
				Coins
			</Text>
			<Text fontSize="sm" fontWeight="500" lineHeight="5">
				Stay always tuned on{' '}
			</Text>
			<Text fontSize="sm" fontWeight="500" lineHeight="5">
				principal coin prices
			</Text>
		</Flex>
		{coinCard.map((card, index) => (
			<CoinCard
				key={+index}
				icon={card.icon}
				name={card.name}
				value={card.value}
				variation={card.variation}
			/>
		))}

		<NewCoinButton />
	</Flex>
);

export default Coins;
