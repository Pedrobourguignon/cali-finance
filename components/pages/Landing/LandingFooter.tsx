import { Flex, Text } from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import React from 'react';
import { SocialMediaFooter } from 'components';
import { ISocialMediaFooter } from 'types';
import { AiFillTwitterCircle } from 'react-icons/ai';
import { FaLinkedinIn } from 'react-icons/fa';
import { TiSocialInstagramCircular } from 'react-icons/ti';
import useTranslation from 'next-translate/useTranslation';
import { socialMediaLinks } from 'utils';

const socialMedias: ISocialMediaFooter[] = [
	{
		name: '@califinance',
		icon: AiFillTwitterCircle,
		url: socialMediaLinks.twitter,
	},
	{
		name: '/company/califinance',
		icon: FaLinkedinIn,
		url: socialMediaLinks.linkedin,
	},
	{
		name: '@califinance',
		icon: TiSocialInstagramCircular,
		url: socialMediaLinks.instagram,
	},
];

export const LandingFooter = () => {
	const theme = usePicasso();
	const { t: translate } = useTranslation('landing');

	return (
		<Flex
			position="relative"
			bg={theme.bg.primary}
			w="full"
			h="25.125rem"
			direction="column"
			justify="center"
			align="center"
		>
			<Flex gap="20">
				{socialMedias.map((media, index) => (
					<SocialMediaFooter
						key={+index}
						name={media.name}
						icon={media.icon}
						url={media.url}
					/>
				))}
			</Flex>
			<Flex
				w="full"
				px="20"
				pb="6"
				justify="space-between"
				position="absolute"
				bottom="0"
			>
				<Text color={theme.text.white}>© CALI 2023</Text>
				<Text
					color={theme.text.white}
					onClick={() => window.open('https://www.instagram.com/cali.finance/')}
				>
					{translate('privacyPolicy')}
				</Text>
			</Flex>
		</Flex>
	);
};

export default LandingFooter;
