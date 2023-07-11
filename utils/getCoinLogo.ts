import { IToken } from 'types';

export const getCoinLogo = (coinSymbol: string, listOfTokens: IToken[]) => {
	const logo = listOfTokens.find(coin => coin.symbol === coinSymbol);
	if (logo?.logoURI) {
		return logo?.logoURI;
	}
	return '/images/coin.svg';
};
