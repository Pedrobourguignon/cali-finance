export interface IUserHistory {
	icon: string;
	wallet: `0x${string}` | undefined;
	team: string;
	type: string;
	date: string;
	amount: number;
	coin: string;
	status: string;
}
