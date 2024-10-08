import { Flex, Text } from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import React from 'react';
import { SocialMediaFooter } from 'components';
import { ISocialMediaFooter } from 'types';
import { AiFillTwitterCircle } from 'react-icons/ai';
import { FaDiscord, FaLinkedinIn } from 'react-icons/fa';
import { TiSocialInstagramCircular } from 'react-icons/ti';
import useTranslation from 'next-translate/useTranslation';
import { socialMediaLinks, usefulLinks } from 'utils';

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
	{
		name: '/discord',
		icon: FaDiscord,
		url: socialMediaLinks.discord,
	},
];

export const LandingFooter = () => {
	const theme = usePicasso();
	const { t: translate } = useTranslation('landing');
	const currentYear = new Date().getFullYear();

	return (
		<Flex
			position="relative"
			bg={theme.bg.primary}
			w="full"
			h={{ base: '16rem', sm: '25.125rem' }}
			direction="column"
			justify="center"
			align="center"
		>
			<Flex
				gap={{ base: '4', sm: '20' }}
				display={{ base: 'flex', sm: 'none' }}
			>
				{socialMedias.slice(0, 3).map((media, index) => (
					<SocialMediaFooter
						key={+index}
						name={media.name}
						icon={media.icon}
						url={media.url}
					/>
				))}
			</Flex>
			<Flex
				gap={{ base: '4', sm: '20' }}
				display={{ base: 'none', sm: 'flex' }}
			>
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
				px={{ base: '4', sm: '20' }}
				pb="6"
				justify="space-between"
				position="absolute"
				bottom="0"
			>
				<Text color={theme.text.white} fontSize={{ base: 'xs', sm: 'md' }}>
					© CALI {currentYear}
				</Text>
				<Text
					cursor="pointer"
					color={theme.text.white}
					onClick={() => window.open(usefulLinks.privacyPolicy)}
					fontSize={{ base: 'xs', sm: 'md' }}
				>
					{translate('privacyPolicy')}
				</Text>
			</Flex>
		</Flex>
	);
};

export default LandingFooter;
