import { Flex } from '@chakra-ui/react';
import { HaveProblemCard, LifeIsEasierBanner } from 'components';

export const DashboardRightBar = () => (
	<Flex direction="column" gap="6" w={{ lg: '14rem', xl: '18.5rem' }}>
		<LifeIsEasierBanner />
		<HaveProblemCard />
	</Flex>
);
