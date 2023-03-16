import { Flex, Img } from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import { BlackButton, ImageUploader, SocialMediaInput } from 'components';
import { ISociaLinksInputValue, ISocialMediaInput } from 'types';
import useTranslation from 'next-translate/useTranslation';
import { Dispatch, SetStateAction } from 'react';

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

const CompanyLogo: React.FC<{
	logo: string;
}> = ({ logo }) => {
	if (logo) return <Img src={logo} boxSize="20" borderRadius="base" />;
	return <Img src="/images/work.png" boxSize="20" borderRadius="base" />;
};

export const NewCompanyLinks: React.FC<{
	setSocialMediasInput: (name: string[], url: string) => void;
	handleNewPicture: (picture: string) => void;
	setSocialLinksInputValue: Dispatch<SetStateAction<ISociaLinksInputValue>>;
	newCompanyPicture: string;
}> = ({
	setSocialLinksInputValue,
	newCompanyPicture,
	handleNewPicture,
	setSocialMediasInput,
}) => {
	const theme = usePicasso();
	const { t: translate } = useTranslation('create-company');

	return (
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
					<CompanyLogo logo={newCompanyPicture} />
					<ImageUploader sendImage={handleNewPicture} />
				</Flex>
				<Flex w="100%">
					<Flex direction="column" gap="4" w="100%">
						{socialLinks.map((socialLink, index) => (
							<SocialMediaInput
								setSocialMediasInput={setSocialMediasInput}
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
	);
};
