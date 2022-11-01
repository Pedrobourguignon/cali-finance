export interface INewOrganization {
	name: string;
	logo: string;
	socialMedia: [
		{
			website?: string;
			instagram?: string;
			twitter?: string;
			telegram?: string;
		}
	];
}
