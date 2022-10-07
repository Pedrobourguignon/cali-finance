import { Flex, Text } from '@chakra-ui/react';
import { NewCoinButton, CoinCard } from 'components';
import React from 'react';

const cardInfo = {
	icon: '/icons/tether.svg',
	name: 'USDT',
	value: '$1,00',
	variation: '+ 0,6%',
};

export const Coins = () => (
	<Flex
		bg="black"
		color="white"
		w="696px"
		h="24"
		ml="8"
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
