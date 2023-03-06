import { Flex, Img } from '@chakra-ui/react';
import { useCompanies, usePicasso } from 'hooks';
import { handleLogoImage } from 'utils';
import { BlackButton, ImageUploader, SocialMediaInput } from 'components';
import { INewCompany, ISociaLinksInputValue, ISocialMediaInput } from 'types';
import useTranslation from 'next-translate/useTranslation';
import { useSession } from 'next-auth/react';
// eslint-disable-next-line import/no-unresolved
import { Dispatch, SetStateAction } from 'react';
import { CompaniesProvider } from 'contexts';

const socialLinks: ISocialMediaInput[] = [
	{
		name: 'website',
		imgSrc: '/icons/globe.svg',
		placeHolder: 'website.io',
	},
	{
		name: 'instagram',
		imgSrc: '/icons/instagram.svg',
		placeHolder: 'instagram.com/company',
	},
	{
		name: 'twitter',
		imgSrc: '/icons/twitter.svg',
		placeHolder: 'twitter.com/company',
	},
	{
		name: 'telegram',
		imgSrc: '/icons/telegram.svg',
		placeHolder: 't.me/company',
	},
	{
		name: 'medium',
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
	setSocialLinksInputValue: Dispatch<SetStateAction<ISociaLinksInputValue>>;
}> = ({ setSocialLinksInputValue }) => {
	const theme = usePicasso();
	const { selectedCompany } = useCompanies();
	const { t: translate } = useTranslation('create-company');
	const { data: session } = useSession();

	return (
		<CompaniesProvider>
			<Flex direction="column" align="center" zIndex="docked" w="100%" gap="8">
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
									setSocialLinksInputValue={setSocialLinksInputValue}
									key={+index}
								/>
							))}
						</Flex>
					</Flex>
				</Flex>
				<BlackButton
					type="submit"
					lineHeight="6"
					fontSize="md"
					minW="80"
					borderRadius="sm"
					py="2.5"
					display={{ md: 'flex', lg: 'none' }}
				>
					{translate('createCompany')}
				</BlackButton>
			</Flex>
		</CompaniesProvider>
	);
};
