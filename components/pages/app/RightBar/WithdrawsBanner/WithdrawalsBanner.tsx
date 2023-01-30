import { Flex } from '@chakra-ui/react';
import {
	InfosBanner,
	WithdrawsBar,
	LifeIsEasier,
	HaveProblemCard,
} from 'components';

export const WithdrawalsBanner = () => (
	<Flex direction="column" gap="8" w="100%">
		<InfosBanner>
			<Flex direction="column" px="4" py="4" gap="12" w="100%">
				<WithdrawsBar />
				<LifeIsEasier />
			</Flex>
		</InfosBanner>
		<HaveProblemCard />
	</Flex>
);
