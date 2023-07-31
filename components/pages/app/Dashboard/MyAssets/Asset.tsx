import { Flex, Img, Text } from '@chakra-ui/react';
import { usePicasso, useTokens } from 'hooks';
import { useRouter } from 'next/router';
import React from 'react';
import { IAssetsOptions } from 'types';
import { formatNumbers, getCoinLogo } from 'utils';
import { formatUnits } from 'viem';

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
					{Number(formatUnits(BigInt(assetsOptions.value), 18)).toFixed(3)}
				</Text>
				<Text fontSize="xs" color="gray.400">
					${' '}
					{locale &&
						formatNumbers(
							Number(formatUnits(BigInt(assetsOptions.value), 18)),
							locale
						)}
				</Text>
			</Flex>
		</Flex>
	);
};

export default Asset;
