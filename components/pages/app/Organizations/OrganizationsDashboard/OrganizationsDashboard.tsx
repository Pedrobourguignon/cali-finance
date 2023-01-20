import { Flex, Text } from '@chakra-ui/react';
import { OffsetButton } from 'components';
import { usePicasso } from 'hooks';

interface IOrganizationsDashboard {
	organizationsCount: number;
	teams: string;
	members: string;
	totalFunds: string;
}

export const OrganizationsDashboard: React.FC<IOrganizationsDashboard> = ({
	members,
	organizationsCount,
	teams,
	totalFunds,
}) => {
	const theme = usePicasso();
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
					{organizationsCount}
				</Text>
				<Text
					fontSize={{ md: 'xs', xl: 'sm', '2xl': 'md' }}
					fontWeight="normal"
				>
					Organizations
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
					Teams
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
					Members
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
					Total Funds
				</Text>
			</Flex>
			<OffsetButton name="Create Organization" route="organizations/create" />
		</Flex>
	);
};
