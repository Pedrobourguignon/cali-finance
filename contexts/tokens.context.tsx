import { COIN_SERVICE_ROUTES } from 'helpers';
import debounce from 'lodash.debounce';
import React, { createContext, useEffect, useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { ICoin, ISelectedCoin, ISwapTokenSelector, IToken } from 'types';
import { coinClient } from 'utils';

interface IUsdtQuotation {
	USDT: {
		value: number;
		change: number;
		symbol: string;
	};
}
interface ITokensContext {
	setFilteredTokens: (tokens: IToken[]) => void;
	filteredTokens: IToken[];
	handleSearchToken: (event: string, listOfTokens: IToken[]) => void;
	listOfTokens: IToken[];
	setChosenToken: React.Dispatch<React.SetStateAction<ISelectedCoin>>;
	chosenToken: ISelectedCoin;
	swapTokenSelector: ISwapTokenSelector;
	setSwapTokenSelector: React.Dispatch<
		React.SetStateAction<ISwapTokenSelector>
	>;
	getCoinServiceTokens: (
		symbols: string
	) => Promise<
		Record<string, { value: number; change: number; symbol: string }>
	>;
	setCoins: React.Dispatch<React.SetStateAction<ICoin[]>>;
	coins: ICoin[];
	usdtQuotation: IUsdtQuotation;
}

export const TokensContext = createContext({} as ITokensContext);

export const TokensProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [listOfTokens, setListOfTokens] = useState<IToken[]>([]);
	const [filteredTokens, setFilteredTokens] = useState<IToken[]>([]);
	const [chosenToken, setChosenToken] = useState<ISelectedCoin>({
		logo: 'https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png?1547033579',
		symbol: 'BTC',
	} as ISelectedCoin);
	const [swapTokenSelector, setSwapTokenSelector] =
		useState<ISwapTokenSelector>({
			paidAmount: '',
			paidToken: '',
			receivedAmount: '',
			receivedToken: '',
		} as ISwapTokenSelector);
	const [coins, setCoins] = useState<ICoin[]>([]);
	const [usdtQuotation, setUsdtQuotation] = useState<IUsdtQuotation>(
		{} as IUsdtQuotation
	);

	// eslint-disable-next-line consistent-return
	const getOneInchTokens = async () => {
		try {
			const fetchTokens = await fetch('/api/tokens');
			const tokens = fetchTokens.json();
			const promiseResult = await Promise.all([tokens]);
			const allTokens: IToken[] = promiseResult[0].tokens;
			allTokens.sort((coinA, coinB) => (coinA.symbol >= coinB.symbol ? 1 : -1));
			setListOfTokens(allTokens);
			setFilteredTokens(allTokens);
			return listOfTokens;
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		getOneInchTokens();
	}, []);

	const handleSearchToken = debounce(
		(searchValue: string, tokens: IToken[]) => {
			if (!searchValue) {
				setFilteredTokens(tokens);
				return;
			}
			const newFilter = tokens.filter(token => {
				const rgx = new RegExp(searchValue, 'gi');

				return (
					rgx.test(token.symbol) ||
					rgx.test(token.name) ||
					rgx.test(token.address)
				);
			});
			setFilteredTokens(newFilter);
		},
		250
	);

	const getCoinServiceTokens = async (symbols: string) => {
		try {
			if (symbols) {
				const response = await coinClient.get(
					COIN_SERVICE_ROUTES.getCoinService,
					{
						params: { symbols },
					}
				);
				return response.data;
			}
			return null;
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const { data: usdtPrice } = useQuery('usdt-quotation', () =>
		getCoinServiceTokens('USDT')
	);

	useEffect(() => {
		if (usdtPrice) {
			setUsdtQuotation(usdtPrice);
		}
	}, [usdtPrice]);

	const contextStates = useMemo(
		() => ({
			setFilteredTokens,
			filteredTokens,
			handleSearchToken,
			listOfTokens,
			setChosenToken,
			chosenToken,
			swapTokenSelector,
			setSwapTokenSelector,
			getCoinServiceTokens,
			setCoins,
			coins,
			usdtQuotation,
		}),
		[
			filteredTokens,
			handleSearchToken,
			listOfTokens,
			chosenToken,
			swapTokenSelector,
			coins,
			usdtQuotation,
		]
	);

	return (
		<TokensContext.Provider value={contextStates}>
			{children}
		</TokensContext.Provider>
	);
};
