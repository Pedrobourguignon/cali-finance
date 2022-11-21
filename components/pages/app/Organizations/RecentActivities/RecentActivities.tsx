import { Flex, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import { ActivitiesData } from 'components';
import { useOrganizations, usePicasso } from 'hooks';

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
				<NextLink href="/">
					<Text
						color="gray.500"
						fontSize="xs"
						cursor="pointer"
						fontWeight="medium"
					>
						See All
					</Text>
				</NextLink>
			</Flex>
			<Flex gap="2" direction="column">
				{activities.map((activitie, index) => (
					<ActivitiesData key={+index} activities={activitie} />
				))}
			</Flex>
		</Flex>
	);
};