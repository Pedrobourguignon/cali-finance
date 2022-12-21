import { Flex, Img, Link, Text } from '@chakra-ui/react';
import { OffsetShadow } from 'components';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

import { IAssetsOptions } from 'types';

const assetsOptions: IAssetsOptions[] = [
	{
		name: 'USD Coin',
		initials: 'USDC',
		units: '84,238.11',
		value: '$84,238.11',
		icon: '/icons/usdc.svg',
	},
	{
		name: 'Bitcoin',
		initials: 'BTC',
		units: '0.001234',
		value: '$5,666.99',
		icon: '/icons/bitcoin.svg',
	},
	{
		name: 'Ethereum',
		initials: 'ETH',
		units: '0.7',
		value: '$1,032.11',
		icon: '/icons/eth.svg',
	},
];

export const MyAssets = () => {
	const { t: translate } = useTranslation('dashboard');
	return (
		<OffsetShadow
			width="23.5rem"
			height="15rem"
			borderColor="black"
			top="3"
			left="3"
		>
			<Flex
				position="relative"
				zIndex="0"
				direction="column"
				borderRadius="base"
				border="1px solid"
				borderColor="black"
			>
				<Flex
					direction="column"
					zIndex="1"
					bg="white"
					boxSize="full"
					borderRadius="base"
				>
					<Flex justify="space-between" px="4" py="2">
						<Flex direction="column">
							<Text fontSize="md" fontWeight="medium" color="black">
								{translate('myAssets')}
							</Text>
							<Text fontSize="sm" color="black">
								$92,234.11
							</Text>
						</Flex>
						<Text fontSize="sm" cursor="pointer" color="gray.500">
							{translate('seeAll')}
						</Text>
					</Flex>
					<Flex direction="column" px="4" gap="2" py="3">
						{assetsOptions.map((asset, index) => (
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
									<Text fontSize="xs">{asset.value}</Text>
								</Flex>
							</Flex>
						))}
					</Flex>
				</Flex>
			</Flex>
		</OffsetShadow>
	);
};

export default MyAssets;
