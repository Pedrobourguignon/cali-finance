import { Flex, Icon, Text, Link } from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import { socialMediaLinks } from 'utils';
import { FiInstagram, FiLinkedin, FiTwitter } from 'react-icons/fi';
import { RxDiscordLogo } from 'react-icons/rx';
import useTranslation from 'next-translate/useTranslation';
import NextLink from 'next/link';

const socialMedias = [
	{
		icon: FiInstagram,
		link: socialMediaLinks.instagram,
	},
	{
		icon: FiLinkedin,
		link: socialMediaLinks.linkedin,
	},
	{
		icon: FiTwitter,
		link: socialMediaLinks.twitter,
	},
	{
		icon: RxDiscordLogo,
		link: socialMediaLinks.discord,
	},
];

export const LifeIsEasier = () => {
	const theme = usePicasso();
	const { t: translate } = useTranslation('banners');

	return (
		<Flex direction="column" gap="2">
			<Text fontWeight="medium">{translate('lifeIsEasier')}</Text>
			<Text fontSize={{ md: 'sm', lg: 'xs', xl: 'sm' }} fontWeight="normal">
				{translate('Efficiency')}
			</Text>
			<Flex gap="6">
				{socialMedias.map((item, index) => (
					<Link key={+index} href={item.link} as={NextLink}>
						<Icon boxSize="5" color={theme.branding.cyan} as={item.icon} />
					</Link>
				))}
			</Flex>
		</Flex>
	);
};
