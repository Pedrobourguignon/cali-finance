import { Flex } from '@chakra-ui/react';
import { WithdrawCard, SwapToken } from 'components';

export const DashboardRightBar = () => (
	<Flex direction="column" gap="6">
		<WithdrawCard />
	</Flex>
);
