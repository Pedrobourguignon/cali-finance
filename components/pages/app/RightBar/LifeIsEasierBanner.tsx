import { Flex, Img } from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import { InfosBanner, LifeIsEasier } from 'components';

export const LifeIsEasierBanner = () => {
	const theme = usePicasso();
	return (
		<InfosBanner
			position="absolute"
			ilustrationImg="/images/illustration-big.png"
			ondulatedImg="/images/big-ondulated.png"
			bottom="0"
		>
			<Flex w="full">
				<Img src="/images/top-ondulated.png" w="full" />
			</Flex>
			<Flex position="absolute" top="0" w="full">
				<Img src="/images/sparkles.png" w="full" />
			</Flex>
			<Flex direction="column" px="4" pt="12" position="relative">
				<LifeIsEasier />
			</Flex>
		</InfosBanner>
	);
};
