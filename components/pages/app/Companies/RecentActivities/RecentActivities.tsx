import { Flex, Text, Link } from '@chakra-ui/react';
import { ActivitiesData } from 'components';
import { useCompanies, usePicasso } from 'hooks';
import useTranslation from 'next-translate/useTranslation';
import { navigationPaths } from 'utils';

export const RecentActivities = () => {
	const { activities } = useCompanies();
	const theme = usePicasso();
	const { t: translate } = useTranslation('companies');

	return (
		<Flex
			direction="column"
			bg="white"
			px="4"
			pt="2.5"
			pb="4"
			gap="4"
			borderRadius="base"
			color={theme.text.primary}
			w="full"
		>
			<Flex justify="space-between" align="center">
				<Text
					fontWeight="medium"
					fontSize={{ lg: 'sm', xl: 'md', '2xl': 'lg' }}
				>
					{translate('recentActivities')}
				</Text>
				<Link href={navigationPaths.dashboard.history}>
					<Text
						color="gray.500"
						fontSize={{ md: 'xs', '2xl': 'sm' }}
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
