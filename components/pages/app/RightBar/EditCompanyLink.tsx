import { Flex, Img } from '@chakra-ui/react';
import { BlackButton, ImageUploader, SocialMediaInput } from 'components';
import { useCompanies, usePicasso } from 'hooks';
import { useSession } from 'next-auth/react';
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
	const { data: session } = useSession();

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
		<Flex direction="column" w="100%" align="center" gap="8">
			<Flex
				bg={theme.bg.black}
				direction="column"
				align="center"
				px="4"
				pt="24"
				pb="28"
				gap="10"
				borderRadius="base"
				w="100%"
				zIndex="docked"
			>
				<Flex direction="column" align="center" gap="4" w="100%">
					<CompanyLogo />
					<ImageUploader />
				</Flex>
				<Flex w="100%">
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
			<BlackButton
				type="submit"
				lineHeight="6"
				fontSize="md"
				borderRadius="sm"
				minW="80"
				py="2.5"
				display={{ md: 'flex', lg: 'none' }}
				disabled={
					(editedInfo.logo === selectedCompanyLogo &&
						editedInfo.name === name &&
						editedInfo.email === email &&
						editedInfo.description === description &&
						editedInfo.type === type &&
						editedInfo.selectedNetwork === selectedNetwork) ||
					!session
				}
			>
				{translate('saveChanges')}
			</BlackButton>
		</Flex>
	);
};
