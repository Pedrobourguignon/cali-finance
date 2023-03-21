import { Flex, list, Text, useDisclosure } from '@chakra-ui/react';
import { NewCoinButton, CoinCard, TokenSelector } from 'components';
import React, { useEffect, useState } from 'react';
import { ICoin, ISelectedCoin } from 'types';
import useTranslation from 'next-translate/useTranslation';
import { usePicasso, useProfile, useTokens } from 'hooks';
import { useMutation, useQuery } from 'react-query';

export const Coins = () => {
	const { t: translate } = useTranslation('dashboard');
	const theme = usePicasso();
	const { getCoinServiceTokens } = useTokens();
	const { isOpen, onClose, onOpen } = useDisclosure();
	const [selectedToken, setSelectedToken] = useState<ISelectedCoin>(
		{} as ISelectedCoin
	);
	const { updateUserSettings, getProfileData } = useProfile();

	const [cardItems, setCardItems] = useState<ICoin[]>([]);

	const {
		data: userData,
		isLoading: isLoadingUserData,
		error: errorUserData,
		refetch: refetchUserData,
	} = useQuery('get-user-data', () => getProfileData());
	const favoriteCoins = userData?.settings?.coin;

	const [listOfTokens, setListOfTokens] = useState<ICoin[]>([]);

	const symbols: ICoin[] = [];

	const { mutate } = useMutation(
		(settings: { coin: ICoin[] }) => updateUserSettings(settings),
		{
			onSuccess: () => console.log('done'),
		}
	);

	const {
		data: coinServiceTokens,
		isLoading,
		error,
		refetch: refetchCoinServiceTokens,
	} = useQuery('get-coin-data', () => getCoinServiceTokens(symbols.toString()));

	useEffect(() => {
		if (Object.keys(selectedToken).length !== 0) {
			if (
				!listOfTokens!.find(
					coin =>
						coin.symbol.toLowerCase() === selectedToken.symbol.toLowerCase()
				)
			)
				setListOfTokens(listOfTokens!.concat(selectedToken));
		}
	}, [selectedToken]);

	useEffect(() => {
		if (listOfTokens!.length !== 0) {
			mutate({ coin: listOfTokens });
			refetchUserData();
		}
	}, [listOfTokens]);

	useEffect(() => {
		// if (favoriteCoins)
		// 	Object.values(favoriteCoins).forEach(item => {
		// 		symbols.push(item.symbol);
		// 	});
		refetchCoinServiceTokens();
	}, [favoriteCoins]);

	useEffect(() => {
		if (coinServiceTokens) {
			const tokens = Object.values(coinServiceTokens).reduce((acc, item) => {
				if (item && favoriteCoins)
					if (
						!cardItems.find(
							coin => coin.symbol.toLowerCase() === item.symbol.toLowerCase()
						)
					) {
						// const logo = Object.values(favoriteCoins).find(
						// 	token => token.symbol.toLowerCase() === item.symbol.toLowerCase()
						// );
						// acc.push({ ...item, ...logo });
					}
				return acc;
			}, [] as ICoin[]);
			setCardItems(cardItems.concat(tokens));
		}
	}, [coinServiceTokens]);

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
				{cardItems.map((card, index) => (
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
