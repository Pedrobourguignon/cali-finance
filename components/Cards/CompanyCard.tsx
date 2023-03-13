import {
	Flex,
	Img,
	Link,
	Skeleton,
	Text,
	useDisclosure,
} from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import { handleLogoImage, navigationPaths } from 'utils';
import NextLink from 'next/link';
import { GetUserCompaniesRes } from 'types/interfaces/main-server/ICompany';
import { WithdrawModal } from 'components/Modals';

interface ICompanyCard {
	companie: GetUserCompaniesRes;
	members: number;
	userCompanies: GetUserCompaniesRes[];
}

export const CompanyCard: React.FC<ICompanyCard> = ({
	companie,
	members,
	userCompanies,
}) => {
	const theme = usePicasso();
	const { t: translate } = useTranslation('companies');
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<Flex
			boxShadow="lg"
			bg="white"
			borderRadius="base"
			direction="column"
			gap={{ md: '1', lg: '2', xl: '4' }}
			w={{
				md: '8.288rem',
				lg: '10.5rem',
				xl: '13.813rem',
			}}
			h="8.375rem"
		>
			<WithdrawModal
				isOpen={isOpen}
				onClose={onClose}
				userCompanies={userCompanies}
			/>
			<Flex direction="column" pt="2.5" pl="4" color={theme.text.primary}>
				<Flex align="center" gap={{ md: '1', xl: '2' }}>
					{companie.logo ? (
						<Img src={companie.logo} boxSize="6" borderRadius="base" />
					) : (
						<Flex
							boxSize="6"
							borderRadius="base"
							align="center"
							justify="center"
							fontSize="xs"
							fontWeight="bold"
						>
							<Text whiteSpace="nowrap">{handleLogoImage(companie.name!)}</Text>
						</Flex>
					)}
					<Text fontSize={{ md: 'xs', xl: 'md' }} fontWeight="bold">
						{companie.name!.split(' ')[0]} {companie.name!.split(' ')[1]}
					</Text>
				</Flex>
				<Flex pt={{ md: '1', xl: '3' }} justify="space-between" pr="6">
					<Flex direction="column">
						<Text fontSize={{ md: 'xs', xl: 'sm' }} color="gray.500">
							{companie.isAdmin
								? translate('funds')
								: translate('availableToWithdraw')}
						</Text>
						{!companie.revenue ? (
							<Skeleton w="8" h="4" />
						) : (
							<Text fontSize={{ md: 'xs', xl: 'sm' }}>
								${companie.revenue!.toLocaleString('en-US')}
							</Text>
						)}
					</Flex>
					{companie.isAdmin ? (
						<Flex direction="column">
							<Text fontSize={{ md: 'xs', xl: 'sm' }} color="gray.500">
								{translate('members')}
							</Text>
							<Text fontSize={{ md: 'xs', xl: 'sm' }}>{members}</Text>
						</Flex>
					) : (
						<Flex />
					)}
				</Flex>
			</Flex>
			<Flex w="100%" align="center" justify="center" pb={{ lg: '2', xl: '4' }}>
				{companie.isAdmin ? (
					<Link
						href={navigationPaths.dashboard.companies.overview(
							companie.id!.toString()
						)}
						as={NextLink}
					>
						<Text
							color={theme.branding.blue}
							bg="none"
							fontSize={{ md: 'xs' }}
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
						fontSize={{ md: 'xs' }}
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
