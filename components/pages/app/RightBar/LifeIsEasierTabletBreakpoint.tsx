import { Flex, Img } from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import { useRouter } from 'next/router';
import React from 'react';
import { LifeIsEasier } from '../Companies';

export const LifeIsEasierTabletBreakpoint = () => {
	const { locale } = useRouter();
	const theme = usePicasso();
	return (
		<Flex
			w="full"
			h="12.938rem"
			bg={theme.bg.select}
			borderRadius="base"
			px="6"
			bgImage="/images/ondulatedMd.png"
			bgRepeat="no-repeat"
			bgSize="contain"
			bgPosition="bottom"
			position="relative"
		>
			<Flex
				boxSize="full"
				bgImage="/images/sparkles.svg"
				bgRepeat="no-repeat"
				bgSize="contain"
				bgPosition="center"
				py={{ md: locale === 'pt-BR' ? '7' : '10' }}
			>
				<Flex maxW={{ md: locale === 'pt-BR' ? '18rem' : '15rem' }}>
					<LifeIsEasier />
				</Flex>
			</Flex>
			<Flex position="relative" justify="flex-end" boxSize="full">
				<Img src="/images/illustration-big.svg" />
			</Flex>
		</Flex>
	);
};

export default LifeIsEasierTabletBreakpoint;
