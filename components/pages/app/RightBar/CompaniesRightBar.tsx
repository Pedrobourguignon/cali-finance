import { Flex } from '@chakra-ui/react';
import {
	HaveProblemCard,
	LifeIsEasierBanner,
	LifeIsEasierTabletBreakpoint,
} from 'components';

export const CompaniesRightBar = () => (
	<Flex direction="column" gap="8">
		<Flex display={{ md: 'none', lg: 'flex' }}>
			<LifeIsEasierBanner />
		</Flex>
		<Flex display={{ md: 'flex', lg: 'none' }}>
			<LifeIsEasierTabletBreakpoint />
		</Flex>
		<HaveProblemCard />
	</Flex>
);
