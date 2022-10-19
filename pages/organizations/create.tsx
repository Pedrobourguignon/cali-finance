import { Flex } from '@chakra-ui/react';
import {
	NewOrganizationLinks,
	RecentActivities,
	UpgradeAccount,
	WithdrawalsBanner,
} from 'components';
import { EmployeesDashboard } from 'components/pages/Organizations/EmployeesDashboard/EmployeesDashboard';
import { Premium } from 'components/pages/Organizations/PremiumAlert/Premium';
import { usePicasso } from 'hooks';

export const Create = () => {
	const theme = usePicasso();
	return (
		<Flex direction="column">
			<WithdrawalsBanner />
			<RecentActivities />
			<UpgradeAccount />
			<EmployeesDashboard />
			<Premium />
			<NewOrganizationLinks />
		</Flex>
	);
};
export default Create;
