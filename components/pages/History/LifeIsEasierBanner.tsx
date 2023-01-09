import { Flex, Icon, Img, Text, Link } from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import { FiInstagram, FiLinkedin, FiTwitter } from 'react-icons/fi';
import { InfosBanner } from 'components';
import { socialMediaLinks } from 'utils';

export const LifeIsEasierBanner = () => {
	const theme = usePicasso();
	return (
		<InfosBanner height="39.313rem" position="absolute">
			<Flex>
				<Img src="/images/ondulated.png" />
			</Flex>
			<Flex position="absolute" top="0">
				<Img src="/images/sparkles.png" />
			</Flex>
			<Flex direction="column" px="4" pt="10">
				<Flex direction="column" w="60" gap="2">
					<Text fontWeight="medium">Life is easier with Cali</Text>
					<Text fontSize="sm" fontWeight="normal" w="56">
						You’ve unlocked our all-in-one suit for surfacing unlimited teams
						and organizations payments
					</Text>
					<Flex gap="6">
						<Link href={socialMediaLinks.instagram}>
							<Icon
								boxSize="5"
								color={theme.branding.cyan}
								as={FiInstagram}
								cursor="pointer"
							/>
						</Link>
						<Link href={socialMediaLinks.linkedin}>
							<Icon
								boxSize="5"
								color={theme.branding.cyan}
								as={FiLinkedin}
								cursor="pointer"
							/>
						</Link>
						<Link href={socialMediaLinks.twitter}>
							<Icon
								boxSize="5"
								color={theme.branding.cyan}
								as={FiTwitter}
								cursor="pointer"
							/>
						</Link>
					</Flex>
				</Flex>
			</Flex>
		</InfosBanner>
	);
};
