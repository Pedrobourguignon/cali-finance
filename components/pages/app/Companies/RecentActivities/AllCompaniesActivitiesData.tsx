/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Flex, Img, Text } from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';
import { INotificationList } from 'types';
import { useRouter } from 'next/router';
import { ICompany } from 'types/interfaces/main-server/ICompany';

interface IActivitiesData {
	activities: INotificationList;
	company: ICompany;
}

export const AllCompaniesActivitiesData: React.FC<IActivitiesData> = ({
	activities,
	company,
}) => {
	const { t: translate } = useTranslation('companies');
	const { locale } = useRouter();

	// const getStatusColor = () => {
	// 	if (activities.status === translate('completed')) return 'green.400';
	// 	if (activities.status === translate('processing')) return 'gray.400';
	// 	return 'red.400';
	// };

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
		return null;
	};

	return (
		<Flex
			align="center"
			px={{ md: '2', lg: '3' }}
			py="1"
			bg="gray.100"
			borderRadius="base"
			justify="space-between"
		>
			{/* <Text
				h="max-content"
				fontSize="sm"
				fontWeight="normal"
				w={{ md: '24', lg: '36' }}
				whiteSpace="nowrap"
			>
				{activities.event.description === 'Member added to company'
					? handleActivities()?.text.slice(0, 41)
					: handleActivities()?.text.slice(8, company!.name!.length + 8)}
			</Text> */}
			{/* <Flex align="center" gap="2">
				<Img src={handleActivities()?.icon} boxSize="4" />
				<Flex direction="column">
					<Text fontSize="sm" fontWeight="normal">
						{activities.event.description}
					</Text>
					<Text color="gray.500" fontSize="xs" whiteSpace="nowrap">
						{activities.created_at}
					</Text>
				</Flex>
			</Flex>
			<Flex direction="column" align="end" w="20">
				<Flex flexDir="row" fontSize="xs" fontWeight="normal" gap="1">
					<Text>10,000</Text>
					<Text>USDT</Text>
				</Flex>
				<Text fontSize="xs" color="green.200">
					Completed
				</Text>
			</Flex> */}
			<Text
				h="max-content"
				fontSize="sm"
				fontWeight="normal"
				w={{ md: '24', lg: '36' }}
				whiteSpace="nowrap"
			>
				asdas
			</Text>
		</Flex>
	);
};
