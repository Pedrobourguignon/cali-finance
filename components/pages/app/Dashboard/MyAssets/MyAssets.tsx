import { Button, Flex, Text, useDisclosure } from '@chakra-ui/react';
import { readContract } from '@wagmi/core';
import { Asset, OffsetShadow } from 'components';
import { useAuth, useCompanies, usePicasso } from 'hooks';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import React, { useRef, useState, useEffect, useMemo } from 'react';
import { IAssetsOptions } from 'types';
import { formatContractNumbers } from 'utils';
import companyAbi from 'utils/abi/company.json';
import { useAccount } from 'wagmi';

export const MyAssets = () => {
	const { t: translate } = useTranslation('dashboard');
	const { isOpen: isFullList, onToggle: toggleListView } = useDisclosure();
	const theme = usePicasso();
	const { session } = useAuth();
	const { allUserCompanies } = useCompanies();
	const { locale } = useRouter();
	const { address: wallet } = useAccount();

	const ref = useRef<HTMLDivElement>(null);

	const [assetOptions, setAssetOptions] = useState<IAssetsOptions[]>([]);
	const [allUserBalance, setAllUserBalance] = useState<bigint[]>([]);

	const getEmployeeBalance = async () => {
		if (allUserCompanies && session) {
			const filteredCompanies = allUserCompanies.filter(
				company => Boolean(company.isAdmin) === false
			);
			const contractAddress = filteredCompanies.map(
				filteredCompany => filteredCompany.contract
			);

			const data = contractAddress.map(item =>
				readContract({
					address: item,
					abi: companyAbi,
					functionName: 'getSingleBalance',
					args: [wallet],
				})
			);
			try {
				const result = await Promise.all(data);
				const availableToWithdraw = result.filter(number => number !== 0);
				setAllUserBalance(availableToWithdraw as bigint[]);
			} catch (err) {
				console.log(err);
			}
		}
	};

	useEffect(() => {
		getEmployeeBalance();
	}, [allUserCompanies]);

	const sumAvailableToWithdraw = () => {
		const total = allUserBalance.reduce(
			(acc: bigint, balance) => acc + balance,
			0n
		);
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
								$
								{locale &&
									formatContractNumbers(getUsdtBalance, locale, 18, true)}
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
