import { Flex, Grid, GridItem, Img, Text } from '@chakra-ui/react';
import { useCompanies, usePicasso } from 'hooks';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import { useQuery } from 'react-query';
import { IActivitiesData } from 'types';
import {
	activitieDescriptTranslation,
	dateHandler,
	getLogo,
	handleLogoImage,
	notificationIcons,
} from 'utils';

export const RecentActivitiesData: React.FC<IActivitiesData> = ({
	activities,
}) => {
	const theme = usePicasso();
	const { t: translate } = useTranslation('history-page');
	const { getCompanyById } = useCompanies();
	const { data: company } = useQuery('get-company-data', () =>
		getCompanyById(activities.meta.data.companyId)
	);

	return (
		<Grid
			templateColumns="repeat(4, 1fr)"
			gap={2}
			display="flex"
			w="full"
			justifyContent="space-between"
			alignItems="center"
		>
			<GridItem display="flex" alignContent="center" gap="2" flex="3.5">
				{company?.logo ? (
					<Img src={getLogo(company?.logo)} boxSize="6" borderRadius="base" />
				) : (
					<Flex
						boxSize="6"
						borderRadius="full"
						align="center"
						justify="center"
						fontSize="xs"
						fontWeight="bold"
						bg={theme.bg.white2}
						color={theme.text.primary}
					>
						{handleLogoImage(company?.name)}
					</Flex>
				)}
				<Text fontSize="sm" color={theme.text.primary}>
					{activities.meta.data.companyName}
				</Text>
			</GridItem>
			<GridItem flex="2.5">
				<Flex align="center" gap="2">
					<Img
						src={notificationIcons[activities.event.name].icon}
						boxSize="4"
					/>
					<Flex direction="column">
						<Text fontSize="xs" fontWeight="normal" color={theme.text.primary}>
							{activities &&
								translate(
									activitieDescriptTranslation[activities.event.name]?.text
								)}
						</Text>
						<Text color="gray.500" fontSize="xs" whiteSpace="nowrap">
							{dateHandler(activities.created_at)}
						</Text>
					</Flex>
				</Flex>
			</GridItem>
		</Grid>
	);
};

export default RecentActivitiesData;
