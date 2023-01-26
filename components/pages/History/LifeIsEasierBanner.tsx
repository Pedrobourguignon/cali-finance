import { Flex, Icon, Img, Text, Link } from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import { FiInstagram, FiLinkedin, FiTwitter } from 'react-icons/fi';
import { InfosBanner, LifeIsEasier } from 'components';
import { socialMediaLinks } from 'utils';

export const LifeIsEasierBanner = () => {
	const theme = usePicasso();
	return (
		<InfosBanner height="39.313rem" position="absolute">
			<Flex w="full">
				<Img src="/images/ondulated.png" w="full" />
			</Flex>
			<Flex position="absolute" top="0" w="full">
				<Img src="/images/sparkles.png" w="full" />
			</Flex>
			<Flex direction="column" px="4" pt="10">
				<LifeIsEasier />
			</Flex>
		</InfosBanner>
	);
};
