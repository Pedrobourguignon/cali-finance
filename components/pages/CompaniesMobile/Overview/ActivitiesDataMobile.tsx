import { Flex, Img, Text } from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { IHistoryNotifications } from 'types';
import { dateHandler, getNotificationsData, truncateWallet } from 'utils';

interface IActivitiesData {
	activities: IHistoryNotifications;
}

export const ActivitiesDataMobile: React.FC<IActivitiesData> = ({
	activities,
}) => {
	const { t: translate } = useTranslation('history-page');
	const theme = usePicasso();
	const { locale } = useRouter();

	return (
		// eslint-disable-next-line react/jsx-no-useless-fragment
		<>
			{activities.event.name !== 'team_member_added' && (
				<Flex
					gap="2"
					px="3"
					py="2"
					bg="gray.100"
					borderRadius="base"
					justify="space-between"
					direction="column"
				>
					{activities.event.name === 'user_added_to_company' ||
					activities.event.name === 'user_added_to_team' ||
					activities.event.name === 'user_updated' ? (
						<Text
							px="2"
							bg={theme.bg.black}
							borderRadius="full"
							color={theme.text.white}
							h="max-content"
							fontSize="2xs"
							fontWeight="normal"
							w="max-content"
							whiteSpace="nowrap"
						>
							{truncateWallet(activities.wallet)}
						</Text>
					) : (
						<Text
							px="2"
							bg={theme.bg.black}
							borderRadius="full"
							color={theme.text.white}
							h="max-content"
							fontSize="2xs"
							fontWeight="normal"
							w="max-content"
							whiteSpace="nowrap"
						>
							{activities.event.description === translate('addedToTeam')
								? truncateWallet(activities.meta.data?.userAddedWallet)
								: activities.meta.data.companyName}
						</Text>
					)}
					<Flex w="full" justify="space-between">
						<Flex align="center" gap="2">
							<Img
								src={getNotificationsData(activities.event.name).icon}
								boxSize="4"
							/>
							<Flex direction="column">
								<Text fontSize="sm" fontWeight="normal">
									{activities.event.description}
								</Text>
								<Text color="gray.500" fontSize="xs" whiteSpace="nowrap">
									{locale && dateHandler(activities.created_at, locale)}
								</Text>
							</Flex>
						</Flex>
					</Flex>
				</Flex>
			)}
		</>
	);
};
