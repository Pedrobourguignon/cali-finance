import { Flex, Img, Text } from '@chakra-ui/react';
import React from 'react';
import { IAssetsOptions } from 'types';

interface IAsset {
	assetsOptions: IAssetsOptions[];
	key: number;
	index: number;
}

export const Asset: React.FC<IAsset> = ({ assetsOptions, key, index }) => (
	<Flex
		key={key}
		justify="space-between"
		bg="black"
		color="white"
		px="4"
		mx="auto"
		w="21.5rem"
		borderRadius="base"
	>
		<Flex gap="2" align="center" p="0.5">
			<Img src="/icons/usdc.svg" boxSize="6" />
			<Flex direction="column" justify="center" fontSize="sm">
				<Text>{assetsOptions[index].name}</Text>
				<Text>{assetsOptions[index].initials}</Text>
			</Flex>
		</Flex>
		<Flex direction="column" align="flex-end" p="0.5">
			<Text fontSize="sm">{assetsOptions[index].units}</Text>
			<Text fontSize="xs">{assetsOptions[index].value.toLocaleString()}</Text>
		</Flex>
	</Flex>
);

export default Asset;
