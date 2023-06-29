import { Flex, Img, Text } from '@chakra-ui/react';
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
	truncateWallet,
} from 'utils';

export const HistoryActivityDataMobile: React.FC<IActivitiesData> = ({
	activities,
}) => {
	const theme = usePicasso();
	const { t: translate } = useTranslation('history-page');
	const { getCompanyById } = useCompanies();

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
						direction="column"
						bg="white"
						px="3"
						py="2"
						h="5rem"
						borderRadius="base"
						align="center"
						justify="space-between"
						gap={{ base: '1', lg: '7' }}
					>
						<Flex w="full" align="center" justify="space-between">
							<Flex gap="2" w="full">
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
							</Flex>
							<Flex gap="2">
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
							</Flex>
						</Flex>
						<Flex align="center" gap="3" w="full">
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
											activitieDescriptTranslation[activities.event.name].text
										)}
								</Text>
								<Text color="gray.500" fontSize="xs" whiteSpace="nowrap">
									{dateHandler(activities.created_at)}
								</Text>
							</Flex>
						</Flex>
					</Flex>
				)}
		</>
	);
};

export default HistoryActivityDataMobile;
