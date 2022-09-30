import { Flex, Img, Text } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';

const assetsOptions = [
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

export const MyAssets = () => (
	<Flex
		position="relative"
		zIndex="1"
		h="60"
		ml="8"
		mt="4"
		w="376px"
		direction="column"
		borderRadius="base"
		borderColor="black"
		border="1px solid"
		gap="2"
		_after={{
			content: '""',
			position: 'absolute',
			width: '100%',
			height: '100%',
			border: '1px solid black',
			borderRadius: 'md',
			left: '2',
			top: '2',
			zIndex: '-1',
		}}
	>
		<Flex justify="space-between">
			<Flex direction="column" px="4" py="2.5">
				<Text fontSize="md" fontWeight="medium">
					My Assets
				</Text>
				<Text fontSize="sm">$92,234.11</Text>
			</Flex>
			<Link href="/">
				<Text fontSize="sm" cursor="pointer" px="4" py="2.5" color="gray.500">
					See all
				</Text>
			</Link>
		</Flex>
		{assetsOptions.map((asset, index) => (
			<Flex
				key={+index}
				justify="space-between"
				bg="black"
				color="white"
				px="4"
				mx="auto"
				w="344px"
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
);

export default MyAssets;
