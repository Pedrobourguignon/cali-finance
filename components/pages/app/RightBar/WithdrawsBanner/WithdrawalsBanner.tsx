import { Flex, Icon, Text } from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import { InfosBanner, WithdrawsBar, LifeIsEasier } from 'components';

export const WithdrawalsBanner = () => {
	const theme = usePicasso();
	return (
		<InfosBanner>
			<Flex direction="column" px="4" py="4" gap="12">
				<WithdrawsBar />
				<LifeIsEasier />
			</Flex>
		</InfosBanner>
	);
};
