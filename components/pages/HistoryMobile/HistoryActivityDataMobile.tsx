import { Flex, Img, Text } from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import React from 'react';
import { IActivitiesData } from 'types';
import {
	dateHandler,
	getLogo,
	handleLogoImage,
	truncateWallet,
	getNotificationsData,
} from 'utils';

export const HistoryActivityDataMobile: React.FC<IActivitiesData> = ({
	activities,
}) => {
	const theme = usePicasso();
	const { t: translate } = useTranslation('history-page');
	const { locale } = useRouter();

	return (
		// eslint-disable-next-line react/jsx-no-useless-fragment
		<>
			{activities.event.name !== 'team_member_added' &&
				activities.event.name !== 'user_added_to_company' &&
				activities.event.name !== 'user_added_to_team' && (
					<Flex
						direction="column"
						bg="white"
						px="3"
						py="2"
						minH="5rem"
						borderRadius="base"
						align="center"
						justify="space-between"
						gap={{ base: '1', lg: '7' }}
					>
						<Flex w="full" align="center" justify="space-between">
							<Flex gap="2" w="full">
								{activities.meta.data.companyLogo ? (
									<Img
										src={getLogo(activities.meta.data.companyLogo)}
										boxSize="6"
										borderRadius="base"
									/>
								) : (
									activities.event.name === 'user_updated' ||
									(activities.event.name === 'user_settings_updated' && (
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
									))
								)}
								{activities.event.name === 'user_updated' ||
								activities.event.name === 'user_settings_updated' ? (
									<Text fontSize="sm" color={theme.text.primary}>
										{locale && activities.meta.description[locale]}
									</Text>
								) : (
									<Text
										fontSize="sm"
										color={theme.text.primary}
										fontWeight="600"
									>
										{activities.meta.data.companyName}
									</Text>
								)}
							</Flex>
							<Flex gap="2">
								{activities.event.name === 'user_updated' ||
								activities.event.name === 'user_settings_updated' ? (
									<Text
										h="max-content"
										fontSize="2xs"
										fontWeight="semibold"
										whiteSpace="nowrap"
										color={theme.text.white}
										bg={theme.bg.primary}
										borderRadius="full"
										px="2"
									>
										{truncateWallet(activities.wallet)}
									</Text>
								) : (
									<Text
										h="max-content"
										fontSize="2xs"
										fontWeight="semibold"
										whiteSpace="nowrap"
										color={theme.text.white}
										bg={theme.bg.primary}
										borderRadius="full"
										px="2"
									>
										{activities.event.name !== 'company_created' &&
											truncateWallet(activities.meta.data?.userAddedWallet)}
									</Text>
								)}
							</Flex>
						</Flex>
						<Flex align="center" gap="3" w="full">
							<Img
								src={getNotificationsData(activities.event.name).icon}
								boxSize="4"
							/>
							<Flex direction="column">
								<Text
									fontSize="sm"
									fontWeight="normal"
									color={theme.text.primary}
								>
									{activities &&
										translate(getNotificationsData(activities.event.name).text)}
								</Text>
								<Text color="gray.500" fontSize="xs" whiteSpace="nowrap">
									{locale && dateHandler(activities.created_at, locale)}
								</Text>
							</Flex>
						</Flex>
					</Flex>
				)}
		</>
	);
};

export default HistoryActivityDataMobile;
