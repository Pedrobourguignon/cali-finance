import { Flex, Icon, Text } from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import NextLink from 'next/link';
import { FiInstagram, FiLinkedin, FiTwitter } from 'react-icons/fi';
import { InfosBanner, WithdrawsBar } from 'components';
import { socialMediaLinks } from 'utils';

export const WithdrawalsBanner = () => {
	const theme = usePicasso();
	return (
		<InfosBanner>
			<Flex direction="column" px="4" py="4" gap="12">
				<WithdrawsBar />
				<Flex direction="column" maxW="60" gap="2">
					<Text fontWeight="medium">Life is easier with Cali</Text>
					<Text fontSize="sm" fontWeight="normal">
						You’ve unlocked our all-in-one suit for surfacing unlimited teams
						and organizations payments
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
			</Flex>
		</InfosBanner>
	);
};
