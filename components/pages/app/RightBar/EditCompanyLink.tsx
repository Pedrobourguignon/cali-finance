/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Flex, Img } from '@chakra-ui/react';
import {
	BlackButton,
	EditPageSocialMediaInput,
	ImageUploader,
} from 'components';
import { useAuth, useCompanies, usePicasso } from 'hooks';

import useTranslation from 'next-translate/useTranslation';
import { Dispatch, SetStateAction, useState } from 'react';
import { ISocialMediaInput, ISociaLinksInputValue } from 'types';
import { ICompany } from 'types/interfaces/main-server/ICompany';
import { getLogo, handleLogoImage } from 'utils';

interface ICompanyLogo {
	company: ICompany | undefined;
	logo: string | undefined;
	displayedEditedPicture: string | undefined;
}

const CompanyLogo: React.FC<ICompanyLogo> = ({
	company,
	logo,
	displayedEditedPicture,
}) => {
	const theme = usePicasso();

	if (displayedEditedPicture === '')
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

	if (displayedEditedPicture !== logo) {
		return (
			<Img src={displayedEditedPicture} boxSize="20" borderRadius="base" />
		);
	}
	if (logo) {
		return <Img src={getLogo(logo)} boxSize="20" borderRadius="base" />;
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
	displayedEditedPicture: string | undefined;
	editedCompanyPicture: string | undefined;
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
	editedCompanyPicture,
	displayedEditedPicture,
}) => {
	const theme = usePicasso();
	const { editedInfo } = useCompanies();
	const { t: translate } = useTranslation('create-company');
	const { session } = useAuth();
	const [openImageUploaderModal, setOpenImageUploaderModal] =
		useState<boolean>(false);

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
					<Flex direction="column" gap="4" align="center" cursor="pointer">
						<Flex onClick={() => setOpenImageUploaderModal(true)}>
							<CompanyLogo
								company={company}
								logo={logo}
								displayedEditedPicture={displayedEditedPicture}
							/>
						</Flex>
						<ImageUploader
							openImageUploaderModal={openImageUploaderModal}
							setOpenImageUploaderModal={setOpenImageUploaderModal}
							displayedEditedPicture={displayedEditedPicture}
							handleEditedPicture={handleEditedPicture}
							sendImage={handleEditedPicture}
							editedCompanyPicture={editedCompanyPicture}
						/>
					</Flex>
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
