import { Flex } from '@chakra-ui/react';
import {
	DashboardHeader,
	Coins,
	CreateOrganizationCard,
	SwapToken,
	HaveProblemCard,
} from 'components';
import { usePicasso } from 'hooks';
import React from 'react';

export const DashboardComponent: React.FC = () => {
	const theme = usePicasso();
	return (
		<Flex
			bg="white"
			w="full"
			borderLeft="0.25rem solid"
			borderColor={theme.branding.blue}
			gap="4"
		>
			<Flex direction="column" ml="8" gap="4">
				<DashboardHeader />
				<Coins />
				<CreateOrganizationCard />
			</Flex>
			<Flex direction="column" gap="4" mt="4">
				<SwapToken />
				<HaveProblemCard />
			</Flex>
		</Flex>
	);
};

export default DashboardComponent;
