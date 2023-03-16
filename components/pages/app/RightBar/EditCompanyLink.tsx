/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Flex, Img } from '@chakra-ui/react';
import {
	BlackButton,
	EditPageSocialMediaInput,
	ImageUploader,
} from 'components';
import { useCompanies, usePicasso } from 'hooks';
import { useSession } from 'next-auth/react';
import useTranslation from 'next-translate/useTranslation';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { ISocialMediaInput, ISociaLinksInputValue } from 'types';
import { ICompany } from 'types/interfaces/main-server/ICompany';
import { chainList, handleLogoImage } from 'utils';

interface ICompanyLogo {
	company: ICompany | undefined;
	logo: string | undefined;
}

const CompanyLogo: React.FC<ICompanyLogo> = ({ company, logo }) => {
	const theme = usePicasso();
	const selectedCompany = {
		picture: 'no-logo.png',
		name: 'fazuele',
	};

	if (logo) {
		return <Img src={logo} boxSize="20" borderRadius="base" />;
	}
	if (company?.name)
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
				{handleLogoImage(company?.name)}
			</Flex>
		);
	return <Img src="/images/work.png" boxSize="20" borderRadius="base" />;
};

export const EditCompanyLink: React.FC<{
	company: ICompany | undefined;
	logo: string | undefined;
	handleEditedPicture: (picture: string) => void;
	setEditedSocialLinksInputValue: Dispatch<
		SetStateAction<ISociaLinksInputValue>
	>;
}> = ({
	company,
	setEditedSocialLinksInputValue,
	handleEditedPicture,
	logo,
}) => {
	const theme = usePicasso();
	const { editedInfo } = useCompanies();
	const { t: translate } = useTranslation('create-company');
	const { data: session } = useSession();
	const selectedCompany = {
		picture: 'no-logo.png',
		name: 'fazuele',
	};

	const socialLinks: ISocialMediaInput[] = [
		{
			name: company?.socialMedia![0].name,
			imgSrc: '/icons/globe.svg',
			placeHolder: 'website.io',
			url: company?.socialMedia![0].url,
		},
		{
			name: company?.socialMedia![1].name,
			imgSrc: '/icons/instagram.svg',
			placeHolder: 'instagram.com/company',
			url: company?.socialMedia![1].url,
		},
		{
			name: company?.socialMedia![2].name,
			imgSrc: '/icons/twitter.svg',
			placeHolder: 'twitter.com/company',
			url: company?.socialMedia![2].url,
		},
		{
			name: company?.socialMedia![3].name,
			imgSrc: '/icons/telegram.svg',
			placeHolder: 't.me/company',
			url: company?.socialMedia![3].url,
		},
		{
			name: company?.socialMedia![4].name,
			imgSrc: '/icons/m-letter.svg',
			placeHolder: 'Medium',
			url: company?.socialMedia![4].url,
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
					<CompanyLogo company={company} logo={logo} />
					<ImageUploader sendImage={handleEditedPicture} />
				</Flex>
				<Flex w="100%">
					<Flex direction="column" gap="4" w="100%">
						{socialLinks.map((socialLink, index) => (
							<EditPageSocialMediaInput
								socialLink={socialLink}
								key={+index}
								defaultValue={socialLink.url}
								setEditedSocialLinksInputValue={setEditedSocialLinksInputValue}
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
					(editedInfo.logo === company?.logo &&
						editedInfo.name === company?.name &&
						editedInfo.contactEmail === company?.contactEmail &&
						editedInfo.description === company?.description &&
						editedInfo.type === company?.type &&
						editedInfo.network === company?.network) ||
					!session
				}
			>
				{translate('saveChanges')}
			</BlackButton>
		</Flex>
	);
};
