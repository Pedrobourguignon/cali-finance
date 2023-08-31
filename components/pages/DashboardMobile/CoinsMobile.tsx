import { Flex, Grid, Text } from '@chakra-ui/react';
import { CoinCardMobile } from 'components';
import React, { useEffect, useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useAuth, usePicasso, useProfile, useTokens } from 'hooks';
import { useAccount, useMutation, useQuery } from 'wagmi';
import { ICoin } from 'types';

export const CoinsMobile = () => {
	const { t: translate } = useTranslation('dashboard');
	const { address: walletAddress, isConnected } = useAccount();
	const theme = usePicasso();
	const { getCoinServiceTokens } = useTokens();
	const {
		getProfileData,
		updateUserSettings,
		selectedToken,
		setCardItems,
		cardItems,
	} = useProfile();
	const { session } = useAuth();

	const [listOfTokens, setListOfTokens] = useState<ICoin[]>([]);

	const symbols: string[] = [];

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
		} else if (isLoadingUserData === false) {
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
			w="full"
			h="full"
			bg={theme.text.primary}
			borderRadius="base"
			boxShadow="md"
		>
			<Flex px="4" py="3" direction="column" gap="1.5" w="full">
				<Text fontWeight="medium">{translate('coins')}</Text>
				<Text fontSize="sm" lineHeight="5">
					{translate('stayConnectedMobile')}
				</Text>
				<Grid templateColumns="repeat(2, 1fr)" gap="2" pt="2">
					{cardItems.map((card, index) => (
						<CoinCardMobile
							coin={card}
							borderColor="gray.100"
							color="white"
							pr={{ md: '2', xl: '9' }}
							key={+index}
						/>
					))}
				</Grid>
			</Flex>
		</Flex>
	);
};

export default CoinsMobile;
