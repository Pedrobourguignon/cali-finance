import { Flex } from '@chakra-ui/react';
import { WithdrawCard } from 'components';

export const DashboardRightBar = () => (
	<Flex direction="column" gap="6" w={{ lg: '14rem', xl: '18.5rem' }}>
		<WithdrawCard />
	</Flex>
);
