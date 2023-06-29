import { Button, Flex, Text, useDisclosure } from '@chakra-ui/react';
import { Asset, OffsetShadow } from 'components';
import { usePicasso } from 'hooks';
import useTranslation from 'next-translate/useTranslation';
import React, { useRef, useMemo, useState, useEffect } from 'react';
import { IAssetsOptions } from 'types';
import { useAccount, useContractRead } from 'wagmi';
import companyAbi from '../../../../../utils/abi/company.json';

export const MyAssets = () => {
	const { t: translate } = useTranslation('dashboard');
	const { isOpen: isFullList, onToggle: toggleListView } = useDisclosure();
	const theme = usePicasso();
	const { address } = useAccount();

	const ref = useRef<HTMLDivElement>(null);

	const [assetsOptions, setAssetOptions] = useState<IAssetsOptions[]>([
		{
			name: 'USDT',
			value: 84238.11,
		},
	]);

	const { data: availableToWithdraw } = useContractRead({
		address: '0xC186498cd0736D19A988fb602eF74607F502D2Ca',
		abi: companyAbi,
		functionName: 'getSingleBalance',
		args: [address],
	});

	useEffect(() => {
		setAssetOptions(prevState => {
			const updatedAsset = prevState.map(option => {
				if (option.name === 'USDT') {
					return {
						...option,
						value: Number(availableToWithdraw),
					};
				}
				return option;
			});
			return updatedAsset;
		});
	}, []);

	const totalAssetsValue = useMemo(
		() =>
			assetsOptions.reduce((totalValue, asset) => totalValue + asset.value, 0),
		[assetsOptions]
	);

	return (
		<OffsetShadow
			width="full"
			height={ref.current?.scrollHeight}
			borderColor={theme.bg.primary}
			top="10px"
			left="10px"
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
					<Flex justify="space-between" px="4" pt="2" align="start">
						<Flex direction="column">
							<Text
								fontSize={{ md: 'sm', xl: 'md' }}
								fontWeight="medium"
								color={theme.text.primary}
							>
								{translate('myAssets')}
							</Text>
							<Text
								fontSize={{ base: 'sm', md: 'xs', lg: 'sm' }}
								color={theme.text.primary}
							>
								${totalAssetsValue.toLocaleString('en-US')}
							</Text>
						</Flex>
						<Button
							fontWeight="medium"
							fontSize="xs"
							cursor="pointer"
							color="gray.500"
							h="0"
							py="3"
							pr="0"
							onClick={() => toggleListView()}
						>
							{isFullList ? translate('seeLess') : translate('seeAll')}
						</Button>
					</Flex>
					<Flex direction="column" px="4" gap="2" py="3">
						{assetsOptions
							.slice(0, isFullList ? assetsOptions.length : 3)
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
