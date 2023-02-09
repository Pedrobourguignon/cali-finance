import { Flex } from '@chakra-ui/react';
import {
	InfosBanner,
	WithdrawsBar,
	LifeIsEasier,
	HaveProblemCard,
} from 'components';

export const WithdrawalsBanner = () => (
	<Flex direction="column" w="100%" gap="8">
		<InfosBanner
			ondulatedImg="/images/bottom-small-wave.svg"
			ilustrationImg="/images/illustration.svg"
			bottom="0"
			position="absolute"
		>
			<Flex direction="column" px="4" py="4" gap="10" w="100%">
				<WithdrawsBar />
				<LifeIsEasier />
			</Flex>
		</InfosBanner>
		<HaveProblemCard />
	</Flex>
);
