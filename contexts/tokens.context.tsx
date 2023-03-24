import debounce from 'lodash.debounce';
import React, { createContext, useEffect, useMemo, useState } from 'react';
import { OneInchService, CoingeckoService } from 'services';
import { ISelectedCoin, ISwapTokenSelector, IToken } from 'types';

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
}
export const TokensContext = createContext({} as ITokensContext);

export const TokensProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [listOfTokens, setListOfTokens] = useState<IToken[]>([]);
	const [filteredTokens, setFilteredTokens] = useState<IToken[]>([]);
	const [chosenToken, setChosenToken] = useState<ISelectedCoin>({
		logo: 'https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png?1547033579',
		symbol: 'bitcoin',
	} as ISelectedCoin);
	const [swapTokenSelector, setSwapTokenSelector] =
		useState<ISwapTokenSelector>({
			paidAmount: '',
			paidToken: '',
			receivedAmount: '',
			receivedToken: '',
		} as ISwapTokenSelector);

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
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		getOneInchTokens();
	}, []);

	const getTokenDataById = async () => {
		try {
			const tokenData = await CoingeckoService.tokenInfoByTokenId(
				chosenToken.symbol
			);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		getTokenDataById();
	}, [chosenToken]);

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
