import { Flex, Text, Link } from '@chakra-ui/react';
import { ActivitiesData } from 'components';
import { useOrganizations, usePicasso } from 'hooks';
import useTranslation from 'next-translate/useTranslation';
import { navigationPaths } from 'utils';

export const RecentActivities = () => {
	const { activities } = useOrganizations();
	const theme = usePicasso();
	const { t: translate } = useTranslation('organizations');

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
				<Text fontWeight="medium">{translate('recentActivities')}</Text>
				<Link href={navigationPaths.dashboard.organizations.funds('1')}>
					<Text
						color="gray.500"
						fontSize="xs"
						cursor="pointer"
						fontWeight="medium"
					>
						{translate('seeAll')}
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
