import { COIN_SERVICE_ROUTES } from 'helpers';
import debounce from 'lodash.debounce';
import React, { createContext, useEffect, useMemo, useState } from 'react';
import { OneInchService } from 'services';
import { ISelectedCoin, ISwapTokenSelector, IToken } from 'types';
import { coinClient } from 'utils';

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

	// eslint-disable-next-line consistent-return
	const getOneInchTokens = async () => {
		try {
			const allTokens = await OneInchService.allTokensData();
			const oneInchResult: IToken[] = Object.keys(allTokens.tokens).map(
				item => ({
					...allTokens.tokens[item],
				})
			);
			oneInchResult.sort((coinA, coinB) =>
				coinA.symbol >= coinB.symbol ? 1 : -1
			);
			setListOfTokens(oneInchResult);
			setFilteredTokens(oneInchResult);
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
	};

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
		}),
		[
			setFilteredTokens,
			filteredTokens,
			handleSearchToken,
			listOfTokens,
			setChosenToken,
			chosenToken,
			swapTokenSelector,
			setSwapTokenSelector,
		]
	);

	return (
		<TokensContext.Provider value={contextStates}>
			{children}
		</TokensContext.Provider>
	);
};
