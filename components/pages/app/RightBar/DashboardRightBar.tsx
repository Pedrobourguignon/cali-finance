import { Flex } from '@chakra-ui/react';
import {
	HaveProblemCard,
	LifeIsEasierBanner,
	LifeIsEasierTabletBreakpoint,
	CreateAccountBanner,
} from 'components';
import { useAuth } from 'hooks';

export const DashboardRightBar = () => {
	const { session } = useAuth();
	return session ? (
		<Flex direction="column" gap="6" w="full">
			<Flex display={{ md: 'none', lg: 'flex' }}>
				<LifeIsEasierBanner />
			</Flex>
			<Flex display={{ md: 'flex', lg: 'none' }}>
				<LifeIsEasierTabletBreakpoint />
			</Flex>
			<HaveProblemCard />
		</Flex>
	) : (
		<CreateAccountBanner />
	);
};
