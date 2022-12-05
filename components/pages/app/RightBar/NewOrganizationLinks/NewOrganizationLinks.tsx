/* eslint-disable no-nested-ternary */
import { Flex, FormControl, Img } from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import { handleLogoImage } from 'utils';
import { ImageUploader, SocialMediaInput } from 'components';
import { INewOrganization, ISocialMediaInput } from 'types';

const organizations: INewOrganization = {
	name: '',
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

const OrganizationLogo: React.FC<{ org: INewOrganization }> = ({ org }) => {
	const { logo, name } = org;
	const theme = usePicasso();
	if (logo) {
		return <Img src={logo} boxSize="20" borderRadius="base" />;
	}
	if (name)
		return (
			<Flex
				boxSize="20"
				color="black"
				bg={theme.bg.white2}
				borderRadius="base"
				align="center"
				justify="center"
				fontSize="4xl"
			>
				{handleLogoImage(name)}
			</Flex>
		);
	return <Img src="/images/work.png" boxSize="20" borderRadius="base" />;
};

export const NewOrganizationLinks = () => {
	const theme = usePicasso();
	return (
		<Flex direction="column" w="max-content" zIndex="docked">
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
					<OrganizationLogo org={organizations} />
					<ImageUploader />
				</Flex>
				<Flex>
					<form>
						<FormControl>
							<Flex direction="column" gap="4" minW="72">
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
