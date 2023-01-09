export interface ISocialMediaInput {
	name:
		| 'type'
		| 'description'
		| 'name'
		| 'email'
		| 'network'
		| 'logo'
		| 'socialMedias'
		| 'type.label'
		| 'type.value'
		| 'network.label'
		| 'network.value'
		| 'network.icon'
		| 'socialMedias.website'
		| 'socialMedias.instagram'
		| 'socialMedias.twitter'
		| 'socialMedias.telegram'
		| 'socialMedias.medium';
	imgSrc: string;
	placeHolder: string;
	link?: string;
	defaultValue?: string;
}
