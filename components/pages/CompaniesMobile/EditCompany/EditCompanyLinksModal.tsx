/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Flex, Img } from '@chakra-ui/react';
import { EditPageSocialMediaInput } from 'components';
import { useAuth, useCompanies, usePicasso } from 'hooks';
import { MobileModalLayout } from 'layouts';

import useTranslation from 'next-translate/useTranslation';
import { Dispatch, SetStateAction } from 'react';
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

export const EditCompanyLinkModal: React.FC<{
	onClose: () => void;
	isOpen: boolean;
	displayedEditedPicture: string | undefined;
	editedCompanyPicture: string | undefined;
	company: ICompany | undefined;
	logo: string | undefined;
	handleEditedPicture: (picture: string) => void;
	setEditedSocialLinksInputValue: Dispatch<
		SetStateAction<ISociaLinksInputValue>
	>;
}> = ({ isOpen, onClose, company, setEditedSocialLinksInputValue }) => {
	const theme = usePicasso();
	const { editedInfo } = useCompanies();
	const { t: translate } = useTranslation('create-company');
	const { session } = useAuth();

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
		<MobileModalLayout isOpen={isOpen} onClose={onClose}>
			<Flex
				bg={theme.bg.black}
				direction="column"
				align="center"
				px="4"
				pt="24"
				pb="28"
				gap="10"
				borderTopRadius="2xl"
				w="100%"
				zIndex="docked"
			>
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
		</MobileModalLayout>
	);
};
