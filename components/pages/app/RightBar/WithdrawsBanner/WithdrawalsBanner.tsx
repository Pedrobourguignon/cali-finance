import { Flex } from '@chakra-ui/react';
import { InfosBanner, WithdrawsBar, LifeIsEasier } from 'components';

export const WithdrawalsBanner = () => (
	<InfosBanner>
		<Flex direction="column" px="4" py="4" gap="12" w="100%">
			<WithdrawsBar />
			<LifeIsEasier />
		</Flex>
	</InfosBanner>
);
