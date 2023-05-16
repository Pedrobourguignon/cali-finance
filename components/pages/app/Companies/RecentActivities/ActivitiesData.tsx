/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Flex, Img, Text } from '@chakra-ui/react';
import { IActivitiesData } from 'types';
import { useRouter } from 'next/router';
import { handleNotifications, truncateWallet } from 'utils';
import useTranslation from 'next-translate/useTranslation';

export const ActivitiesData: React.FC<IActivitiesData> = ({
	activities,
	company,
}) => {
	const { locale } = useRouter();
	const { t: translate } = useTranslation('history-page');

	return (
		<Flex
			w="full"
			align="center"
			px={{ md: '2', lg: '3' }}
			py="1"
			bg="gray.100"
			borderRadius="base"
			justify="space-between"
		>
			<Text
				h="max-content"
				fontSize="sm"
				fontWeight="normal"
				w={{ md: '24', lg: '36' }}
				whiteSpace="nowrap"
			>
				{activities.event.description === translate('addedToTeam')
					? truncateWallet(
							handleNotifications(activities, locale)?.text.slice(0, 41)
					  )
					: handleNotifications(activities, locale)?.text?.slice(
							8,
							company?.name!.length + 8
					  )}
			</Text>
			<Flex align="center" gap="2">
				<Img src={handleNotifications(activities, locale)?.icon} boxSize="4" />
				<Flex direction="column">
					<Text fontSize="sm" fontWeight="normal">
						{locale === 'en-US'
							? activities.meta.description.enDescription
							: activities.meta.description.ptDescription}
					</Text>
					<Text color="gray.500" fontSize="xs" whiteSpace="nowrap">
						{activities.created_at}
					</Text>
				</Flex>
			</Flex>
		</Flex>
	);
};
