/* eslint-disable no-nested-ternary */
import { Flex, Grid, GridItem, Img, Text } from '@chakra-ui/react';
import { useCompanies, usePicasso, useProfile } from 'hooks';
import { useSession } from 'next-auth/react';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import React from 'react';
import { useQuery } from 'react-query';
import { IActivitiesData } from 'types';
import {
	notificationIcons,
	truncateWallet,
	activitieDescriptTranslation,
	getLogo,
	handleLogoImage,
	dateHandler,
} from 'utils';
import { useAccount } from 'wagmi';

export const HistoryActivityData: React.FC<IActivitiesData> = ({
	activities,
}) => {
	const theme = usePicasso();
	const { t: translate } = useTranslation('history-page');
	const { getProfileData } = useProfile();
	const { isConnected } = useAccount();
	const { locale } = useRouter();
	const { data: session } = useSession();

	const { data: profileData } = useQuery(
		'profile-data',
		() => getProfileData(activities.wallet as `0x${string}`),
		{
			enabled: !!isConnected && !!session,
		}
	);

	return (
		// eslint-disable-next-line react/jsx-no-useless-fragment
		<>
			{activities.event.name !== 'team_member_added' &&
				activities.event.name !== 'user_added_to_company' &&
				activities.event.name !== 'user_added_to_team' && (
					<Flex
						bg="white"
						px="3"
						py="2"
						minH="3.25rem"
						borderRadius="base"
						align="center"
						gap={{ md: '0', lg: '7' }}
					>
						<Grid
							templateColumns="repeat(4, 1fr)"
							gap={6}
							display="flex"
							w="full"
							justifyContent="space-between"
							alignItems="center"
						>
							<GridItem display="flex" alignItems="center" gap="2" flex="2.5">
								{activities.event.name !== 'user_updated' &&
								activities.event.name !== 'user_settings_updated' &&
								activities.meta.data.companyLogo ? (
									<Img
										src={getLogo(activities.meta.data.companyLogo)}
										boxSize="6"
										borderRadius="base"
									/>
								) : activities.event.name === 'user_updated' ? (
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
										<Img
											src={getLogo(profileData?.picture)}
											borderRadius="full"
											boxSize="6"
											objectFit="cover"
										/>
									</Flex>
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
								{activities.event.name === 'user_updated' ||
								activities.event.name === 'user_settings_updated' ? (
									<Text fontSize="sm" color={theme.text.primary}>
										{activities.meta.description[locale!]}
									</Text>
								) : (
									<Text
										fontSize="sm"
										color={theme.text.primary}
										fontWeight="bold"
									>
										{activities.meta.data.companyName}
									</Text>
								)}
							</GridItem>
							<GridItem display="flex" flex="2.5" gap="2">
								<Img
									src={getLogo(profileData?.picture)}
									borderRadius="full"
									boxSize="6"
									objectFit="cover"
								/>

								{activities.event.name === 'user_updated' ||
								activities.event.name === 'company_updated' ||
								activities.event.name === 'company_created' ||
								activities.event.name === 'user_settings_updated' ? (
									<Text
										h="max-content"
										fontSize="sm"
										fontWeight="normal"
										whiteSpace="nowrap"
										color={theme.text.primary}
									>
										{truncateWallet(activities.wallet)}
									</Text>
								) : (
									<Text
										h="max-content"
										fontSize="sm"
										fontWeight="normal"
										whiteSpace="nowrap"
										color={theme.text.primary}
									>
										{activities.event.name !== 'company_created' &&
											truncateWallet(activities.meta.data?.userAddedWallet)}
									</Text>
								)}
							</GridItem>
							<GridItem flex="2.5">
								<Flex align="center" gap="2">
									<Img
										src={notificationIcons[activities.event.name].icon}
										boxSize="4"
									/>
									<Flex direction="column">
										<Text
											fontSize="sm"
											fontWeight="normal"
											color={theme.text.primary}
										>
											{activities &&
												translate(
													activitieDescriptTranslation[activities.event.name]
														?.text
												)}
										</Text>
										<Text color="gray.500" fontSize="xs" whiteSpace="nowrap">
											{dateHandler(activities.created_at)}
										</Text>
									</Flex>
								</Flex>
							</GridItem>
						</Grid>
					</Flex>
				)}
		</>
	);
};

export default HistoryActivityData;
