import { Flex, Text } from '@chakra-ui/react';
import { CoinCard } from 'components';
import React, { useEffect, useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useAuth, usePicasso, useProfile, useTokens } from 'hooks';
import { ICoin } from 'types';
import { useAccount, useMutation, useQuery } from 'wagmi';

export const Coins = () => {
	const { t: translate } = useTranslation('dashboard');
	const { address: walletAddress, isConnected } = useAccount();
	const theme = usePicasso();
	const { getCoinServiceTokens } = useTokens();
	const { session } = useAuth();
	const [flexWidth, setFlexWidth] = useState<number>();
	const {
		getProfileData,
		updateUserSettings,
		selectedToken,
		setCardItems,
		cardItems,
	} = useProfile();
	const [selectedTokens, setSelectedTokens] = useState<ICoin[]>([]);

	const symbols: string[] = [];

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

	const {
		data: userData,
		refetch: refetchUserData,
		isLoading: isLoadingUserData,
	} = useQuery(['get-user-data'], () => getProfileData(walletAddress), {
		enabled: !!isConnected && !!session,
	});

	const favoriteCoins = userData?.settings?.coin as ICoin[];

	const { mutate } = useMutation(
		(settings: { coin: ICoin[] }) =>
			updateUserSettings(settings, walletAddress),
		{
			onSuccess: () => refetchUserData(),
		}
	);

	const { data: coinServiceTokens, refetch: refetchCoinServiceTokens } =
		useQuery(['get-coin-data'], () => getCoinServiceTokens(symbols.toString()));

	useEffect(() => {
		if (Object.keys(selectedToken).length !== 0) {
			if (
				!selectedTokens.find(
					coin =>
						coin.symbol.toLowerCase() === selectedToken.symbol.toLowerCase()
				)
			)
				setSelectedTokens(selectedTokens.concat(selectedToken));
		}
	}, [selectedToken]);

	useEffect(() => {
		if (favoriteCoins) {
			selectedTokens.forEach(item => {
				if (
					!favoriteCoins.find(
						coin => coin.symbol.toLowerCase() === item.symbol.toLowerCase()
					)
				) {
					mutate({ coin: selectedTokens });
				}
			});
		} else if (isLoadingUserData === false) {
			mutate({ coin: selectedTokens });
		}
	}, [selectedTokens]);

	// checking if the token is already in the favorites list
	const checkingAlreadyFavorite = () => {
		if (!isLoadingUserData)
			Object.values(favoriteCoins).forEach(item => {
				symbols.push(item.symbol);
				if (
					!selectedTokens.find(
						coin => coin.symbol.toLowerCase() === item.symbol.toLowerCase()
					)
				)
					setSelectedTokens(selectedTokens.concat(favoriteCoins));
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
						if (favoriteCoins) {
							const logo = Object.values(favoriteCoins).find(
								token =>
									token.symbol.toLowerCase() === item.symbol.toLowerCase()
							);
							acc.push({ ...item, ...logo });
						}
					}
				return acc;
			}, [] as ICoin[]);
			setCardItems(cardItems.concat(tokens));
		}
	};
	useEffect(() => {
		if (
			isLoadingUserData === false &&
			(!favoriteCoins || favoriteCoins.length === 0)
		) {
			setSelectedTokens([
				{
					symbol: 'eth',
					logo: 'https://tokens-data.1inch.io/images/0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee.png',
				},
				{
					symbol: 'btc',
					logo: 'https://tokens-data.1inch.io/images/0x2260fac5e5542a773aa44fbcfedf7c193bc2c599.png',
				},
				{
					symbol: 'usdt',
					logo: 'https://tokens.1inch.io/0xdac17f958d2ee523a2206206994597c13d831ec7.png',
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
						borderColor="gray.100"
						color="white"
						pr={{ md: '2', xl: '9' }}
						key={+index}
					/>
				))}
			</Flex>
		</Flex>
	);
};

export default Coins;
