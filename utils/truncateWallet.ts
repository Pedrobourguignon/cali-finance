export const truncateWallet = (wallet: string) =>
	`${wallet.slice(0, 6)}...${wallet.slice(-4)}`;
