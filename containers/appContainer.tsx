import { Flex } from '@chakra-ui/react';
import {
	CreateOrganizationCard,
	DashboardHeader,
	NewOrganizationsDashboard,
} from 'components';

import { usePicasso } from 'hooks';

import { AppLayout } from 'layouts/appLayout';

export const AppContainer: React.FC = () => {
	const theme = usePicasso();

	return (
		<AppLayout>
			<Flex
				bg="white"
				w="full"
				borderLeft="0.25rem solid"
				borderColor={theme.branding.blue}
				borderLeftRadius="sm"
				gap="4"
				justify="space-between"
				px="8"
			>
				<Flex direction="column" gap="4" pt="8" w="100%">
					<DashboardHeader />
					<NewOrganizationsDashboard />
					<CreateOrganizationCard />
				</Flex>
			</Flex>
		</AppLayout>
	);
};
