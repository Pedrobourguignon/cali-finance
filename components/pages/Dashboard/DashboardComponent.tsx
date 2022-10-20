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
			borderLeftRadius="sm"
			gap="4"
			justify="space-between"
			px="8"
		>
			<Flex direction="column" gap="4" pt="8">
				<DashboardHeader />
				<Coins />
				<CreateOrganizationCard />
			</Flex>
			<Flex direction="column" gap="4" mt="4" w="74">
				<SwapToken />
				<HaveProblemCard />
			</Flex>
		</Flex>
	);
};

export default DashboardComponent;
