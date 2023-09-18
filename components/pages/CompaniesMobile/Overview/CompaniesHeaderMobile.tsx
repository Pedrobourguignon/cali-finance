import {
	Flex,
	Img,
	Text,
	Link,
	Skeleton,
	Spinner,
	Button,
	Icon,
	useToast,
	useClipboard,
} from '@chakra-ui/react';
import { useCompanies, usePath, usePicasso } from 'hooks';
import {
	getLogo,
	handleLogoImage,
	navigationPaths,
	networkInfos,
	truncateWallet,
} from 'utils';
import {
	NavigationBack,
	AlertToast,
	NeedFundsCompaniesHeader,
	RedeployCompanyButton,
} from 'components';
import useTranslation from 'next-translate/useTranslation';
import router, { useRouter } from 'next/router';
import NextLink from 'next/link';
import { useQuery } from 'react-query';
import { MdContentCopy } from 'react-icons/md';
import {
	useContractWrite,
	useNetwork,
	useSwitchNetwork,
	useWaitForTransaction,
} from 'wagmi';
import { Hex } from 'viem';
import { AxiosError } from 'axios';
import { useState, useEffect } from 'react';
import factoryAbi from 'utils/abi/factory.json';

export const CompaniesHeaderMobile = () => {
	const theme = usePicasso();
	const { isSamePath } = usePath();
	const { query } = useRouter();
	const {
		getCompanyById,
		employees,
		calculateEmployeeRevenue,
		getEmployeesBalance,
		selectedCompanyData,
	} = useCompanies();
	const { t: translate } = useTranslation('company-overall');
	const toast = useToast();
	const companyId = query.id?.toString();

	const { data: selectedCompany, isLoading: isLoadingSelectedCompany } =
		useQuery(
			'created-company-overview',
			() => getCompanyById(Number(query.id)),
			{
				onError: () => router.push('/404'),
			}
		);

	const { chain } = useNetwork();
	const { chains, switchNetworkAsync } = useSwitchNetwork();

	const { write: createCompanyWrite, data: createCompanyData } =
		useContractWrite({
			address: (process.env.NEXT_PUBLIC_FACTORY_CONTRACT || '') as Hex,
			abi: factoryAbi,
			functionName: 'createNewCompany',
		});

	const redeployCompanyContract = async () => {
		try {
			if (chain?.id !== 137) await switchNetworkAsync?.(chains[3].id);
			createCompanyWrite?.({ args: [selectedCompany?.checksum] });
		} catch (error) {
			if (error instanceof AxiosError) {
				if (error.response?.status === 401) {
					toast({
						position: 'top',
						render: () => (
							<AlertToast
								onClick={toast.closeAll}
								text="unauthorized"
								type="error"
							/>
						),
					});
				} else {
					toast({
						position: 'top',
						render: () => (
							<AlertToast
								onClick={toast.closeAll}
								text="weAreWorkingToSolve"
								type="error"
							/>
						),
					});
				}
			}
		}
	};

	const [showButton, setShowButton] = useState<boolean>(false);

	const { isLoading } = useWaitForTransaction({
		hash: createCompanyData?.hash,
		confirmations: 3,
		onSuccess() {
			setShowButton(false);
			toast({
				position: 'top',
				render: () => (
					<AlertToast
						onClick={toast.closeAll}
						text="redeployWithSuccess"
						type="success"
					/>
				),
			});
		},
		onError() {
			toast({
				position: 'top',
				render: () => (
					<AlertToast
						onClick={toast.closeAll}
						text="weAreWorkingToSolve"
						type="error"
					/>
				),
			});
		},
	});

	const menuOptions = [
		{
			name: translate('overview'),
			route: navigationPaths.dashboard.companies.overview(companyId),
		},
		{
			name: translate('funds'),
			route: navigationPaths.dashboard.companies.funds(companyId),
		},
	];

	const { onCopy } = useClipboard(selectedCompany?.contract as string);

	const handleCopyButton = () => {
		onCopy();
		toast({
			position: 'top-right',
			render: () => (
				<AlertToast
					onClick={toast.closeAll}
					text="addressCopiedSuccessfully"
					type="success"
				/>
			),
		});
	};

	const showRedeployButton = () => {
		if (selectedCompany?.status === 'await deploy') {
			setShowButton(true);
		} else if (selectedCompany?.status === 'await polling') {
			setShowButton(false);
		}
	};

	useEffect(() => {
		showRedeployButton();
		calculateEmployeeRevenue();
		getEmployeesBalance();
	}, [selectedCompanyData, employees]);

	return (
		<Flex
			direction="column"
			color={theme.text.primary}
			w="100%"
			zIndex="docked"
			gap="8"
			position="relative"
		>
			<Flex w="100%" justify="space-between" align="center" zIndex="1">
				<NavigationBack href={navigationPaths.dashboard.companies.home}>
					{translate('backToCompanies')}
				</NavigationBack>
				<Flex
					zIndex="1"
					borderColor="gray.300"
					borderWidth="0.1rem"
					borderRadius="3xl"
					px="3"
					align="center"
					gap="2"
					h="6"
				>
					<Img src={networkInfos(selectedCompany?.network).icon} boxSize="4" />
					<Text fontSize="xs">
						{networkInfos(selectedCompany?.network).name}
					</Text>
				</Flex>
			</Flex>

			<NeedFundsCompaniesHeader />
			<Flex gap="4" w="100%" direction="column">
				<Flex
					w="100%"
					justify="space-between"
					align="center"
					direction="column"
					gap="4"
				>
					<Flex gap="3" align="center" w="full">
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
							<Img
								src={getLogo(selectedCompany.logo)}
								boxSize="20"
								borderRadius="sm"
							/>
						)}
						{isLoadingSelectedCompany ? (
							<Skeleton w="44" h="4" />
						) : (
							<Flex direction="column">
								<Text
									maxW={{ md: '40', xl: '56' }}
									maxH="20"
									overflow="hidden"
									fontSize="2xl"
									color={theme.text.primary}
								>
									{selectedCompany?.name}
								</Text>
								{selectedCompany?.contract === null ? (
									<Flex align="center" gap="2">
										<Spinner size="sm" />
										<Text color="gray.500" fontSize="sm">
											{translate('awaitingPolling')}
										</Text>
									</Flex>
								) : (
									<Flex align="center">
										<Text
											color="blue.300"
											as="u"
											fontSize="md"
											cursor="pointer"
											onClick={() =>
												window.open(
													`https://polygonscan.com/address/${selectedCompany?.contract}`
												)
											}
										>
											{truncateWallet(selectedCompany?.contract)}
										</Text>
										<Button
											boxSize="3"
											bg="transparent"
											onClick={() => {
												handleCopyButton();
											}}
										>
											<Icon as={MdContentCopy} boxSize="4" color="gray.500" />
										</Button>
									</Flex>
								)}
							</Flex>
						)}
					</Flex>
					<Flex w="full" justify="space-between">
						<Flex direction="column" gap="1">
							{isLoadingSelectedCompany ? (
								<Skeleton w="14" h="4" />
							) : (
								<Text fontSize="xl">${selectedCompany?.totalFundsUsd}</Text>
							)}

							<Text fontSize="sm">{translate('totalFunds')}</Text>
						</Flex>
						<Link
							href={navigationPaths.dashboard.companies.editOrg(companyId)}
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
				</Flex>
				<Flex align="center" justify="space-between">
					<Flex w="full" justify="center">
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
										_hover={{ opacity: 0.7 }}
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
				</Flex>
			</Flex>
			<RedeployCompanyButton
				onClick={() => redeployCompanyContract()}
				showButton={showButton}
			/>
		</Flex>
	);
};
