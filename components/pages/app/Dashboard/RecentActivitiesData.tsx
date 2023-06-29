import { Flex, Grid, GridItem, Img, Text } from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
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

	return (
		// eslint-disable-next-line react/jsx-no-useless-fragment
		<>
			{activities.event.name !== 'team_member_added' &&
				activities.event.name !== 'user_added_to_company' &&
				activities.event.name !== 'user_added_to_team' && (
					<Grid
						templateColumns="repeat(4, 1fr)"
						gap={2}
						display="flex"
						w="full"
						justifyContent="space-between"
						alignItems="center"
					>
						<GridItem display="flex" alignContent="center" gap="2" flex="3.5">
							{activities.meta.data.companyLogo ? (
								<Img
									src={getLogo(activities.meta.data.companyLogo)}
									boxSize="6"
									borderRadius="base"
								/>
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
									{handleLogoImage(activities.meta.data.companyName)}
								</Flex>
							)}
							<Text fontSize="sm" color={theme.text.primary}>
								{activities.meta.data.companyName}
							</Text>
						</GridItem>
						<GridItem flex={{ base: '3.2', md: '2.5' }}>
							<Flex align="center" gap="2">
								<Img
									src={notificationIcons[activities.event.name].icon}
									boxSize="4"
								/>
								<Flex direction="column">
									<Text
										fontSize="xs"
										fontWeight="normal"
										color={theme.text.primary}
									>
										{activities &&
											translate(
												activitieDescriptTranslation[activities.event.name].text
											)}
									</Text>
									<Text color="gray.500" fontSize="xs" whiteSpace="nowrap">
										{dateHandler(activities.created_at)}
									</Text>
								</Flex>
							</Flex>
						</GridItem>
					</Grid>
				)}
		</>
	);
};

export default RecentActivitiesData;
