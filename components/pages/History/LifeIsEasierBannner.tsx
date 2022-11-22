import { Flex, Icon, Text } from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import NextLink from 'next/link';
import { FiInstagram, FiLinkedin, FiTwitter } from 'react-icons/fi';
import { InfosBanner } from 'components';
import { socialMediaLinks } from 'utils';

export const LifeIsEasierBannner = () => {
	const theme = usePicasso();
	return (
		<InfosBanner height="39.313rem" justify="center">
			<Flex direction="column" p="4" justify="center">
				<Flex direction="column" maxW="60" gap="2">
					<Text fontWeight="medium">Life is easier with Cali</Text>
					<Text fontSize="sm" fontWeight="normal">
						You’ve unlocked our all-in-one suit for surfacing unlimited teams
						and organizations payments
					</Text>
					<Flex gap="6">
						<NextLink href={socialMediaLinks.instagram}>
							<Icon
								boxSize="5"
								color={theme.branding.cyan}
								as={FiInstagram}
								cursor="pointer"
							/>
						</NextLink>
						<NextLink href={socialMediaLinks.linkedin}>
							<Icon
								boxSize="5"
								color={theme.branding.cyan}
								as={FiLinkedin}
								cursor="pointer"
							/>
						</NextLink>
						<NextLink href={socialMediaLinks.twitter}>
							<Icon
								boxSize="5"
								color={theme.branding.cyan}
								as={FiTwitter}
								cursor="pointer"
							/>
						</NextLink>
					</Flex>
				</Flex>
			</Flex>
		</InfosBanner>
	);
};
