import { Flex } from '@chakra-ui/react';
import {
	RecentActivities,
	UpgradeAccount,
	WithdrawalsBanner,
} from 'components';
import { usePicasso } from 'hooks';

export const Create = () => {
	const theme = usePicasso();
	return (
		<Flex direction="column">
			<WithdrawalsBanner />
			<RecentActivities />
			<UpgradeAccount />
		</Flex>
	);
};
export default Create;
