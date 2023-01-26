import { Flex, Img } from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import { InfosBanner, LifeIsEasier } from 'components';

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
				<LifeIsEasier />
			</Flex>
		</InfosBanner>
	);
};
