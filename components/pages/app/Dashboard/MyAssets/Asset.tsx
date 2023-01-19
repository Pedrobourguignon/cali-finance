import { Flex, Img, Text } from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import React from 'react';
import { IAssetsOptions } from 'types';

interface IAsset {
	assetsOptions: IAssetsOptions;
}

export const Asset: React.FC<IAsset> = ({ assetsOptions }) => {
	const theme = usePicasso();
	return (
		<Flex
			justify="space-between"
			bg={theme.bg.primary}
			color="white"
			px="4"
			borderRadius="base"
		>
			<Flex gap="2" align="center" p="0.5">
				<Img src="/icons/usdc.svg" boxSize={{ lg: '5', xl: '6' }} />
				<Flex direction="column" justify="center" fontSize="sm">
					<Text fontSize="sm">{assetsOptions.name}</Text>
					<Text fontSize="xs" color="gray.400">
						{assetsOptions.initials}
					</Text>
				</Flex>
			</Flex>
			<Flex direction="column" align="flex-end" p="0.5">
				<Text fontSize="sm">{assetsOptions.units}</Text>
				<Text fontSize="xs" color="gray.400">
					$ {assetsOptions.value.toLocaleString('en-US')}
				</Text>
			</Flex>
		</Flex>
	);
};

export default Asset;
