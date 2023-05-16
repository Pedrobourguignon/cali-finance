/* eslint-disable no-unsafe-optional-chaining */
import { Flex, Img, Text } from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import React from 'react';
import { IActivitiesData } from 'types';
import { truncateWallet } from 'utils';

export const HistoryActivityData: React.FC<IActivitiesData> = ({
	activities,
}) => {
	const theme = usePicasso();
	const { t: translate } = useTranslation('history-page');
	const { locale } = useRouter();

	return (
		<Flex
			bg="white"
			px="3"
			py="2"
			h="3.25rem"
			borderRadius="base"
			align="center"
			justify="space-between"
			gap={{ md: '0', lg: '7' }}
		>
			{activities.event.description === 'Member added to company' ? (
				<Flex gap="2">
					<Img src="/images/avatar.png" boxSize="6" />
					<Text
						h="max-content"
						fontSize="sm"
						fontWeight="normal"
						whiteSpace="nowrap"
						color={theme.text.primary}
					>
						{truncateWallet(activities.meta.data?.userAddedWallet)}{' '}
						{locale === 'en-US'
							? activities.meta.description.enDescription?.slice(42)
							: activities.meta.description.ptDescription?.slice(42)}
					</Text>
				</Flex>
			) : (
				<Flex gap="2">
					<Text
						h="max-content"
						fontSize="sm"
						fontWeight="normal"
						whiteSpace="nowrap"
						color={theme.text.primary}
					>
						{activities.event.description === translate('addedToTeam')
							? `${truncateWallet(
									locale === 'en-US'
										? activities.meta.description.enDescription.slice(0, 41)
										: activities.meta.description.ptDescription.slice(0, 41)
							  )} ${
									locale === 'en-US'
										? activities.meta.description.enDescription.slice(0, 42)
										: activities.meta.description.ptDescription.slice(0, 42)
							  }`
							: activities.meta.data.companyName}
					</Text>
				</Flex>
			)}
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

export default HistoryActivityData;
