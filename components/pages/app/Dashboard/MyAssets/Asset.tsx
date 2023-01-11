import { Flex, Img, Text } from '@chakra-ui/react';
import React from 'react';
import { IAssetsOptions, IMyAssetsFullList } from 'types';

interface IAsset {
	assetsOptions: IAssetsOptions[];
	myAssetsFullList: IMyAssetsFullList;
}

export const Asset: React.FC<IAsset> = ({
	assetsOptions,
	myAssetsFullList,
}) => (
	<Flex direction="column" px="4" gap="2" py="3">
		{assetsOptions.slice(0, myAssetsFullList.listLength).map((asset, index) => (
			<Flex
				key={+index}
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
						<Text>{asset.name}</Text>
						<Text>{asset.initials}</Text>
					</Flex>
				</Flex>
				<Flex direction="column" align="flex-end" p="0.5">
					<Text fontSize="sm">{asset.units}</Text>
					<Text fontSize="xs">{asset.value.toLocaleString()}</Text>
				</Flex>
			</Flex>
		))}
	</Flex>
);

export default Asset;
