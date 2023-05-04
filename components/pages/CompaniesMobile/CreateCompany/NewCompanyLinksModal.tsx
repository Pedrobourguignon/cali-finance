import { Flex } from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import { SocialMediaInput } from 'components';
import { ISociaLinksInputValue, ISocialMediaInput } from 'types';
import { MobileModalLayout } from 'layouts';

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

export const NewCompanyLinksModal: React.FC<{
	setSocialMediasInput: (name: string[], url: string) => void;
	newCompanyPicture: string;
	onClose: () => void;
	isOpen: boolean;
}> = ({ setSocialMediasInput, isOpen, onClose }) => {
	const theme = usePicasso();

	return (
		<MobileModalLayout isOpen={isOpen} onClose={onClose}>
			<Flex
				bg={theme.bg.black}
				direction="column"
				px="12"
				pt="14"
				pb="20"
				gap="10"
				borderTopRadius="inherit"
				align="center"
				w="100%"
			>
				<Flex w="100%">
					<Flex direction="column" gap="4" w="100%">
						{socialLinks.map((socialLink, index) => (
							<SocialMediaInput
								setSocialMediasInput={setSocialMediasInput}
								socialLink={socialLink}
								key={+index}
							/>
						))}
					</Flex>
				</Flex>
			</Flex>
		</MobileModalLayout>
	);
};
