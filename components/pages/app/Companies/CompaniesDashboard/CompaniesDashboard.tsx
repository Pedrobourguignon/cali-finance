import { Flex, Text } from '@chakra-ui/react';
import { OffsetButton } from 'components';
import { usePicasso } from 'hooks';
import useTranslation from 'next-translate/useTranslation';

interface ICompaniesDashboard {
	companiesCount: number;
	teams: string;
	members: string;
	totalFunds: string;
}

export const CompaniesDashboard: React.FC<ICompaniesDashboard> = ({
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
			py={{ md: '4', xl: '6', '2xl': '8' }}
			px={{ md: '3', xl: '5', '2xl': '7' }}
			borderRadius="base"
			align="center"
		>
			<Flex direction="column">
				<Text
					fontSize={{ md: 'sm', lg: 'xl', xl: '2xl', '2xl': '3xl' }}
					fontWeight="medium"
				>
					{companiesCount}
				</Text>
				<Text
					fontSize={{ md: 'xs', xl: 'sm', '2xl': 'md' }}
					fontWeight="normal"
				>
					{translate('companies')}
				</Text>
			</Flex>
			<Flex direction="column">
				<Text
					fontSize={{ md: 'sm', lg: 'xl', xl: '2xl', '2xl': '3xl' }}
					fontWeight="medium"
				>
					{teams}
				</Text>
				<Text
					fontSize={{ md: 'xs', xl: 'sm', '2xl': 'md' }}
					fontWeight="normal"
				>
					{translate('teams')}
				</Text>
			</Flex>
			<Flex direction="column">
				<Text
					fontSize={{ md: 'sm', lg: 'xl', xl: '2xl', '2xl': '3xl' }}
					fontWeight="medium"
				>
					{members}
				</Text>
				<Text
					fontSize={{ md: 'xs', xl: 'sm', '2xl': 'md' }}
					fontWeight="normal"
				>
					{translate('members')}
				</Text>
			</Flex>
			<Flex direction="column">
				<Text
					fontSize={{ md: 'sm', lg: 'xl', xl: '2xl', '2xl': '3xl' }}
					fontWeight="medium"
					minW={{ md: '20', lg: '24' }}
				>
					${totalFunds}
				</Text>
				<Text
					fontSize={{ md: 'xs', xl: 'sm', '2xl': 'md' }}
					fontWeight="normal"
				>
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
