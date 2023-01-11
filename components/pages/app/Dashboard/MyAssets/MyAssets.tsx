/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable arrow-body-style */
import { Button, Flex, Text } from '@chakra-ui/react';
import { Asset, OffsetShadow } from 'components';
import useTranslation from 'next-translate/useTranslation';
import React, { useState, useRef, useEffect } from 'react';
import { IAssetsOptions, IMyAssetsFullList } from 'types';

const assetsOptions: IAssetsOptions[] = [
	{
		name: 'USD Coin',
		initials: 'USDC',
		units: '84,238.11',
		value: 1,
		icon: '/icons/usdc.svg',
	},
	{
		name: 'Bitcoin',
		initials: 'BTC',
		units: '0.001234',
		value: 2,
		icon: '/icons/bitcoin.svg',
	},
	{
		name: 'Ethereum',
		initials: 'ETH',
		units: '0.7',
		value: 3,
		icon: '/icons/eth.svg',
	},
	{
		name: 'Ethereum',
		initials: 'ETH',
		units: '0.7',
		value: 4,
		icon: '/icons/eth.svg',
	},
	{
		name: 'Ethereum',
		initials: 'ETH',
		units: '0.7',
		value: 5,
		icon: '/icons/eth.svg',
	},
	{
		name: 'Ethereum',
		initials: 'ETH',
		units: '0.7',
		value: 6,
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

	const totalAssetsValue = assetsOptions.reduce((totalValue, asset) => {
		return totalValue + asset.value;
	}, 0);

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
								${totalAssetsValue.toLocaleString()}
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
								<Asset
									assetsOptions={assetsOptions}
									key={+index}
									index={index}
								/>
							))}
					</Flex>
				</Flex>
			</Flex>
		</OffsetShadow>
	);
};

export default MyAssets;
