import { Flex } from '@chakra-ui/react';
import { HaveProblemCard, LifeIsEasierBanner } from 'components';

export const DashboardRightBar = () => (
	<Flex direction="column" gap="6">
		<LifeIsEasierBanner />
		<HaveProblemCard />
	</Flex>
);
