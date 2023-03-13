import {
	Flex,
	Img,
	Text,
	useDisclosure,
	Link,
	Skeleton,
} from '@chakra-ui/react';
import { useCompanies, usePath, usePicasso } from 'hooks';
import { handleLogoImage, navigationPaths, networkInfos } from 'utils';
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
import { useEffect } from 'react';

export const CompaniesHeader = () => {
	const theme = usePicasso();
	const { isSamePath } = usePath();
	const { query } = useRouter();
	const { setNotificationsList, notificationsList, getCompanyById } =
		useCompanies();
	const { onClose, isOpen, onOpen } = useDisclosure();
	const { t: translate } = useTranslation('company-overall');
	const { data: session } = useSession({
		required: true,
		onUnauthenticated() {
			router.push('/app/companies');
		},
	});

	const amount = null;

	const menuOptions = [
		{
			name: translate('overview'),
			route: navigationPaths.dashboard.companies.overview(query.id!.toString()),
		},
		{
			name: translate('funds'),
			route: navigationPaths.dashboard.companies.funds(query.id!.toString()),
		},
	];

	const {
		data: selectedCompany,
		isLoading: isLoadingSelectedCompany,
		error,
	} = useQuery('created-company-overview', () =>
		getCompanyById(Number(query.id))
	);

	useEffect(() => {
		if (error) {
			router.push('/404');
		}
	}, [error]);

	return (
		<Flex direction="column" color={theme.text.primary} w="100%" gap="7">
			<Flex w="100%" justify="space-between" align="center">
				<NavigationBack href={navigationPaths.dashboard.companies.home}>
					{translate('backToCompanies')}
				</NavigationBack>
				<Flex align="center" gap="2">
					<NeedFundsCompaniesHeader />
					<NotificationPopover
						setNotificationsList={setNotificationsList}
						onClose={onClose}
						isOpen={isOpen}
						onOpen={onOpen}
						notificationsList={notificationsList}
					/>
				</Flex>
			</Flex>
			<Flex w="100%" justify="space-between" align="center">
				<Flex gap="3" align="center">
					{selectedCompany?.logo === '' ? (
						<Flex
							boxSize="20"
							borderRadius="base"
							align="center"
							justify="center"
							fontSize="lg"
							fontWeight="bold"
							bg={theme.bg.white2}
						>
							{handleLogoImage(selectedCompany.name!)}
						</Flex>
					) : (
						<Img src={selectedCompany?.logo} boxSize="20" />
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
				<Flex direction="column" maxW="28">
					{!amount ? (
						<Skeleton w="14" h="4" />
					) : (
						<Text fontSize="xl">{selectedCompany?.totalFundsUsd}</Text>
					)}

					<Text fontSize="sm">{translate('totalFunds')}</Text>
				</Flex>
				<Link
					href={navigationPaths.dashboard.companies.editOrg(
						query.id!.toString()
					)}
					as={NextLink}
				>
					<Text
						borderRadius="base"
						px="5"
						py="1.5"
						bg="gray.50"
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
				<Flex
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
		</Flex>
	);
};
