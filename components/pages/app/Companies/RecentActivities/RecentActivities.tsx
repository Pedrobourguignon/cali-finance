import { Flex, Text, Link } from '@chakra-ui/react';
import { ActivitiesData } from 'components';
import { useCompanies, usePicasso } from 'hooks';
import useTranslation from 'next-translate/useTranslation';
import { navigationPaths } from 'utils';
import NextLink from 'next/link';

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
				<Text fontWeight="medium" fontSize="md">
					{translate('recentActivities')}
				</Text>
				<Link href={navigationPaths.dashboard.history} as={NextLink}>
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
				{!activities ? (
					<Text color={theme.text.primary} fontSize="sm" lineHeight="5">
						{translate('yourLatestActivities')}
					</Text>
				) : (
					activities.map((activity, index) => (
						<ActivitiesData key={+index} activities={activity} />
					))
				)}
			</Flex>
		</Flex>
	);
};
