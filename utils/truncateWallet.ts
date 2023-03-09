export const truncateWallet = (wallet: string | undefined) =>
	`${wallet?.slice(0, 6)}...${wallet?.slice(-4)}`;
