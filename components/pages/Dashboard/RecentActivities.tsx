import { Flex, Img, Text, Link } from '@chakra-ui/react';
import React from 'react';
import { IRecentActivitiesComponent } from 'types';
import { navigationPaths } from 'utils';
import NextLink from 'next/link';

export const RecentActivities: React.FC<IRecentActivitiesComponent> = ({
	recentActivitiesList,
}) => (
	<Flex
		direction="column"
		borderRadius="base"
		gap="2"
		boxShadow="xl"
		px="3"
		bg="white"
	>
		<Flex justify="space-between" py="2">
			<Flex>
				<Text fontSize="md" fontWeight="medium" color="black">
					Recent Activities
				</Text>
			</Flex>
			<Link href={navigationPaths.dashboard.history} as={NextLink}>
				<Text fontSize="sm" cursor="pointer" color="gray.500">
					See all
				</Text>
			</Link>
		</Flex>
		<Flex direction="column" gap="2" py="2">
			{recentActivitiesList.map((activity, index) => (
				<Flex
					key={+index}
					justify="space-between"
					bg="gray.50"
					color="white"
					px="4"
					w="max-content"
					h="max-content"
					borderRadius="base"
					align="center"
				>
					<Flex gap="2" align="center" p="0.5">
						<Img src="/icons/deposit.svg" boxSize="4" />
						<Flex direction="column" justify="center">
							<Text color="black" fontSize="sm" fontWeight="normal">
								{activity.type}
							</Text>
							<Text color="gray.500" fontSize="xs">
								{activity.date}
							</Text>
						</Flex>
					</Flex>
					<Flex px="6" />
					<Flex direction="column" align="flex-end" fontSize="sm" p="0.5">
						<Text fontSize="xs" color="black">
							{activity.value}
						</Text>
						<Text fontSize="xs" color="green.400">
							{activity.status}
						</Text>
					</Flex>
				</Flex>
			))}
		</Flex>
	</Flex>
);

export default RecentActivities;
