/* eslint-disable no-nested-ternary */
import { Flex, FormControl, Img } from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import { handleLogoImage } from 'utils';
import { ImageUploader, SocialMediaInput } from 'components';
import { INewOrganization, ISocialMediaInput } from 'types';

const organizations: INewOrganization = {
	name: 'O',
	logo: '',
	socialMedia: [
		{
			website: 'website.io',
			instagram: 'instagram/company',
			twitter: 'twitter.com/company',
			telegram: 't.me/company',
		},
	],
};

const socialLinks: ISocialMediaInput[] = [
	{
		imgSrc: '/icons/globe.svg',
		placeHolder: 'website.io',
		link: organizations.socialMedia[0].website,
	},
	{
		imgSrc: '/icons/instagram.svg',
		placeHolder: 'instagram.com/company',
		link: organizations.socialMedia[0].instagram,
	},
	{
		imgSrc: '/icons/twitter.svg',
		placeHolder: 'twitter.com/company',
		link: organizations.socialMedia[0].twitter,
	},
	{
		imgSrc: '/icons/telegram.svg',
		placeHolder: 't.me/company',
		link: organizations.socialMedia[0].telegram,
	},
	{
		imgSrc: '/icons/m-letter.svg',
		placeHolder: 'Placeholder',
		link: '',
	},
];

export const NewOrganizationLinks = () => {
	const theme = usePicasso();
	return (
		<Flex
			direction="column"
			gap="4"
			w="max-content"
			py="6"
			px="6"
			zIndex="docked"
		>
			<Flex
				bg={theme.bg.black}
				direction="column"
				align="center"
				justify="center"
				px="4"
				py="24"
				gap="10"
				borderRadius="base"
			>
				<Flex direction="column" align="center" gap="4">
					{organizations.logo ? (
						<Img src={organizations.logo} boxSize="20" borderRadius="base" />
					) : organizations.name ? (
						<Flex
							boxSize="20"
							color="black"
							bg={theme.bg.white2}
							borderRadius="base"
							align="center"
							justify="center"
							fontSize="4xl"
						>
							{handleLogoImage(organizations.logo, organizations.name)}
						</Flex>
					) : (
						<Img src="/images/work.png" boxSize="20" borderRadius="base" />
					)}
					<ImageUploader />
				</Flex>
				<Flex>
					<form>
						<FormControl>
							<Flex direction="column" gap="2" minW="72">
								{socialLinks.map((socialLink, index) => (
									<SocialMediaInput socialLink={socialLink} key={+index} />
								))}
							</Flex>
						</FormControl>
					</form>
				</Flex>
			</Flex>
		</Flex>
	);
};
