import { Flex, Grid, GridItem, Img, Text } from '@chakra-ui/react';
import { useCompanies, usePicasso } from 'hooks';
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
} from 'utils';

export const HistoryActivityData: React.FC<IActivitiesData> = ({
	activities,
}) => {
	const theme = usePicasso();
	const { t: translate } = useTranslation('history-page');
	const { getCompanyById } = useCompanies();
	const { locale } = useRouter();

	const { data: company } = useQuery('get-company-data', () =>
		getCompanyById(activities.meta.data.companyId)
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
						h="3.25rem"
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
							<GridItem display="flex" alignContent="center" gap="2" flex="2.5">
								{company?.logo ? (
									<Img
										src={getLogo(company?.logo)}
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
										{handleLogoImage(company?.name)}
									</Flex>
								)}
								<Text fontSize="sm" color={theme.text.primary} fontWeight="600">
									{activities.meta.data.companyName}
								</Text>
							</GridItem>
							<GridItem display="flex" flex="2.5" gap="2">
								{activities.event.name !== 'company_created' && (
									<Img src="/images/avatar.png" boxSize="6" />
								)}
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
											{activities.created_at}
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
