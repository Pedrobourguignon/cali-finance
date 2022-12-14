export interface ISocialMediaInput {
	name:
		| 'type'
		| 'description'
		| 'name'
		| 'email'
		| 'network'
		| 'logo'
		| 'socialMedia'
		| 'type.label'
		| 'type.value'
		| 'network.label'
		| 'network.value'
		| 'network.icon'
		| 'socialMedia.website'
		| 'socialMedia.instagram'
		| 'socialMedia.twitter'
		| 'socialMedia.telegram'
		| 'socialMedia.medium';
	imgSrc: string;
	placeHolder: string;
	link?: string;
	defaultValue?: string;
}
