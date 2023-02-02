import { Flex } from '@chakra-ui/react';
import { HaveProblemCard, LifeIsEasierBanner } from 'components';

export const CompaniesRightBar = () => (
	<Flex direction="column" gap="8">
		<LifeIsEasierBanner />
		<HaveProblemCard />
	</Flex>
);
