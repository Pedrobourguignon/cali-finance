/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Button, Flex, Text } from '@chakra-ui/react';
import { Asset, OffsetShadow } from 'components';
import { usePicasso } from 'hooks';
import useTranslation from 'next-translate/useTranslation';
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { IAssetsOptions, IMyAssetsFullList } from 'types';

const assetsOptions: IAssetsOptions[] = [
	{
		name: 'USD Coin',
		initials: 'USDC',
		units: '84,238.11',
		value: 84238.11,
		icon: '/icons/usdc.svg',
	},
	{
		name: 'Bitcoin',
		initials: 'BTC',
		units: '0.001234',
		value: 5666.99,
		icon: '/icons/bitcoin.svg',
	},
	{
		name: 'Ethereum',
		initials: 'ETH',
		units: '0.7',
		value: 2032.11,
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
	const theme = usePicasso();

	const ref = useRef<HTMLDivElement>(null);
	const [flexHeight, setFlexHeight] = useState(239);

	const totalAssetsValue = useMemo(
		() =>
			assetsOptions.reduce((totalValue, asset) => totalValue + asset.value, 0),
		[]
	);

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
			width="full"
			height={flexHeight}
			borderColor={theme.bg.primary}
			top="3"
			left="3"
		>
			<Flex
				position="relative"
				direction="column"
				borderRadius="base"
				border="1px solid"
				borderColor={theme.bg.primary}
				h="max-content"
				ref={ref}
				w="full"
			>
				<Flex direction="column" bg="white" boxSize="full" borderRadius="base">
					<Flex justify="space-between" px="4" py="2" align="start">
						<Flex direction="column">
							<Text
								fontSize={{ md: 'sm', xl: 'md' }}
								fontWeight="medium"
								color={theme.text.primary}
							>
								{translate('myAssets')}
							</Text>
							<Text
								fontSize={{ md: 'xs', lg: 'sm' }}
								color={theme.text.primary}
							>
								${totalAssetsValue.toLocaleString()}
							</Text>
						</Flex>
						<Button
							fontWeight="normal"
							fontSize="xs"
							cursor="pointer"
							color="gray.500"
							h="0"
							py="3"
							pr="0"
							onClick={() => fullList()}
						>
							{myAssetsFullList.buttonText}
						</Button>
					</Flex>
					<Flex direction="column" px="4" gap="2" py="3">
						{assetsOptions
							.slice(0, myAssetsFullList.listLength)
							.map((asset, index) => (
								<Asset assetsOptions={asset} key={+index} />
							))}
					</Flex>
				</Flex>
			</Flex>
		</OffsetShadow>
	);
};

export default MyAssets;
