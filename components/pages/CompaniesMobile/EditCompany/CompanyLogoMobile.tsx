import { Flex, Img } from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import { ICompany } from 'types/interfaces/main-server/ICompany';
import { getLogo, handleLogoImage } from 'utils';

interface ICompanyLogo {
	company: ICompany | undefined;
	logo: string | undefined;
	displayedEditedPicture: string | undefined;
}

export const CompanyLogoMobile: React.FC<ICompanyLogo> = ({
	company,
	logo,
	displayedEditedPicture,
}) => {
	const theme = usePicasso();

	if (displayedEditedPicture === '')
		return (
			<Flex
				boxSize="6"
				color="black"
				bg="transparent"
				borderRadius="base"
				align="center"
				justify="center"
				fontSize="xl"
			>
				{handleLogoImage(company?.name)}
			</Flex>
		);

	if (displayedEditedPicture !== logo) {
		return <Img src={displayedEditedPicture} boxSize="6" borderRadius="base" />;
	}
	if (logo) {
		return <Img src={getLogo(logo)} boxSize="6" borderRadius="base" />;
	}
	if (company?.name)
		return (
			<Flex
				boxSize="6"
				color="black"
				bg={theme.bg.white2}
				borderRadius="base"
				align="center"
				justify="center"
				fontSize="xl"
			>
				{handleLogoImage(company?.name)}
			</Flex>
		);
	return <Img src="/images/work.svg" boxSize="6" borderRadius="base" />;
};
