export interface IProfile {
	name: string;
	email: string;
	wallet: `0x${string}`;
	picture: string;
	settings: { [key: string]: unknown };
}
