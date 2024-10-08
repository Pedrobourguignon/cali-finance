import { Flex, Text } from '@chakra-ui/react';
import { OffsetButton } from 'components';
import { usePicasso } from 'hooks';
import useTranslation from 'next-translate/useTranslation';

interface IMockCompanyDashboard {
	companiesCount: number | undefined;
	teams: number;
	members: number;
	totalFunds: number;
}

export const CompaniesDashboard: React.FC<IMockCompanyDashboard> = ({
	members,
	companiesCount,
	teams,
	totalFunds,
}) => {
	const theme = usePicasso();
	const { t: translate } = useTranslation('companies');
	return (
		<Flex
			justify="space-between"
			bg={theme.bg.primary}
			py="6"
			px={{ md: '3', xl: '5', '2xl': '7' }}
			borderRadius="base"
			align="center"
		>
			<Flex direction="column" justify="space-between">
				<Text fontSize={{ md: 'sm', lg: 'xl', xl: '2xl' }} fontWeight="medium">
					{!companiesCount ? '0' : companiesCount}
				</Text>
				<Text fontSize={{ md: 'xs', xl: 'sm' }} fontWeight="normal">
					{translate('companies')}
				</Text>
			</Flex>
			<Flex direction="column">
				<Text fontSize={{ md: 'sm', lg: 'xl', xl: '2xl' }} fontWeight="medium">
					{teams}
				</Text>
				<Text fontSize={{ md: 'xs', xl: 'sm' }} fontWeight="normal">
					{translate('teams')}
				</Text>
			</Flex>
			<Flex direction="column">
				<Text fontSize={{ md: 'sm', lg: 'xl', xl: '2xl' }} fontWeight="medium">
					{members}
				</Text>
				<Text fontSize={{ md: 'xs', xl: 'sm' }} fontWeight="normal">
					{translate('members')}
				</Text>
			</Flex>
			<Flex direction="column">
				<Text
					fontSize={{ md: 'sm', lg: 'xl', xl: '2xl' }}
					fontWeight="medium"
					minW={{ md: '20', lg: '24' }}
				>
					${totalFunds.toLocaleString('EN-us')}
				</Text>
				<Text fontSize={{ md: 'xs', xl: 'sm' }} fontWeight="normal">
					{translate('totalFunds')}
				</Text>
			</Flex>
			<OffsetButton
				name={translate('createCompany')}
				route="companies/create"
			/>
		</Flex>
	);
};
