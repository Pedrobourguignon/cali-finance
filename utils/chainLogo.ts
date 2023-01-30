export const chainLogo = (chainName: string) => {
	if (chainName === 'Ethereum') return '/images/eth.png';
	if (chainName === 'Polygon') return '/images/polygon.png';
	return '/images/bnbchain.png';
};
