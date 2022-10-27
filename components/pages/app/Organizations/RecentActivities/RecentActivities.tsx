import { Flex, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import { ActivitiesData } from 'components';

interface IActivities {
	name: string;
	type: string;
	date: string;
	value: string;
	coin: string;
	status: string;
}

interface IRecentActivities {
	activities: IActivities[];
}
export const RecentActivities: React.FC<IRecentActivities> = activities => (
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
				{
					// eslint-disable-next-line react/destructuring-assignment
					activities.activities.map((item, index) => (
						<ActivitiesData
							key={index}
							name={item.name}
							type={item.type}
							date={item.date}
							coin={item.coin}
							status={item.status}
							value={item.value}
						/>
					))
				}
			</Flex>
		</Flex>
	</Flex>
);
