import { Flex } from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import { InfosBanner, LifeIsEasier, DepositOrWithdrawCard } from 'components';

export const DepositOrWithdrawBanner = () => {
	const theme = usePicasso();
	return (
		<InfosBanner>
			<Flex
				bg={theme.bg.black}
				zIndex="docked"
				gap="20"
				p="4"
				direction="column"
				borderRadius="base"
			>
				<DepositOrWithdrawCard />
				<LifeIsEasier />
			</Flex>
		</InfosBanner>
	);
};
