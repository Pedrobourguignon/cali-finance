import { Flex, Text } from '@chakra-ui/react';
import { NewCoinButton, CoinCard } from 'components';
import React from 'react';
import { ICoinCard } from 'types';

const cardInfo: ICoinCard = {
	icon: '/icons/tether.svg',
	name: 'USDT',
	value: '$1,00',
	variation: '+ 0,6%',
};

export const Coins = () => (
	<Flex
		w="max-content"
		h="max-content"
		p="3"
		gap="4"
		bg="black"
		color="white"
		borderRadius="base"
		justify="space-between"
		align="center"
	>
		<Flex direction="column">
			<Text fontSize="md" fontWeight="medium" lineHeight="6">
				Coins
			</Text>
			<Text fontSize="sm" fontWeight="medium" lineHeight="5">
				Stay always tuned on{' '}
			</Text>
			<Text fontSize="sm" fontWeight="medium" lineHeight="5">
				principal coin prices
			</Text>
		</Flex>
		<CoinCard
			icon={cardInfo.icon}
			name={cardInfo.name}
			value={cardInfo.value}
			variation={cardInfo.variation}
		/>
		<CoinCard
			icon={cardInfo.icon}
			name={cardInfo.name}
			value={cardInfo.value}
			variation={cardInfo.variation}
		/>
		<CoinCard
			icon={cardInfo.icon}
			name={cardInfo.name}
			value={cardInfo.value}
			variation={cardInfo.variation}
		/>
		<NewCoinButton />
	</Flex>
);

export default Coins;
