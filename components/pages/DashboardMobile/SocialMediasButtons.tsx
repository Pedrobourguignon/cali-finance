import { Button, Flex, FlexProps, Icon, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import { usePicasso } from 'hooks';
import React from 'react';
import { FaDiscord, FaTwitter } from 'react-icons/fa';
import { socialMediaLinks } from 'utils';

export const SocialMediasButtons: React.FC<FlexProps> = ({
	pl,
	pt,
	align,
	justify,
}) => {
	const theme = usePicasso();
	return (
		<Flex w="full" align={align} pl={pl} pt={pt} justify={justify}>
			<Link href={socialMediaLinks.discord} isExternal as={NextLink}>
				<Button bg="transparent" borderRadius="full" p="0">
					<Icon as={FaDiscord} boxSize="6" color={theme.branding.blue2} />
				</Button>
			</Link>
			<Link href={socialMediaLinks.twitter} isExternal as={NextLink}>
				<Button bg="transparent" borderRadius="full">
					<Icon as={FaTwitter} boxSize="6" color={theme.branding.blue2} />
				</Button>
			</Link>
		</Flex>
	);
};
