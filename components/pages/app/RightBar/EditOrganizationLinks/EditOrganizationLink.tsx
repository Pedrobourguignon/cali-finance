import { Flex, Img } from '@chakra-ui/react';
import { ImageUploader, SocialMediaInput } from 'components';
import { usePicasso } from 'hooks';
import useTranslation from 'next-translate/useTranslation';
import { Control } from 'react-hook-form';
import {
	ICreateOrganization,
	INewOrganization,
	ISocialMediaInput,
} from 'types';
import { handleLogoImage } from 'utils';

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

export const EditOrganizationLink: React.FC<{
	control: Control<ICreateOrganization>;
}> = ({ control }) => {
	const theme = usePicasso();
	const { t: translate } = useTranslation('create-organization');

	const organizations: INewOrganization = {
		name: '',
		logo: '',
		socialMedias: [
			{
				website: translate('website'),
				instagram: `instagram/${translate('company')}`,
				twitter: `twitter/${translate('company')}`,
				telegram: `t.me/${translate('company')}`,
			},
		],
	};

	const socialLinks: ISocialMediaInput[] = [
		{
			name: 'socialMedias.website',
			imgSrc: '/icons/globe.svg',
			placeHolder: 'website.io',
			link: organizations.socialMedias[0].website,
			defaultValue: organizations.socialMedias[0].website,
		},
		{
			name: 'socialMedias.instagram',
			imgSrc: '/icons/instagram.svg',
			placeHolder: 'instagram.com/company',
			link: organizations.socialMedias[0].instagram,
			defaultValue: organizations.socialMedias[0].instagram,
		},
		{
			name: 'socialMedias.twitter',
			imgSrc: '/icons/twitter.svg',
			placeHolder: 'twitter.com/company',
			link: organizations.socialMedias[0].twitter,
			defaultValue: organizations.socialMedias[0].twitter,
		},
		{
			name: 'socialMedias.telegram',
			imgSrc: '/icons/telegram.svg',
			placeHolder: 't.me/company',
			link: organizations.socialMedias[0].telegram,
			defaultValue: organizations.socialMedias[0].telegram,
		},
		{
			name: 'socialMedias.medium',
			imgSrc: '/icons/m-letter.svg',
			placeHolder: 'Medium',
			link: '',
		},
	];

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
					<Flex direction="column" gap="4" minW="72">
						{socialLinks.map((socialLink, index) => (
							<SocialMediaInput
								socialLink={socialLink}
								key={+index}
								control={control}
								defaultValue={socialLink.defaultValue}
							/>
						))}
					</Flex>
				</Flex>
			</Flex>
		</Flex>
	);
};
