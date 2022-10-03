import { Flex, Img, Text } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
import { IRecentActivitiesComponent } from 'types';

export const RecentActivities: React.FC<IRecentActivitiesComponent> = ({
	recentActivitiesList,
}) => (
	<Flex
		h="266px"
		w="297px"
		direction="column"
		ml="8"
		mt="4"
		borderRadius="base"
		gap="2"
		boxShadow="xl"
	>
		<Flex justify="space-between">
			<Flex px="4" py="2.5">
				<Text fontSize="md" fontWeight="medium">
					Recent Activities
				</Text>
			</Flex>
			<Link href="/">
				<Text fontSize="sm" cursor="pointer" px="4" py="2.5" color="gray.500">
					See all
				</Text>
			</Link>
		</Flex>
		{recentActivitiesList.map((activity, index) => (
			<Flex
				key={+index}
				justify="space-between"
				bg="gray.50"
				color="white"
				px="4"
				mx="auto"
				w="265px"
				h="10"
				borderRadius="base"
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
);

export default RecentActivities;
