/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Flex, Img, Text } from '@chakra-ui/react';
import { IActivitiesData } from 'types';
import { truncateWallet } from 'utils';
import useTranslation from 'next-translate/useTranslation';
import { usePicasso } from 'hooks';

export const ActivitiesData: React.FC<IActivitiesData> = ({ activities }) => {
	const theme = usePicasso();
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
					? truncateWallet(activities.meta.data?.userAddedWallet)
					: activities.meta.data.companyName}
			</Text>
			<Flex align="center" gap="3">
				<Img src={activities.meta.icon} boxSize="4" />
				<Flex direction="column">
					<Text fontSize="sm" fontWeight="normal" color={theme.text.primary}>
						{activities.event.description}
					</Text>
					<Text color="gray.500" fontSize="xs" whiteSpace="nowrap">
						{activities.created_at}
					</Text>
				</Flex>
			</Flex>
		</Flex>
	);
};
