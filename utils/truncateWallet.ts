export const truncateWallet = (wallet: `0x${string}` | undefined) => {
	if (wallet === undefined) return '0x...';
	return `${wallet?.slice(0, 6)}...${wallet?.slice(-4)}`;
};
