import { Flex, Img } from '@chakra-ui/react';
import { InfosBanner, LifeIsEasier } from 'components';

export const LifeIsEasierBanner = () => (
	<InfosBanner
		position="absolute"
		ilustrationImg="/images/illustration-big.svg"
		ondulatedImg="/images/bottom-big-wave.svg"
		bottom="0"
	>
		<Flex w="full">
			<Img src="/images/top-wave.svg" w="full" />
		</Flex>
		<Flex position="absolute" top="0" w="full">
			<Img src="/images/sparkles.svg" w="full" />
		</Flex>
		<Flex direction="column" px="4" pt="12" position="relative">
			<LifeIsEasier />
		</Flex>
	</InfosBanner>
);
