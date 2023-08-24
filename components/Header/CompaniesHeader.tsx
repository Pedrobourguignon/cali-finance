/* eslint-disable no-nested-ternary */
import {
	Flex,
	Img,
	Text,
	useDisclosure,
	Link,
	Skeleton,
	Button,
	Icon,
	useToast,
	useClipboard,
	Spinner,
} from '@chakra-ui/react';
import { useCompanies, usePath, usePicasso } from 'hooks';
import {
	formatUsd,
	getLogo,
	handleLogoImage,
	navigationPaths,
	networkInfos,
	truncateWallet,
} from 'utils';
import {
	NavigationBack,
	NeedFundsCompaniesHeader,
	NotificationPopover,
	AlertToast,
} from 'components';
import useTranslation from 'next-translate/useTranslation';
import router, { useRouter } from 'next/router';
import NextLink from 'next/link';
import { useQuery } from 'react-query';
import { MdContentCopy } from 'react-icons/md';
import { useEffect } from 'react';

export const CompaniesHeader = () => {
	const theme = usePicasso();
	const { isSamePath } = usePath();
	const { query, locale } = useRouter();
	const { onClose, isOpen, onOpen } = useDisclosure();
	const { t: translate } = useTranslation('company-overall');
	const {
		getCompanyById,
		selectedCompanyData,
		getEmployeesBalance,
		calculateEmployeeRevenue,
		employees,
	} = useCompanies();
	const toast = useToast();

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

	const { data: selectedCompany, isLoading: isLoadingSelectedCompany } =
		useQuery(
			'created-company-overview',
			() => getCompanyById(Number(query.id)),
			{
				onError: () => router.push('/404'),
			}
		);

	const { onCopy } = useClipboard(selectedCompany?.contract || '');

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

	const contractAddress = () => {
		if (!selectedCompany?.contract) {
			return (
				<Flex align="center" gap="2">
					<Spinner size="sm" />
					<Text color="gray.500" fontSize="sm">
						{translate('awaitingPolling')}
					</Text>
				</Flex>
			);
		}
		return (
			selectedCompany?.contract && (
				<Flex align="center">
					<Text
						color="blue.300"
						as="u"
						fontSize="md"
						cursor="pointer"
						onClick={() =>
							window.open(
								`https://mumbai.polygonscan.com/address/${selectedCompany?.contract}`
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
			)
		);
	};

	// eslint-disable-next-line consistent-return
	useEffect(() => {
		if (!selectedCompany?.contract) {
			const refetchContractAddress = setInterval(() => {
				contractAddress();
			}, 3000);
			return () => clearInterval(refetchContractAddress);
		}
	}, []);

	useEffect(() => {
		calculateEmployeeRevenue();
		getEmployeesBalance();
	}, [selectedCompanyData, employees]);

	return (
		<Flex direction="column" color={theme.text.primary} w="100%" gap="7">
			<Flex w="100%" justify="space-between" align="center">
				<NavigationBack href={navigationPaths.dashboard.companies.home}>
					{translate('backToCompanies')}
				</NavigationBack>
				<Flex align="center" gap="2">
					<NeedFundsCompaniesHeader />
					<NotificationPopover
						onClose={onClose}
						isOpen={isOpen}
						onOpen={onOpen}
					/>
				</Flex>
			</Flex>
			<Flex w="100%" justify="space-between" align="center">
				<Flex gap="3" align="end">
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
						<Flex direction="column" gap="1">
							<Text
								maxW={{ md: '40', xl: '80' }}
								maxH="20"
								overflow="hidden"
								fontSize="2xl"
							>
								{selectedCompany?.name}
							</Text>
							{contractAddress()}
						</Flex>
					)}
				</Flex>
				<Flex direction="column" maxW="32">
					{isLoadingSelectedCompany ? (
						<Skeleton w="14" h="6" />
					) : selectedCompany?.totalFundsUsd ? (
						<Text fontSize="xl">{`$ ${
							locale && formatUsd(selectedCompany.totalFundsUsd, locale)
						}`}</Text>
					) : (
						`$ 0`
					)}
					<Text fontSize="sm" fontWeight="semibold">
						{translate('totalFunds')}
					</Text>
				</Flex>
				<Link
					href={navigationPaths.dashboard.companies.editOrg(
						query.id?.toString()
					)}
					as={NextLink}
					_hover={{ textDecor: 'none', opacity: '80%' }}
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
