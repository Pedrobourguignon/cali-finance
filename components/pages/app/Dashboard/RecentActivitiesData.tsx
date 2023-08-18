import { Flex, Grid, GridItem, Img, Text } from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import { useRouter } from 'next/router';
import React from 'react';
import { IActivitiesData } from 'types';
import { dateHandler, getNotificationsData } from 'utils';

export const RecentActivitiesData: React.FC<IActivitiesData> = ({
	activities,
}) => {
	const theme = usePicasso();
	const { locale } = useRouter();

	return (
		<Grid
			templateColumns="repeat(2, 1fr)"
			w="full"
			justifyContent="space-between"
			alignItems="center"
			bg="gray.50"
			px="3"
			display="flex"
		>
			<GridItem display="flex" flexDirection="row" alignItems="center" gap="2">
				<Img
					src={getNotificationsData(activities.event.name).icon}
					boxSize="4"
				/>
				<Flex direction="column">
					<Text fontSize="sm" color={theme.text.black}>
						{activities.event.description}
					</Text>
					<Text color="gray.500" fontSize="xs" whiteSpace="nowrap">
						{locale && dateHandler(activities.created_at, locale)}
					</Text>
				</Flex>
			</GridItem>
			<GridItem
				display="flex"
				flexDirection="column"
				alignItems="center"
				gap="2"
			>
				<Flex direction="column" align="end">
					<Text fontSize="xs" color={theme.text.black}>
						{Number(activities.meta.data.amount).toFixed(7)} USDT
					</Text>
					<Text color="green.400 " fontSize="xs" whiteSpace="nowrap">
						Completed
					</Text>
				</Flex>
			</GridItem>
		</Grid>
	);
};

export default RecentActivitiesData;
