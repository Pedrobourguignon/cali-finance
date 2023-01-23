import { Flex, Icon, Text, Link } from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import { socialMediaLinks } from 'utils';
import { FiInstagram, FiLinkedin, FiTwitter } from 'react-icons/fi';

export const LifeIsEasier = () => {
	const theme = usePicasso();
	return (
		<Flex direction="column" maxW="56" gap="2">
			<Text fontWeight="medium">Life is easier with Cali</Text>
			<Text fontSize="sm" fontWeight="normal">
				Efficiency, Security, and Transparency – All at your fingertips with our
				crypto payroll solution
			</Text>
			<Flex gap="6">
				<Link href={socialMediaLinks.instagram}>
					<Icon boxSize="5" color={theme.branding.cyan} as={FiInstagram} />
				</Link>
				<Link href={socialMediaLinks.linkedin}>
					<Icon boxSize="5" color={theme.branding.cyan} as={FiLinkedin} />
				</Link>
				<Link href={socialMediaLinks.twitter}>
					<Icon boxSize="5" color={theme.branding.cyan} as={FiTwitter} />
				</Link>
			</Flex>
		</Flex>
	);
};
