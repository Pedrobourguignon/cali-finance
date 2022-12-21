import { Flex, Text, Link } from '@chakra-ui/react';
import { ActivitiesData } from 'components';
import { useOrganizations, usePicasso } from 'hooks';
import { navigationPaths } from 'utils';

export const RecentActivities = () => {
	const { activities } = useOrganizations();
	const theme = usePicasso();
	return (
		<Flex
			direction="column"
			bg="white"
			px="4"
			py="2.5"
			gap="4"
			borderRadius="base"
			color={theme.text.primary}
			w="full"
		>
			<Flex justify="space-between" align="center">
				<Text fontWeight="medium">Recent Activities</Text>
				<Link href={navigationPaths.dashboard.organizations.funds('1')}>
					<Text
						color="gray.500"
						fontSize="xs"
						cursor="pointer"
						fontWeight="medium"
					>
						See all
					</Text>
				</Link>
			</Flex>
			<Flex gap="2" direction="column">
				{activities.map((activity, index) => (
					<ActivitiesData key={+index} activities={activity} />
				))}
			</Flex>
		</Flex>
	);
};
