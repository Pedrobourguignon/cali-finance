import { Flex, Img, Text } from '@chakra-ui/react';
import { usePicasso, useTokens } from 'hooks';
import React from 'react';
import { IAssetsOptions } from 'types';

interface IAsset {
	assetsOptions: IAssetsOptions;
}

export const Asset: React.FC<IAsset> = ({ assetsOptions }) => {
	const theme = usePicasso();
	const { listOfTokens } = useTokens();

	const searchCoinLogo = () => {
		const logo = listOfTokens.find(coin => coin.symbol === assetsOptions.name);
		return logo?.logoURI;
	};
	return (
		<Flex
			justify="space-between"
			bg={theme.bg.primary}
			color="white"
			px="4"
			borderRadius="base"
		>
			<Flex gap="2" align="center" p="0.5">
				<Img src={searchCoinLogo()} boxSize={{ lg: '5', xl: '6' }} />
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
					{assetsOptions.value.toLocaleString('en-US')}
				</Text>
				<Text fontSize="xs" color="gray.400">
					$ {assetsOptions.value.toLocaleString('en-US')}
				</Text>
			</Flex>
		</Flex>
	);
};

export default Asset;
