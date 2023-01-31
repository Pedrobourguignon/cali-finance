import { Flex, Img, Text, Link } from '@chakra-ui/react';
import React from 'react';
import { IRecentActivitiesComponent } from 'types';
import useTranslation from 'next-translate/useTranslation';
import { navigationPaths } from 'utils';

export const RecentActivitiesDashboard: React.FC<
	IRecentActivitiesComponent
> = ({ recentActivitiesList }) => {
	const { t: translate } = useTranslation('dashboard');
	return (
		<Flex
			direction="column"
			borderRadius="base"
			boxShadow="xl"
			px="3"
			bg="white"
			minH={{ xl: '16.625rem' }}
			w="max-content"
		>
			<Flex justify="space-between" py="2" align="center">
				<Flex>
					<Text
						fontSize={{ md: 'sm', lg: 'md' }}
						fontWeight="medium"
						color="black"
					>
						{translate('recentActivities')}
					</Text>
				</Flex>
				<Link href={navigationPaths.dashboard.history}>
					<Text
						fontSize={{ md: 'xs', lg: 'sm' }}
						cursor="pointer"
						color="gray.500"
					>
						{translate('seeAll')}
					</Text>
				</Link>
			</Flex>
			<Flex direction="column" gap="2" py="2">
				{recentActivitiesList.map((activity, index) => (
					<Flex
						key={+index}
						justify="space-around"
						bg="gray.50"
						color="white"
						w="max-content"
						borderRadius="base"
						align="center"
						gap={{ xl: '14', '2xl': '32' }}
					>
						<Flex gap={{ md: '2.5', '2xl': '4' }} align="center" p="0.5">
							<Img src="/icons/deposit.svg" boxSize="7" pl="3" />
							<Flex direction="column" justify="center">
								<Text
									color="black"
									fontSize={{ md: 'xs', lg: 'sm' }}
									fontWeight="normal"
								>
									{activity.type}
								</Text>
								<Text color="gray.500" fontSize="xs">
									{activity.date}
								</Text>
							</Flex>
						</Flex>
						<Flex
							direction="column"
							align="flex-end"
							fontSize={{ md: 'xs', lg: 'sm' }}
							p="0.5"
							pr="2"
						>
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
};

export default RecentActivitiesDashboard;
