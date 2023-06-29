/* eslint-disable no-underscore-dangle */
import {
	Flex,
	Img,
	Link,
	Skeleton,
	Text,
	useDisclosure,
} from '@chakra-ui/react';
import { useCompanies, usePicasso } from 'hooks';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import { getLogo, handleLogoImage, navigationPaths } from 'utils';
import NextLink from 'next/link';
import { GetUserCompaniesRes } from 'types/interfaces/main-server/ICompany';
import { WithdrawModal } from 'components';

interface ICompanyCard {
	company: GetUserCompaniesRes;
	userCompanies: GetUserCompaniesRes[];
}

export const CompanyCard: React.FC<ICompanyCard> = ({
	company,
	userCompanies,
}) => {
	const theme = usePicasso();
	const { t: translate } = useTranslation('companies');
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { isLoadingCompanies } = useCompanies();

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
				isOpen={isOpen}
				onClose={onClose}
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
				<Flex pt={{ base: '3', xl: '3' }} justify="space-between" pr="6">
					<Flex direction="column">
						<Text
							fontSize={{ base: 'xs', md: 'xs', xl: 'sm' }}
							color="gray.500"
						>
							{company?.isAdmin
								? translate('funds')
								: translate('availableToWithdraw')}
						</Text>
						<Flex fontSize={{ base: 'sm', md: 'xs', xl: 'sm' }}>
							{isLoadingCompanies ? (
								<Skeleton w="10" h="4" />
							) : (
								<Text>{/* {company.totalFundsUsd} */}0</Text>
							)}
						</Flex>
					</Flex>
					{company?.isAdmin && (
						<Flex direction="column">
							<Text
								fontSize={{ base: 'xs', md: 'xs', xl: 'sm' }}
								color="gray.500"
							>
								{translate('members')}
							</Text>

							{
								// TODO:colocar members quando fael adicionar a rota
								isLoadingCompanies ? (
									<Skeleton w="10" h="4" />
								) : (
									<Text fontSize={{ base: 'sm', md: 'xs', xl: 'sm' }}>
										{/* {company.members} */}
										13
									</Text>
								)
							}
						</Flex>
					)}
				</Flex>
			</Flex>
			<Flex
				w="100%"
				align="center"
				justify="center"
				pb={{ lg: '2', xl: '4' }}
				pt={{ base: '3', xl: '0' }}
			>
				{company?.isAdmin ? (
					<Link
						href={navigationPaths.dashboard.companies.overview(
							company.id!.toString()
						)}
						as={NextLink}
					>
						<Text
							color={theme.branding.blue}
							bg="none"
							fontSize="xs"
							fontWeight="medium"
							cursor="pointer"
						>
							{translate('manage')}
						</Text>
					</Link>
				) : (
					<Text
						color={theme.branding.blue}
						bg="none"
						fontSize="xs"
						fontWeight="medium"
						cursor="pointer"
						onClick={onOpen}
					>
						{translate('withdraw')}
					</Text>
				)}
			</Flex>
		</Flex>
	);
};

export default CompanyCard;
