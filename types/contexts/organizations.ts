export interface IOrganization {
	name: string;
	type: string;
	funds: number;
	email: string;
	members: string;
	logo: string;
	description?: string;
	socialMedia: [
		{
			website?: string;
			instagram?: string;
			twitter?: string;
			telegram?: string;
		}
	];
	teams: [string];
}
