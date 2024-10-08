import {
	Button,
	Flex,
	Img,
	Link,
	Skeleton,
	Text,
	useDisclosure,
} from '@chakra-ui/react';
import { useCompanies, usePicasso, useTokens } from 'hooks';
import useTranslation from 'next-translate/useTranslation';
import React, { useState } from 'react';
import {
	formatCrypto,
	formatCryptoToDollar,
	getCoinLogo,
	getLogo,
	handleLogoImage,
	navigationPaths,
} from 'utils';
import NextLink from 'next/link';
import { GetUserCompaniesRes } from 'types/interfaces/main-server/ICompany';
import { WithdrawModal, WithdrawModalMobile } from 'components';
import { useAccount, useContractRead } from 'wagmi';
import companyAbi from 'utils/abi/company.json';
import { useRouter } from 'next/router';

interface ICompanyCard {
	company: GetUserCompaniesRes;
	userCompanies: GetUserCompaniesRes[];
}

export const CompanyCard: React.FC<ICompanyCard> = ({
	company,
	userCompanies,
}) => {
	const theme = usePicasso();
	const [isLoadingButton, setIsLoadingButton] = useState<boolean>(false);
	const { t: translate } = useTranslation('companies');
	const { isOpen, onOpen, onClose } = useDisclosure();
	const {
		isOpen: isOpenMobile,
		onOpen: onOpenMobile,
		onClose: onCloseMobile,
	} = useDisclosure();
	const { isLoadingCompanies } = useCompanies();
	const { address } = useAccount();
	const { listOfTokens } = useTokens();
	const { locale } = useRouter();

	const { data: employeeBalance } = useContractRead({
		address: company.contract,
		abi: companyAbi,
		functionName: 'getSingleBalance',
		args: [address],
	});

	const { data: companyBalance } = useContractRead({
		address: company.contract,
		abi: companyAbi,
		functionName: '_CompanyBalance',
	});

	return (
		<Flex
			boxShadow="lg"
			bg="white"
			borderRadius="base"
			direction="column"
			gap={{ md: '1', lg: '2', xl: '4' }}
			minW={{
				base: '13.813rem',
				md: '10.55rem',
				lg: '10.5rem',
				xl: '13.813rem',
				'2xl': '13.1rem',
			}}
			maxW={{ base: '10.55rem', lg: '10.5rem' }}
			h="8.375rem"
		>
			<WithdrawModal
				employeeBalance={(employeeBalance || 0n) as bigint}
				isOpen={isOpen}
				onClose={onClose}
				userCompanies={userCompanies}
				company={company}
			/>
			<WithdrawModalMobile
				employeeBalance={(employeeBalance || 0n) as bigint}
				isOpen={isOpenMobile}
				onClose={onCloseMobile}
				userCompanies={userCompanies}
				company={company}
			/>
			<Flex direction="column" pt="2.5" pl="4" color={theme.text.primary}>
				<Flex align="center" gap={{ base: '1', xl: '2' }}>
					{company.logo ? (
						<Img src={getLogo(company.logo)} boxSize="6" borderRadius="base" />
					) : (
						<Flex
							boxSize="6"
							borderRadius="base"
							align="center"
							justify="center"
							fontSize="xs"
							fontWeight="bold"
							bg={theme.bg.white2}
						>
							{handleLogoImage(company.name)}
						</Flex>
					)}
					<Text
						fontSize={{ base: 'md', xl: 'md' }}
						maxW="36"
						whiteSpace="nowrap"
						overflow="hidden"
						fontWeight="bold"
					>
						{company?.name}
					</Text>
				</Flex>
				{!company.isAdmin && (
					<Flex pt={{ base: '3', xl: '3' }} justify="space-between" pr="6">
						<Flex maxW="20">
							<Text fontSize={{ base: 'xs', md: 'xs' }} color="gray.500">
								{translate('availableToWithdraw')}
							</Text>
						</Flex>
						<Flex fontSize={{ base: 'sm', md: 'xs', xl: 'sm' }}>
							{isLoadingCompanies ? (
								<Skeleton w="10" h="4" />
							) : (
								<Flex direction="column">
									<Text>
										${' '}
										{employeeBalance && locale && company.tokenDecimals
											? formatCryptoToDollar(
													employeeBalance as bigint,
													company.tokenDecimals
											  )
											: 0}
									</Text>
									<Flex align="center" gap="1">
										<Text fontSize="xs">
											{employeeBalance && company.tokenDecimals && locale
												? formatCrypto(
														employeeBalance as bigint,
														company.tokenDecimals
												  )
												: 0}
										</Text>
										<Img src={getCoinLogo('USDT', listOfTokens)} boxSize="4" />
									</Flex>
								</Flex>
							)}
						</Flex>
					</Flex>
				)}
				{company.isAdmin ? (
					<Flex pt={{ base: '3', xl: '3' }} justify="space-between" pr="6">
						<Flex direction="column">
							<Text fontSize={{ base: 'xs', md: 'sm' }} color="gray.500">
								{translate('funds')}
							</Text>
							{isLoadingCompanies ? (
								<Skeleton w="10" h="4" />
							) : (
								<Flex fontSize={{ base: 'sm', md: 'xs', xl: 'sm' }}>
									{isLoadingCompanies ? (
										<Skeleton w="10" h="4" />
									) : (
										<Text>
											$
											{companyBalance && locale && company.tokenDecimals
												? formatCryptoToDollar(
														companyBalance as bigint,
														company.tokenDecimals
												  )
												: 0}
										</Text>
									)}
								</Flex>
							)}
						</Flex>
						<Flex direction="column">
							<Text fontSize={{ base: 'xs', md: 'sm' }} color="gray.500">
								{translate('members')}
							</Text>

							{isLoadingCompanies ? (
								<Skeleton w="10" h="4" />
							) : (
								<Text fontSize={{ base: 'sm', md: 'xs', xl: 'sm' }}>
									{company.total_members}
								</Text>
							)}
						</Flex>
					</Flex>
				) : (
					''
				)}
			</Flex>
			<Flex
				// bg="red"
				w="100%"
				align="center"
				justify="center"
				pb={{ lg: '2', xl: '4' }}
				pt={{ base: '3', xl: '0' }}
			>
				{company?.isAdmin ? (
					<Link
						w="full"
						href={navigationPaths.dashboard.companies.overview(
							company.id?.toString()
						)}
						as={NextLink}
					>
						<Button
							pb="3"
							isLoading={isLoadingButton}
							color={theme.branding.blue2}
							h="max-content"
							w="full"
							fontSize="xs"
							fontWeight="medium"
							cursor="pointer"
							onClick={() => setIsLoadingButton(true)}
						>
							{translate('manage')}
						</Button>
					</Link>
				) : (
					<>
						<Button
							pb="3"
							display={{ base: 'none', sm: 'flex' }}
							color={theme.branding.blue2}
							bg="none"
							fontSize="xs"
							fontWeight="medium"
							cursor="pointer"
							onClick={() => {
								onOpen();
								setIsLoadingButton(true);
							}}
						>
							{translate('withdraw')}
						</Button>
						<Button
							pb="3"
							display={{ base: 'flex', sm: 'none' }}
							color={theme.branding.blue2}
							bg="none"
							fontSize="xs"
							fontWeight="medium"
							cursor="pointer"
							onClick={() => {
								onOpenMobile();
								setIsLoadingButton(true);
							}}
						>
							{translate('withdraw')}
						</Button>
					</>
				)}
			</Flex>
		</Flex>
	);
};

export default CompanyCard;
