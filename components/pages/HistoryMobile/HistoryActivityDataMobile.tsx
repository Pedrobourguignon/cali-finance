import { Flex, Img, Text } from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import { useRouter } from 'next/router';
import React from 'react';
import { IActivitiesData } from 'types';
import { truncateWallet } from 'utils';

export const HistoryActivityDataMobile: React.FC<IActivitiesData> = ({
	activities,
}) => {
	const theme = usePicasso();
	const { locale } = useRouter();

	const handleActivities = () => {
		if (activities?.event.description === 'Member added to company')
			return {
				icon: '/icons/add-user.svg',
				text:
					locale === 'en-US'
						? activities?.meta.description.enDescription
						: activities?.meta.description.ptDescription,
			};
		if (activities?.event.description === 'Created company')
			return {
				icon: '/icons/companies.svg',
				text:
					locale === 'en-US'
						? activities?.meta.description.enDescription
						: activities?.meta.description.ptDescription,
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
			{activities.event.description === 'Member added to company' ? (
				<Flex gap="2" w="full">
					<Img src="/images/avatar.png" boxSize="6" />
					<Text
						h="max-content"
						fontSize="sm"
						fontWeight="semibold"
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
				<Flex gap="2" w="full">
					<Text
						h="max-content"
						fontSize="sm"
						fontWeight="semibold"
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
		// <Flex
		// 	direction="column"
		// 	bg="white"
		// 	px="3"
		// 	py="2"
		// 	h="5rem"
		// 	borderRadius="base"
		// 	align="center"
		// 	justify="space-between"
		// 	gap={{ md: '0', lg: '7' }}
		// >
		// 	<Flex justify="space-between" w="full">
		// 		<Flex align="center" gap="3">
		// 			<Icon as={activities.companyIcon} boxSize="4" />
		// 			<Text
		// 				fontSize="xs"
		// 				fontWeight="semibold"
		// 				color={theme.text.primary}
		// 				whiteSpace="nowrap"
		// 			>
		// 				{activities.company}
		// 			</Text>
		// 		</Flex>
		// 		<Flex align="center" gap="3" bg="black" px="2" borderRadius="full">
		// 			<Text fontSize="2xs" color={theme.text.white}>
		// 				{activities.wallet}
		// 			</Text>
		// 		</Flex>
		// 	</Flex>
		// 	<Flex w="full" justify="space-between">
		// 		<Flex align="center" gap="3">
		// 			<Icon
		// 				as={activities.typeIcon}
		// 				boxSize="4"
		// 				color={theme.text.primary}
		// 			/>
		// 			<Flex direction="column">
		// 				<Text fontSize="xs" color={theme.text.primary}>
		// 					{translate(activities.type.toLowerCase())}
		// 				</Text>
		// 				<Text fontSize="xs" color="gray.500" whiteSpace="nowrap">
		// 					{activities.date}
		// 				</Text>
		// 			</Flex>
		// 		</Flex>
		// 		<Flex direction="column" align="end" h="max-content">
		// 			<Text color={theme.text.primary} fontSize="xs" whiteSpace="nowrap">
		// 				{activities.value}
		// 			</Text>
		// 			<Text
		// 				color={
		// 					activities.status === 'Completed' ? 'green.400' : 'yellow.600'
		// 				}
		// 				fontSize="xs"
		// 			>
		// 				{translate(activities.status.toLowerCase())}
		// 			</Text>
		// 		</Flex>
		// 	</Flex>
		// </Flex>
	);
};

export default HistoryActivityDataMobile;
