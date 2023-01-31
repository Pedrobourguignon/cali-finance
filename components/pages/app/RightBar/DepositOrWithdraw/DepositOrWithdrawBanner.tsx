import { Flex } from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import {
	InfosBanner,
	LifeIsEasier,
	DepositOrWithdrawCard,
	HaveProblemCard,
} from 'components';

export const DepositOrWithdrawBanner = () => {
	const theme = usePicasso();
	return (
		<Flex direction="column" gap="8">
			<InfosBanner>
				<Flex
					bg={theme.bg.black}
					zIndex="docked"
					gap="20"
					p="4"
					direction="column"
					borderRadius="base"
					className="deposit-withdraw-banner"
				>
					<DepositOrWithdrawCard />
					<LifeIsEasier />
				</Flex>
			</InfosBanner>
			<HaveProblemCard />
		</Flex>
	);
};
