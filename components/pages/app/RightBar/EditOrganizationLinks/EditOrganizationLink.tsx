import { Button, Flex, Img, Text } from '@chakra-ui/react';
import { ImageUploader, SocialMediaInput } from 'components';
import { useOrganizations, usePicasso } from 'hooks';
import useTranslation from 'next-translate/useTranslation';
import { Control } from 'react-hook-form';
import { ICreateOrganization, IOrganization, ISocialMediaInput } from 'types';
import { handleLogoImage } from 'utils';

const OrganizationLogo = () => {
	const { selectedOrganization } = useOrganizations();
	const theme = usePicasso();

	if (selectedOrganization.logo) {
		return (
			<Img src={selectedOrganization.logo} boxSize="20" borderRadius="base" />
		);
	}
	if (selectedOrganization.name)
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
				{handleLogoImage(selectedOrganization.name)}
			</Flex>
		);
	return <Img src="/images/work.png" boxSize="20" borderRadius="base" />;
};

export const EditOrganizationLink: React.FC<{
	control: Control<ICreateOrganization>;
	organization: IOrganization;
}> = ({ control, organization }) => {
	const { name, email, description, type, selectedNetwork } = organization;
	const theme = usePicasso();
	const { selectedOrganization, editedInfo, selectedOrganizationLogo } =
		useOrganizations();
	const { t: translate } = useTranslation('create-organization');

	const socialLinks: ISocialMediaInput[] = [
		{
			name: 'socialMedias.website',
			imgSrc: '/icons/globe.svg',
			placeHolder: 'website.io',
			link: selectedOrganization.socialMedias.website,
			defaultValue: selectedOrganization.socialMedias.website,
		},
		{
			name: 'socialMedias.instagram',
			imgSrc: '/icons/instagram.svg',
			placeHolder: 'instagram.com/company',
			link: selectedOrganization.socialMedias.instagram,
			defaultValue: selectedOrganization.socialMedias.instagram,
		},
		{
			name: 'socialMedias.twitter',
			imgSrc: '/icons/twitter.svg',
			placeHolder: 'twitter.com/company',
			link: selectedOrganization.socialMedias.twitter,
			defaultValue: selectedOrganization.socialMedias.twitter,
		},
		{
			name: 'socialMedias.telegram',
			imgSrc: '/icons/telegram.svg',
			placeHolder: 't.me/company',
			link: selectedOrganization.socialMedias.telegram,
			defaultValue: selectedOrganization.socialMedias.telegram,
		},
		{
			name: 'socialMedias.medium',
			imgSrc: '/icons/m-letter.svg',
			placeHolder: 'Medium',
			link: '',
		},
	];

	return (
		<Flex direction="column" w="100%" gap="8">
			<Flex
				bg={theme.bg.black}
				direction="column"
				align="center"
				px="4"
				py={{ md: '12', lg: '16', xl: '24' }}
				gap="10"
				borderRadius="base"
				w="100%"
				zIndex="docked"
			>
				<Flex direction="column" align="center" gap="4" w="100%">
					<OrganizationLogo />
					<ImageUploader />
				</Flex>
				<Flex>
					<Flex direction="column" gap="4" w="100%">
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
			<Button
				type="submit"
				bg={theme.bg.primary}
				color="white"
				borderRadius="sm"
				_hover={{ opacity: '80%' }}
				_active={{}}
				_focus={{}}
				gap="2.5"
				fontWeight="medium"
				fontSize="md"
				lineHeight="6"
				disabled={
					editedInfo.logo === selectedOrganizationLogo &&
					editedInfo.name === name &&
					editedInfo.email === email &&
					editedInfo.description === description &&
					editedInfo.type === type &&
					editedInfo.selectedNetwork === selectedNetwork
				}
				display={{ md: 'flex', lg: 'none' }}
			>
				<Text>{translate('saveChanges')}</Text>
			</Button>
		</Flex>
	);
};
