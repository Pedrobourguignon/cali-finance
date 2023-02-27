import { Flex, Img, Link, Text } from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import { ICompany } from 'types';
import { handleLogoImage, navigationPaths } from 'utils';
import NextLink from 'next/link';

interface ITesteCompany {
	name: string;
	logo: string;
}
interface ICompanyCard {
	companie: ITesteCompany;
}

export const CompanyCard: React.FC<ICompanyCard> = ({ companie }) => {
	const theme = usePicasso();
	const { t: translate } = useTranslation('companies');

	return (
		<Flex
			boxShadow="lg"
			bg="white"
			borderRadius="base"
			direction="column"
			gap={{ md: '1', lg: '2', xl: '4' }}
			minW={{
				md: '8.288rem',
				lg: '10.5rem',
				xl: '13.813rem',
				'2xl': '16.575rem',
			}}
			h="8.375rem"
		>
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
							bg={theme.bg.white2}
						>
							{handleLogoImage(companie.name)}
						</Flex>
					)}
					<Text fontSize={{ md: 'xs', xl: 'md' }} fontWeight="bold">
						{companie.name.split(' ')[0]} {companie.name.split(' ')[1]}
					</Text>
				</Flex>
				<Flex pt={{ md: '1', xl: '3' }} justify="space-between" pr="6">
					<Flex direction="column">
						<Text fontSize={{ md: 'xs', xl: 'sm' }} color="gray.500">
							{translate('funds')}
						</Text>
						<Text fontSize={{ md: 'xs', xl: 'sm' }}>
							{/* ${companie.funds.toLocaleString('en-US')} */}
							1234
						</Text>
					</Flex>
					<Flex direction="column">
						<Text fontSize={{ md: 'xs', xl: 'sm' }} color="gray.500">
							{translate('members')}
						</Text>
						<Text fontSize={{ md: 'xs', xl: 'sm' }}>
							{/* {companie.members} */}
							17
						</Text>
					</Flex>
				</Flex>
			</Flex>
			<Flex w="100%" align="center" justify="center" pb={{ lg: '2', xl: '4' }}>
				<Link
					href={navigationPaths.dashboard.companies.overview('1')}
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
			</Flex>
		</Flex>
	);
};

export default CompanyCard;
