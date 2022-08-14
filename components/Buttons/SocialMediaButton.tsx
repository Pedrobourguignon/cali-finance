import React from 'react';
import Link from 'next/link';
import { usePicasso } from 'hooks';
import { Button, ButtonProps, Icon } from '@chakra-ui/react';
import { FaDiscord, FaTwitter } from 'react-icons/fa';
import { IconType } from 'react-icons';
import { socialMediaLinks } from 'utils';

interface ISocialMediaButton extends ButtonProps {
	media: 'discord' | 'twitter';
}

interface ISocialMedia {
	[key: string]: { link: string; icon: IconType };
}

const socialMedias: ISocialMedia = {
	discord: { icon: FaDiscord, link: socialMediaLinks.discord },
	twitter: { icon: FaTwitter, link: socialMediaLinks.twitter },
};

export const SocialMediaButton: React.FC<ISocialMediaButton> = ({
	media,
	...props
}) => (
	<Link href={socialMedias[media].link}>
		<Button
			w="10"
			h="10"
			bg="whiteAlpha.50"
			borderRadius="full"
			justifyContent="center"
			alignItems="center"
			{...props}
		>
			<Icon as={socialMedias[media].icon} boxSize="6" />
		</Button>
	</Link>
);

export default SocialMediaButton;
