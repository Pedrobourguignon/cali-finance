import { Flex, Img } from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import { InfosBanner, LifeIsEasier } from 'components';

export const LifeIsEasierBanner = () => {
	const theme = usePicasso();
	return (
		<InfosBanner
			height="39.313rem"
			position="absolute"
			imgLink="/images/ondulate-background.png"
			bottom="0"
		>
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
