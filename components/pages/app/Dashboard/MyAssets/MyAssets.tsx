import { Button, Flex, Text, useDisclosure } from '@chakra-ui/react';
import { Asset, OffsetShadow } from 'components';
import { useCompanies, usePicasso } from 'hooks';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import React, { useRef, useState, useEffect, useMemo } from 'react';
import { IAssetsOptions } from 'types';
import { formatNumbers } from 'utils';

export const MyAssets = () => {
	const { t: translate } = useTranslation('dashboard');
	const { isOpen: isFullList, onToggle: toggleListView } = useDisclosure();
	const theme = usePicasso();
	const { allUserBalance } = useCompanies();
	const { locale } = useRouter();

	const ref = useRef<HTMLDivElement>(null);

	const [assetOptions, setAssetOptions] = useState<IAssetsOptions[]>([]);

	const sumAvailableToWithdraw = () => {
		const total = allUserBalance.reduce((acc, balance) => acc + balance, 0);
		const newAssetOptions = [
			{
				name: 'USDT',
				value: total,
			},
		];
		setAssetOptions(newAssetOptions);
	};

	useEffect(() => {
		sumAvailableToWithdraw();
	}, [allUserBalance.length]);

	const getUsdtBalance = useMemo(() => assetOptions[0]?.value, [assetOptions]);

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
								${locale && formatNumbers(getUsdtBalance, locale)}
							</Text>
						</Flex>
						{assetOptions.length > 3 && (
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
						)}
					</Flex>
					<Flex direction="column" px="4" gap="2" py="3">
						{assetOptions
							.slice(0, isFullList ? assetOptions.length : 3)
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
