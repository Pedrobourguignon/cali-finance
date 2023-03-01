export const truncateWallet = (wallet: `0x${string}` | undefined) =>
	`${wallet?.slice(0, 6)}...${wallet?.slice(-4)}`;
