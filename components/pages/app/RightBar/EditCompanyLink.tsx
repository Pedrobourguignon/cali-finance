import { Button, Flex, Img, Text } from '@chakra-ui/react';
import { ImageUploader, SocialMediaInput } from 'components';
import { useCompanies, usePicasso } from 'hooks';
import useTranslation from 'next-translate/useTranslation';
import { Control } from 'react-hook-form';
import { ICreateCompany, ICompany, ISocialMediaInput } from 'types';
import { handleLogoImage } from 'utils';

const CompanyLogo = () => {
	const { selectedCompany } = useCompanies();
	const theme = usePicasso();

	if (selectedCompany.logo) {
		return <Img src={selectedCompany.logo} boxSize="20" borderRadius="base" />;
	}
	if (selectedCompany.name)
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
				{handleLogoImage(selectedCompany.name)}
			</Flex>
		);
	return <Img src="/images/work.png" boxSize="20" borderRadius="base" />;
};

export const EditCompanyLink: React.FC<{
	control: Control<ICreateCompany>;
	company: ICompany;
}> = ({ control, company }) => {
	const { name, email, description, type, selectedNetwork } = company;
	const theme = usePicasso();
	const { selectedCompany, editedInfo, selectedCompanyLogo } = useCompanies();
	const { t: translate } = useTranslation('create-company');

	const socialLinks: ISocialMediaInput[] = [
		{
			name: 'socialMedias.website',
			imgSrc: '/icons/globe.svg',
			placeHolder: 'website.io',
			link: selectedCompany.socialMedias.website,
			defaultValue: selectedCompany.socialMedias.website,
		},
		{
			name: 'socialMedias.instagram',
			imgSrc: '/icons/instagram.svg',
			placeHolder: 'instagram.com/company',
			link: selectedCompany.socialMedias.instagram,
			defaultValue: selectedCompany.socialMedias.instagram,
		},
		{
			name: 'socialMedias.twitter',
			imgSrc: '/icons/twitter.svg',
			placeHolder: 'twitter.com/company',
			link: selectedCompany.socialMedias.twitter,
			defaultValue: selectedCompany.socialMedias.twitter,
		},
		{
			name: 'socialMedias.telegram',
			imgSrc: '/icons/telegram.svg',
			placeHolder: 't.me/company',
			link: selectedCompany.socialMedias.telegram,
			defaultValue: selectedCompany.socialMedias.telegram,
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
					<CompanyLogo />
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
					editedInfo.logo === selectedCompanyLogo &&
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
