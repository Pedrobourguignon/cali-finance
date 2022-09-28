import { Flex } from '@chakra-ui/react';
import { DashboardHeader, Coins, CreateOrganizationCard } from 'components';
import { usePicasso } from 'hooks';
import React from 'react';

export const DashboardComponent: React.FC = () => {
	const theme = usePicasso();
	return (
		<Flex
			bg="white"
			w="full"
			h="95vh"
			m="auto"
			borderLeft="0.25rem solid"
			borderColor={theme.branding.blue}
		>
			<Flex direction="column">
				<DashboardHeader />
				<Coins />
				<CreateOrganizationCard />
			</Flex>
		</Flex>
	);
};

export default DashboardComponent;
