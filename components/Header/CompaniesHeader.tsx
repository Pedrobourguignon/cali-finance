/* eslint-disable no-prototype-builtins */
/* eslint-disable no-restricted-syntax */
import {
	Flex,
	Img,
	Text,
	useDisclosure,
	Link,
	Skeleton,
} from '@chakra-ui/react';
import { useCompanies, usePath, usePicasso, useTokens } from 'hooks';
import { getLogo, handleLogoImage, navigationPaths, networkInfos } from 'utils';
import {
	NavigationBack,
	NeedFundsCompaniesHeader,
	NotificationPopover,
} from 'components';
import useTranslation from 'next-translate/useTranslation';
import { useSession } from 'next-auth/react';
import router, { useRouter } from 'next/router';
import NextLink from 'next/link';
import { useQuery } from 'react-query';
import { useEffect, useState } from 'react';
import { useBalance } from 'wagmi';

interface IUseBalance {
	decimals: number;
	formatted: number | string;
	symbol: string;
	value: {
		_hex: string;
		_isBigNumber: boolean;
	};
}

export const CompaniesHeader = () => {
	const theme = usePicasso();
	const { isSamePath } = usePath();
	const { query } = useRouter();
	const { getCoinServiceTokens } = useTokens();
	const { onClose, isOpen, onOpen } = useDisclosure();
	const { t: translate } = useTranslation('company-overall');
	const { setNotificationsList, notificationsList, getCompanyById } =
		useCompanies();

	const [totalCompanyBalanceInDolar, setTotalCompanyBalanceInDolar] =
		useState<number>(0);
	const contractCompanyAssetsData: IUseBalance[] = [];
	const companyAssetsDolarQuotation: number[] = [];

	const { data: session } = useSession({
		required: true,
		onUnauthenticated() {
			router.push(navigationPaths.dashboard.companies.home);
		},
	});

	const { data: companyBalance, refetch } = useBalance({
		address: '0x8409809BdF2424C45Fb85DB7768daC6026e95602',
	});
	if (companyBalance) {
		setTimeout(refetch, 20000);
		contractCompanyAssetsData.push(companyBalance);
	}

	const { data: companyAssetsInDolar } = useQuery('get-coin-data', () =>
		getCoinServiceTokens(
			contractCompanyAssetsData.map(asset => asset.symbol).toString()
		)
	);

	useEffect(() => {
		// get the value of the quotation of all assets in the company's contract and put in an array
		if (companyAssetsInDolar) {
			for (const key in companyAssetsInDolar) {
				if (companyAssetsInDolar.hasOwnProperty(key)) {
					companyAssetsDolarQuotation.push(companyAssetsInDolar[key]?.value);
				}
			}
			// maps the array of assets and the array of quotes, multiplying the respective index
			// sum all values and set the final dolar balance state to show in the company header
			const multiplyAssetsToDolar = () => {
				const dolarValues = contractCompanyAssetsData.map(asset =>
					companyAssetsDolarQuotation.map(
						assetQuotation => Number(asset.formatted) * assetQuotation
					)
				);
				const sumAllDolarValues = dolarValues[0].reduce(
					(partialSum, acc) => partialSum + acc,
					0
				);
				setTotalCompanyBalanceInDolar(sumAllDolarValues);
			};
			multiplyAssetsToDolar();
		}
	}, [contractCompanyAssetsData]);

	const menuOptions = [
		{
			name: translate('overview'),
			route: navigationPaths.dashboard.companies.overview(query.id?.toString()),
		},
		{
			name: translate('funds'),
			route: navigationPaths.dashboard.companies.funds(query.id?.toString()),
		},
	];

	const {
		data: selectedCompany,
		isLoading: isLoadingSelectedCompany,
		error: selectedCompanyError,
	} = useQuery('created-company-overview', () =>
		getCompanyById(Number(query.id))
	);

	useEffect(() => {
		if (selectedCompanyError) {
			router.push('/404');
		}
	}, [selectedCompanyError]);

	return (
		<Flex direction="column" color={theme.text.primary} w="100%" gap="7">
			<Flex w="100%" justify="space-between" align="center">
				<NavigationBack href={navigationPaths.dashboard.companies.home}>
					{translate('backToCompanies')}
				</NavigationBack>
				<Flex align="center" gap="2">
					<NeedFundsCompaniesHeader />
					{/* <NotificationPopover
						setNotificationsList={setNotificationsList}
						onClose={onClose}
						isOpen={isOpen}
						onOpen={onOpen}
						notificationsList={notificationsList}
					/> */}
				</Flex>
			</Flex>
			<Flex w="100%" justify="space-between" align="center">
				<Flex gap="3" align="center">
					{!selectedCompany?.logo ? (
						<Flex
							boxSize="20"
							borderRadius="base"
							align="center"
							justify="center"
							fontSize="lg"
							fontWeight="bold"
							bg={theme.bg.white2}
						>
							{handleLogoImage(selectedCompany?.name)}
						</Flex>
					) : (
						<Img src={getLogo(selectedCompany.logo)} boxSize="20" />
					)}
					{isLoadingSelectedCompany ? (
						<Skeleton w="44" h="4" />
					) : (
						<Text
							maxW={{ md: '40', xl: '56' }}
							maxH="20"
							overflow="hidden"
							fontSize="2xl"
						>
							{selectedCompany?.name}
						</Text>
					)}
					{}
				</Flex>
				<Flex direction="column" maxW="32">
					{isLoadingSelectedCompany ? (
						<Skeleton w="14" h="6" />
					) : (
						<Text fontSize="xl">
							{totalCompanyBalanceInDolar === 0 ||
							Number.isNaN(totalCompanyBalanceInDolar) ? (
								<Skeleton w="18" h="4" />
							) : (
								`$ ${totalCompanyBalanceInDolar.toLocaleString()}`
							)}
						</Text>
					)}
					<Text fontSize="sm">{translate('totalFunds')}</Text>
				</Flex>
				<Link
					href={navigationPaths.dashboard.companies.editOrg(
						query.id?.toString()
					)}
					as={NextLink}
				>
					<Text
						borderRadius="base"
						px="5"
						py="1.5"
						bg="gray.100"
						fontSize="sm"
						fontWeight="medium"
						cursor="pointer"
						whiteSpace="nowrap"
					>
						{translate('editInformations')}
					</Text>
				</Link>
			</Flex>
			<Flex align="center" justify="space-between">
				<Flex>
					{menuOptions.map((menuOption, index) => {
						const comparedPath = isSamePath(menuOption.route);
						return (
							<Link
								key={+index}
								as={NextLink}
								href={menuOption.route}
								_hover={{
									textDecoration: 'none',
								}}
							>
								<Text
									color={theme.text.primary}
									cursor="pointer"
									py="1"
									px="3"
									fontSize="sm"
									fontWeight={comparedPath ? 'semibold' : 'normal'}
									borderRadius="none"
									borderBottomWidth="0.125rem"
									borderBottomColor={
										comparedPath ? theme.bg.primary : 'transparent'
									}
								>
									{menuOption.name}
								</Text>
							</Link>
						);
					})}
				</Flex>
				{isLoadingSelectedCompany ? (
					<Skeleton w="24" h="6" rounded="xl" />
				) : (
					<Flex
						borderColor="gray.300"
						borderWidth="0.1rem"
						borderRadius="3xl"
						px="3"
						align="center"
						gap="2"
						h="6"
					>
						<Img
							src={networkInfos(selectedCompany?.network).icon}
							boxSize="4"
						/>
						<Text fontSize="xs">
							{networkInfos(selectedCompany?.network).name}
						</Text>
					</Flex>
				)}
			</Flex>
		</Flex>
	);
};
