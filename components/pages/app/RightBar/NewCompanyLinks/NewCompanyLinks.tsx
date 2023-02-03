import { Button, Flex, Img, Text } from '@chakra-ui/react';
import { useCompanies, usePicasso } from 'hooks';
import { handleLogoImage } from 'utils';
import { ImageUploader, SocialMediaInput } from 'components';
import { INewCompany, ISocialMediaInput, ICreateCompany } from 'types';
import { Control } from 'react-hook-form';
import useTranslation from 'next-translate/useTranslation';

const socialLinks: ISocialMediaInput[] = [
	{
		name: 'socialMedias.website',
		imgSrc: '/icons/globe.svg',
		placeHolder: 'website.io',
	},
	{
		name: 'socialMedias.instagram',
		imgSrc: '/icons/instagram.svg',
		placeHolder: 'instagram.com/company',
	},
	{
		name: 'socialMedias.twitter',
		imgSrc: '/icons/twitter.svg',
		placeHolder: 'twitter.com/company',
	},
	{
		name: 'socialMedias.telegram',
		imgSrc: '/icons/telegram.svg',
		placeHolder: 't.me/company',
	},
	{
		name: 'socialMedias.medium',
		imgSrc: '/icons/m-letter.svg',
		placeHolder: 'Medium',
	},
];

const CompanyLogo: React.FC<{ org: INewCompany }> = ({ org }) => {
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

export const NewCompanyLinks: React.FC<{
	control: Control<ICreateCompany>;
}> = ({ control }) => {
	const theme = usePicasso();
	const { selectedCompany } = useCompanies();
	const { t: translate } = useTranslation('create-company');

	return (
		<Flex direction="column" zIndex="docked" w="100%" gap="8">
			<Flex
				bg={theme.bg.black}
				direction="column"
				px="4"
				pt="24"
				pb="28"
				gap="10"
				borderRadius="base"
				align="center"
				w="100%"
			>
				<Flex direction="column" align="center" gap="4" w="100%">
					<CompanyLogo org={selectedCompany} />
					<ImageUploader />
				</Flex>
				<Flex w="100%">
					<Flex direction="column" gap="4" w="100%">
						{socialLinks.map((socialLink, index) => (
							<SocialMediaInput
								socialLink={socialLink}
								key={+index}
								control={control}
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
				_hover={{}}
				gap="2.5"
				fontWeight="medium"
				fontSize="md"
				lineHeight="6"
				display={{ md: 'flex', lg: 'none' }}
				w="100%"
			>
				<Text>+</Text>
				<Text>{translate('createCompany')}</Text>
			</Button>
		</Flex>
	);
};
