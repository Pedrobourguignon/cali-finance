import { Flex, Img, Text } from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import React from 'react';
import { IActivitiesData } from 'types';
import { truncateWallet } from 'utils';

export const HistoryActivityDataMobile: React.FC<IActivitiesData> = ({
	activities,
}) => {
	const theme = usePicasso();
	const { locale } = useRouter();
	const { t: translate } = useTranslation('history-page');

	const handleActivities = () => {
		if (activities?.event.description === translate('addedToTeam'))
			return {
				icon: '/icons/add-user.svg',
				text:
					locale === 'en-US'
						? activities?.meta.description.enDescription
						: activities?.meta.description.ptDescription,
			};
		if (activities?.event.description === translate('createdCompany'))
			return {
				icon: '/icons/companies.svg',
				text:
					locale === 'en-US'
						? activities?.meta.description.enDescription
						: activities?.meta.description.ptDescription,
			};
		if (activities.event.description === translate('updatedCompany'))
			return {
				text: activities.meta.data.companyName,
				icon: '/icons/companies.svg',
			};
		return null;
	};

	return (
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
			{activities.event.description === translate('addedToTeam') ? (
				<Flex gap="2" w="full">
					<Img src="/images/avatar.png" boxSize="6" />
					<Text
						h="max-content"
						fontSize="sm"
						fontWeight="semibold"
						whiteSpace="nowrap"
						color={theme.text.primary}
					>
						{activities.event.description === translate('addedToTeam')
							? `${truncateWallet(
									handleActivities()?.text.slice(0, 41)
							  )} ${handleActivities()?.text.slice(42)}`
							: handleActivities()?.text}
					</Text>
				</Flex>
			) : (
				<Flex gap="2" w="full">
					<Text
						h="max-content"
						fontSize="sm"
						fontWeight="semibold"
						whiteSpace="nowrap"
						color={theme.text.primary}
					>
						{activities.event.description === translate('addedToTeam')
							? `${truncateWallet(
									handleActivities()?.text.slice(0, 41)
							  )} ${handleActivities()?.text.slice(42)}`
							: handleActivities()?.text}
					</Text>
				</Flex>
			)}
			<Flex align="center" gap="3" w="full">
				<Img src={handleActivities()?.icon} boxSize="4" />
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

export default HistoryActivityDataMobile;
