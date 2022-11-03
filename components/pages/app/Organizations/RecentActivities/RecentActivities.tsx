import { Flex, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import { ActivitiesData } from 'components';
import { useOrganizations } from 'hooks';

export const RecentActivities = () => {
	const { activities } = useOrganizations();
	return (
		<Flex color="black">
			<Flex
				direction="column"
				bg="white"
				px="4"
				py="2.5"
				gap="4"
				borderRadius="base"
			>
				<Flex justify="space-between" align="center">
					<Text color="black">Recent Activities</Text>
					<NextLink href="/">
						<Text color="gray.500" fontSize="xs" cursor="pointer">
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
		</Flex>
	);
};
