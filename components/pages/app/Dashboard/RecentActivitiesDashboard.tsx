import { Flex, Img, Text, Link } from '@chakra-ui/react';
import React from 'react';
import { IRecentActivitiesComponent } from 'types';
import useTranslation from 'next-translate/useTranslation';
import { navigationPaths } from 'utils';
import { usePicasso } from 'hooks';
import NextLink from 'next/link';

export const RecentActivitiesDashboard: React.FC<
	IRecentActivitiesComponent
> = ({ recentActivitiesList }) => {
	const { t: translate } = useTranslation('dashboard');
	const theme = usePicasso();
	return (
		<Flex
			direction="column"
			borderRadius="base"
			boxShadow="base"
			px="4"
			bg="white"
			h="max-content"
			w="full"
		>
			<Flex justify="space-between" pt="2.5" align="center">
				<Flex>
					<Text
						fontSize={{ md: 'sm', xl: 'md' }}
						fontWeight="medium"
						color={theme.text.primary}
					>
						{translate('recentActivities')}
					</Text>
				</Flex>
				<Link href={navigationPaths.dashboard.history} as={NextLink}>
					<Text
						fontSize="xs"
						cursor="pointer"
						color="gray.500"
						fontWeight="medium"
					>
						{translate('seeAll')}
					</Text>
				</Link>
			</Flex>
			<Flex direction="column" gap="2" py="4">
				{recentActivitiesList.map((activity, index) => (
					<Flex
						w="full"
						key={+index}
						justify="space-between"
						bg="gray.100"
						color="white"
						borderRadius="base"
						align="center"
					>
						<Flex gap={{ md: '2.5', '2xl': '4' }} align="center" p="0.5">
							<Img src="/icons/deposit.svg" boxSize="7" pl="3" />
							<Flex direction="column" justify="center">
								<Text
									color={theme.text.primary}
									fontSize={{ md: 'xs', lg: 'sm' }}
									fontWeight="normal"
								>
									{activity.type}
								</Text>
								<Text color="gray.500" fontSize="xs" whiteSpace="nowrap">
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
							<Text fontSize="xs" color={theme.text.primary}>
								{activity.value}
							</Text>
							<Text fontSize="xs" color="green.400" whiteSpace="nowrap">
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
