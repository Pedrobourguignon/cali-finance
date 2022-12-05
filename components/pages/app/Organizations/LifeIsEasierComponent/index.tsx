import { Flex, Icon, Text } from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import { socialMediaLinks } from 'utils';
import NextLink from 'next/link';
import { FiInstagram, FiLinkedin, FiTwitter } from 'react-icons/fi';

export const LifeIsEasier = () => {
	const theme = usePicasso();
	return (
		<Flex direction="column" maxW="56" gap="2">
			<Text fontWeight="medium">Life is easier with Cali</Text>
			<Text fontSize="sm" fontWeight="normal">
				You’ve unlocked our all-in-one suit for surfacing unlimited teams and
				organizations payments
			</Text>
			<Flex gap="6">
				<NextLink href={socialMediaLinks.instagram}>
					<Icon boxSize="5" color={theme.branding.cyan} as={FiInstagram} />
				</NextLink>
				<NextLink href={socialMediaLinks.linkedin}>
					<Icon boxSize="5" color={theme.branding.cyan} as={FiLinkedin} />
				</NextLink>
				<NextLink href={socialMediaLinks.twitter}>
					<Icon boxSize="5" color={theme.branding.cyan} as={FiTwitter} />
				</NextLink>
			</Flex>
		</Flex>
	);
};
