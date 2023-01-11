import { Flex, Text } from '@chakra-ui/react';
import { OffsetButton } from 'components';
import { usePicasso } from 'hooks';
import useTranslation from 'next-translate/useTranslation';

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
	const { t: translate } = useTranslation('organizations');
	return (
		<Flex
			gap="12"
			bg={theme.bg.primary}
			py="6"
			px="5"
			borderRadius="base"
			align="center"
		>
			<Flex direction="column">
				<Text fontSize="2xl" fontWeight="medium">
					{organizationsCount}
				</Text>
				<Text fontSize="sm" fontWeight="normal">
					{translate('organizations')}
				</Text>
			</Flex>
			<Flex direction="column">
				<Text fontSize="2xl" fontWeight="medium">
					{teams}
				</Text>
				<Text fontSize="sm" fontWeight="normal">
					{translate('teams')}
				</Text>
			</Flex>
			<Flex direction="column">
				<Text fontSize="2xl" fontWeight="medium">
					{members}
				</Text>
				<Text fontSize="sm" fontWeight="normal">
					{translate('members')}
				</Text>
			</Flex>
			<Flex direction="column">
				<Text fontSize="2xl" fontWeight="medium" minW="24">
					${totalFunds}
				</Text>
				<Text fontSize="sm" fontWeight="normal">
					{translate('totalFunds')}
				</Text>
			</Flex>
			<OffsetButton
				name={translate('createOrganization')}
				route="organizations/create"
			/>
		</Flex>
	);
};
