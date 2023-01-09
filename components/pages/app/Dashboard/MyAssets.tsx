/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Button, Flex, Img, Text } from '@chakra-ui/react';
import { OffsetShadow } from 'components';
import useTranslation from 'next-translate/useTranslation';
import React, { useState, useRef, useEffect } from 'react';
import { IAssetsOptions } from 'types';

interface IMyAssetsFullList {
	listLength: number;
	buttonText: string;
}

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
	{
		name: 'Ethereum',
		initials: 'ETH',
		units: '0.7',
		value: '$1,032.11',
		icon: '/icons/eth.svg',
	},
	{
		name: 'Ethereum',
		initials: 'ETH',
		units: '0.7',
		value: '$1,032.11',
		icon: '/icons/eth.svg',
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
	const [myAssetsFullList, setMyAssetsFullList] = useState<IMyAssetsFullList>({
		listLength: 3,
		buttonText: 'See all',
	});
	const { t: translate } = useTranslation('dashboard');

	const ref = useRef<HTMLDivElement>(null);
	const [flexHeight, setFlexHeight] = useState(239);

	useEffect(() => {
		setFlexHeight(ref.current!.clientHeight);
	}, [myAssetsFullList.listLength]);

	const fullList = () => {
		if (myAssetsFullList.listLength === 3) {
			setMyAssetsFullList({
				listLength: assetsOptions.length,
				buttonText: 'See less',
			});
		} else {
			setMyAssetsFullList({
				listLength: 3,
				buttonText: 'See all',
			});
			setFlexHeight(ref.current!.clientHeight);
		}
	};

	return (
		<OffsetShadow
			width="23.5rem"
			height={flexHeight}
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
				h="max-content"
				ref={ref}
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
						<Button
							fontWeight="normal"
							fontSize="sm"
							cursor="pointer"
							color="gray.500"
							p="0"
							pb="4"
							onClick={() => fullList()}
						>
							{myAssetsFullList.buttonText}
						</Button>
					</Flex>
					<Flex direction="column" px="4" gap="2" py="3">
						{assetsOptions
							.slice(0, myAssetsFullList.listLength)
							.map((asset, index) => (
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
