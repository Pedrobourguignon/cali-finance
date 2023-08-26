import { Flex, Img, Text } from '@chakra-ui/react';
import { IActivitiesData } from 'types';
import {
	dateHandler,
	getLogo,
	getNotificationsData,
	handleLogoImage,
	truncateWallet,
} from 'utils';
import useTranslation from 'next-translate/useTranslation';
import { usePicasso } from 'hooks';
import { useRouter } from 'next/router';

export const ActivitiesData: React.FC<IActivitiesData> = ({ activities }) => {
	const theme = usePicasso();
	const { t: translate } = useTranslation('history-page');
	const { locale } = useRouter();

	return (
		// eslint-disable-next-line react/jsx-no-useless-fragment
		<>
			{activities.event.name !== 'team_member_added' && (
				<Flex
					w="full"
					align="center"
					px={{ md: '2', lg: '3' }}
					py="1"
					bg="gray.100"
					borderRadius="base"
					justify="space-between"
				>
					<Flex display="flex" alignContent="center" gap="2" flex="4.5">
						{activities.event.name !== 'user_added_to_company' &&
						activities.event.name !== 'user_added_to_team' &&
						activities.meta.data.companyLogo ? (
							<Img
								src={getLogo(activities.meta.data.companyLogo)}
								boxSize="6"
								borderRadius="base"
							/>
						) : (
							activities.event.name !== 'user_added_to_company' &&
							activities.event.name !== 'user_added_to_team' && (
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
							)
						)}
						{activities.event.name === 'user_added_to_company' ||
						activities.event.name === 'user_added_to_team' ? (
							<Text fontSize="sm" color={theme.text.primary}>
								{locale && activities.meta.description[locale]}
							</Text>
						) : (
							<Text fontSize="sm" color={theme.text.primary}>
								{activities.event.description === translate('addedToTeam')
									? truncateWallet(activities.meta.data?.userAddedWallet)
									: activities.meta.data.companyName}
							</Text>
						)}
					</Flex>
					<Flex align="center" gap="3" flex="3" justify="start">
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
								{activities.event.description}
							</Text>
							<Text color="gray.500" fontSize="xs" whiteSpace="nowrap">
								{locale && dateHandler(activities.created_at, locale)}
							</Text>
						</Flex>
					</Flex>
					{activities.event.name === 'company_owner_withdraw' ||
					activities.event.name === 'company_deposit_received' ? (
						<Flex direction="column" fontSize="xs" flex="3" align="end">
							<Flex gap="1">
								<Text>
									{Number(
										activities.meta.data.amount?.toLocaleString(locale)
									).toFixed(2)}
								</Text>
								<Text>USDT</Text>
							</Flex>
							<Text textAlign="end" color="green.400">
								{translate('completed')}
							</Text>
						</Flex>
					) : (
						<Flex flex="3" />
					)}
				</Flex>
			)}
		</>
	);
};
