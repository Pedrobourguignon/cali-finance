import { Flex, list, Text, useDisclosure } from '@chakra-ui/react';
import { NewCoinButton, CoinCard, TokenSelector } from 'components';
import React, { useEffect, useState } from 'react';
import { ICoin, ISelectedCoin } from 'types';
import useTranslation from 'next-translate/useTranslation';
import { usePicasso, useTokens } from 'hooks';
import { useMutation, useQuery } from 'react-query';

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
	const { getCoinServiceTokens } = useTokens();
	const { isOpen, onClose, onOpen } = useDisclosure();
	const [selectedToken, setSelectedToken] = useState<ISelectedCoin>(
		{} as ISelectedCoin
	);
	const [listOfTokens, setListOfTokens] = useState<ISelectedCoin[]>([]);
	const symbols: string[] = [];
	console.log(listOfTokens);

	const { data, isLoading, error } = useQuery('get-coin-data', () =>
		getCoinServiceTokens(symbols.toString())
	);
	console.log(data);

	useEffect(() => {
		if (Object.keys(selectedToken).length !== 0) {
			setListOfTokens(prevState => prevState.concat(selectedToken));
		}
	}, [selectedToken]);

	useEffect(() => {
		if (listOfTokens.length !== 0) {
			listOfTokens.forEach(item => symbols.push(item.symbol));
		}
	}, [listOfTokens]);
	return (
		<Flex
			justify="space-between"
			bg={theme.bg.primary}
			py="3"
			px={{ md: '3', xl: '4' }}
			borderRadius="base"
			align="center"
			minW={{ md: '33.713rem', '2xl': '43.5rem' }}
			minH={{ md: '5rem', lg: '6.44rem' }}
		>
			<TokenSelector
				setToken={setSelectedToken}
				isOpen={isOpen}
				onClose={onClose}
			/>
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
			<Flex justify="flex-start" mx="4" flex="1" gap={{ md: '4', '2xl': '4' }}>
				{coinCard.map((card, index) => (
					<CoinCard
						coin={card}
						borderColor="gray.50"
						color="white"
						pr={{ md: '2', xl: '9' }}
						key={+index}
					/>
				))}
			</Flex>
			<Flex>
				<NewCoinButton onOpen={onOpen} />
			</Flex>
		</Flex>
	);
};

export default Coins;
