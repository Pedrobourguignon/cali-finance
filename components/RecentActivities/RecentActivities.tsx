import { Flex, Text } from '@chakra-ui/react';
import { ActivitiesData } from 'components/ActivitiesData/ActivitiesData';
import NextLink from 'next/link';

export const RecentActivities = () => (
	<Flex color="black">
		<Flex
			direction="column"
			bg="white"
			px="4"
			py="2.5"
			gap="4"
			borderRadius="base"
		>
			<Flex justify="space-between">
				<Text color="black">Recent Activities</Text>
				<NextLink href="/">See All</NextLink>
			</Flex>
			<Flex gap="2" direction="column">
				<ActivitiesData />
				<ActivitiesData />
				<ActivitiesData />
				<ActivitiesData />
			</Flex>
		</Flex>
	</Flex>
);
