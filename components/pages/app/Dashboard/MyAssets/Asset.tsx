import { Flex, Img, Text } from '@chakra-ui/react';
import { usePicasso, useTokens } from 'hooks';
import { useRouter } from 'next/router';
import React from 'react';
import { IAssetsOptions } from 'types';
import { formatCrypto, formatCryptoToDollar, getCoinLogo } from 'utils';

interface IAsset {
	assetsOptions: IAssetsOptions;
}

export const Asset: React.FC<IAsset> = ({ assetsOptions }) => {
	const theme = usePicasso();
	const { listOfTokens } = useTokens();
	const { locale } = useRouter();

	return (
		<Flex
			justify="space-between"
			bg={theme.bg.primary}
			color="white"
			px="4"
			borderRadius="base"
		>
			<Flex gap="2" align="center" p="0.5">
				<Img src={getCoinLogo(assetsOptions.name, listOfTokens)} boxSize="6" />
				<Flex direction="column" justify="center">
					<Text fontSize={{ base: 'sm', md: 'xs', lg: 'sm' }}>
						{assetsOptions.name}
					</Text>
					<Text fontSize="xs" color="gray.400">
						{assetsOptions.name}
					</Text>
				</Flex>
			</Flex>
			<Flex direction="column" align="flex-end" p="0.5">
				<Text fontSize={{ base: 'sm', md: 'xs', lg: 'sm' }}>
					{locale ? formatCrypto(assetsOptions.value) : null}
				</Text>
				<Text fontSize="xs" color="gray.400">
					{`$ ${locale ? formatCryptoToDollar(assetsOptions.value) : null}`}
				</Text>
			</Flex>
		</Flex>
	);
};

export default Asset;
