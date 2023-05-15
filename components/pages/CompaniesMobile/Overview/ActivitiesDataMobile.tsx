/* eslint-disable no-unsafe-optional-chaining */
import { Flex, Img, Text } from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { INotificationList } from 'types';
import { ICompany } from 'types/interfaces/main-server/ICompany';
import { handleNotifications, truncateWallet } from 'utils';

interface IActivitiesData {
	activities: INotificationList;
	company: ICompany;
}

export const ActivitiesDataMobile: React.FC<IActivitiesData> = ({
	activities,
	company,
}) => {
	const { t: translate } = useTranslation('companies');
	const { t: translateNotification } = useTranslation('history-page');
	const { locale } = useRouter();
	const theme = usePicasso();

	return (
		<Flex
			gap="2"
			px="3"
			py="2"
			bg="gray.100"
			borderRadius="base"
			justify="space-between"
			direction="column"
		>
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
				{activities.event.description === translateNotification('addedToTeam')
					? truncateWallet(
							handleNotifications(activities, locale)?.text.slice(0, 41)
					  )
					: handleNotifications(activities, locale)?.text.slice(
							8,
							company?.name!.length + 8
					  )}
			</Text>
			<Flex w="full" justify="space-between">
				<Flex align="center" gap="2">
					<Img
						src={handleNotifications(activities, locale)?.icon}
						boxSize="4"
					/>
					<Flex direction="column">
						<Text fontSize="sm" fontWeight="normal">
							{activities.event.description}
						</Text>
						<Text color="gray.500" fontSize="xs" whiteSpace="nowrap">
							{activities.created_at}
						</Text>
					</Flex>
				</Flex>
			</Flex>
		</Flex>
	);
};
