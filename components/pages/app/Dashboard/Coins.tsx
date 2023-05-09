import { Flex, Text, useDisclosure } from '@chakra-ui/react';
import { NewCoinButton, CoinCard, TokenSelector } from 'components';
import React, { useEffect, useState } from 'react';
import { ICoin, ISelectedCoin } from 'types';
import useTranslation from 'next-translate/useTranslation';
import { usePicasso, useProfile, useTokens } from 'hooks';
import { useMutation, useQuery } from 'react-query';
import { useAccount } from 'wagmi';

export const Coins = () => {
	const { t: translate } = useTranslation('dashboard');
	const theme = usePicasso();
	const { getCoinServiceTokens } = useTokens();
	const { isOpen, onClose, onOpen } = useDisclosure();
	const { isConnected, address } = useAccount();
	const [selectedToken, setSelectedToken] = useState<ISelectedCoin>(
		{} as ISelectedCoin
	);
	const { updateUserSettings, getProfileData } = useProfile();

	const [cardItems, setCardItems] = useState<ICoin[]>([]);

	const {
		data: userData,
		refetch: refetchUserData,
		isLoading: isLoadingUserData,
	} = useQuery('get-user-data', () => getProfileData(address), {
		enabled: !!isConnected,
	});

	const favoriteCoins = userData?.settings?.coin as ICoin[];

	const [listOfTokens, setListOfTokens] = useState<ICoin[]>([]);
	const [flexWidth, setFlexWidth] = useState<number>();

	const symbols: string[] = [];

	const { mutate } = useMutation(
		(settings: { coin: ICoin[] }) => updateUserSettings(settings),
		{
			onSuccess: () => refetchUserData(),
		}
	);

	const { data: coinServiceTokens, refetch: refetchCoinServiceTokens } =
		useQuery('get-coin-data', () => getCoinServiceTokens(symbols.toString()));

	const setInitialWidth = () => {
		if (window.innerWidth < 1200) setFlexWidth(2);
		else if (window.innerWidth > 1200 && window.innerWidth < 1390)
			setFlexWidth(3);
		else if (window.innerWidth > 1391 && window.innerWidth < 1560)
			setFlexWidth(4);
		else if (window.innerWidth > 1561 && window.innerWidth < 1690)
			setFlexWidth(5);
		else if (window.innerWidth > 1691 && window.innerWidth < 1820)
			setFlexWidth(6);
		else if (window.innerWidth > 1821 && window.innerWidth < 1900)
			setFlexWidth(7);
	};

	useEffect(() => {
		window.onresize = () => {
			if (window.innerWidth < 1200) setFlexWidth(2);
			else if (window.innerWidth > 1200 && window.innerWidth < 1390)
				setFlexWidth(3);
			else if (window.innerWidth > 1391 && window.innerWidth < 1560)
				setFlexWidth(4);
			else if (window.innerWidth > 1561 && window.innerWidth < 1690)
				setFlexWidth(5);
			else if (window.innerWidth > 1691 && window.innerWidth < 1820)
				setFlexWidth(6);
			else if (window.innerWidth > 1821 && window.innerWidth < 1900)
				setFlexWidth(7);
		};
	}, [() => window.onresize]);

	useEffect(() => {
		setInitialWidth();
	}, []);

	useEffect(() => {
		if (Object.keys(selectedToken).length !== 0) {
			if (
				!listOfTokens.find(
					coin =>
						coin.symbol.toLowerCase() === selectedToken.symbol.toLowerCase()
				)
			)
				setListOfTokens(listOfTokens.concat(selectedToken));
		}
	}, [selectedToken]);

	useEffect(() => {
		if (favoriteCoins) {
			listOfTokens.forEach(item => {
				if (
					!favoriteCoins.find(
						coin => coin.symbol.toLowerCase() === item.symbol.toLowerCase()
					)
				) {
					mutate({ coin: listOfTokens });
				}
			});
		} else {
			mutate({ coin: listOfTokens });
		}
	}, [listOfTokens]);

	// checking if the token is already in the favorites list
	const checkingAlreadyFavorite = () => {
		if (!isLoadingUserData)
			Object.values(favoriteCoins).forEach(item => {
				symbols.push(item.symbol);
				if (
					!listOfTokens.find(
						coin => coin.symbol.toLowerCase() === item.symbol.toLowerCase()
					)
				)
					setListOfTokens(listOfTokens.concat(favoriteCoins));
			});
	};

	// Put coin logo in object
	const putLogoInCoin = () => {
		if (coinServiceTokens) {
			const tokens = Object.values(coinServiceTokens).reduce((acc, item) => {
				if (item)
					if (
						!cardItems.find(
							coin => coin.symbol.toLowerCase() === item.symbol.toLowerCase()
						)
					) {
						const logo = Object.values(favoriteCoins).find(
							token => token.symbol.toLowerCase() === item.symbol.toLowerCase()
						);
						acc.push({ ...item, ...logo });
					}
				return acc;
			}, [] as ICoin[]);
			setCardItems(cardItems.concat(tokens));
		}
	};

	useEffect(() => {
		if (isLoadingUserData === false && !favoriteCoins) {
			setListOfTokens([
				{
					symbol: 'eth',
					logo: 'https://tokens.1inch.io/0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee.png',
				},
				{
					symbol: 'busd',
					logo: 'https://tokens.1inch.io/0x4fabb145d64652a948d72533023f6e7a623c7c53.png',
				},
				{
					symbol: 'usdc',
					logo: 'https://tokens.1inch.io/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.png',
				},
			]);
		} else {
			checkingAlreadyFavorite();
			refetchCoinServiceTokens();
		}
	}, [favoriteCoins, isLoadingUserData]);

	useEffect(() => {
		putLogoInCoin();
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
				{cardItems.slice(0, flexWidth).map((card, index) => (
					<CoinCard
						coin={card}
						borderColor="gray.100"
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
