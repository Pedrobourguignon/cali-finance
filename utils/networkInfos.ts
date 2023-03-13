export const networkInfos = (chainId: number | undefined) => {
	if (chainId === 1) return { name: 'Ethereum', icon: '/images/eth.png' };
	if (chainId === 137) return { name: 'Polygon', icon: '/images/polygon.png' };
	return { name: 'BNB Chain', icon: '/images/bnbchain.png' };
};
