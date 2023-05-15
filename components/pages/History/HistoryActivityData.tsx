/* eslint-disable no-unsafe-optional-chaining */
import { Flex, Img, Text } from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import { useRouter } from 'next/router';
import React from 'react';
import { IActivitiesData } from 'types';
import { truncateWallet } from 'utils';

export const HistoryActivityData: React.FC<IActivitiesData> = ({
	activities,
}) => {
	const theme = usePicasso();
	const { locale } = useRouter();

	const handleActivities = () => {
		if (activities.event.description === 'Member added to company')
			return {
				icon: '/icons/add-user.svg',
				text:
					locale === 'en-US'
						? activities.meta.description.enDescription
						: activities.meta.description.ptDescription,
			};
		if (activities.event.description === 'Created company')
			return {
				icon: '/icons/companies.svg',
				text:
					locale === 'en-US'
						? activities.meta.description.enDescription
						: activities.meta.description.ptDescription,
			};
		if (activities.event.description === 'Updated company')
			return {
				text: activities.meta.data.companyName,
				icon: '/icons/companies.svg',
			};
		return null;
	};

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
						{activities.event.description === 'Member added to company'
							? `${truncateWallet(
									handleActivities()?.text.slice(0, 41)
							  )} ${handleActivities()?.text.slice(42)}`
							: handleActivities()?.text}
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
						{activities.event.description === 'Member added to company'
							? `${truncateWallet(
									handleActivities()?.text.slice(0, 41)
							  )} ${handleActivities()?.text.slice(42)}`
							: handleActivities()?.text}
					</Text>
				</Flex>
			)}
			<Flex align="center" gap="3">
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

export default HistoryActivityData;
