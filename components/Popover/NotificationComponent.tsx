import { Flex, Img, Text } from '@chakra-ui/react';
import { useCompanies, usePicasso } from 'hooks';
import { INotificationList } from 'types';
import { useQuery, useQueryClient } from 'react-query';
import { dateHandler, truncateWallet } from 'utils';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const NotificationComponent: React.FC<{
	notification: INotificationList;
}> = ({ notification }) => {
	const theme = usePicasso();
	const { getCompanyById } = useCompanies();
	const { locale } = useRouter();

	const queryClient = useQueryClient();
	useEffect(() => {
		queryClient.invalidateQueries('created-company-overview');
	}, [notification]);

	const { data: selectedCompany } = useQuery(
		'created-company-overview',
		() => getCompanyById(notification.meta.data.companyId),
		{ retry: 10 }
	);

	console.log(notification.meta.data.companyId);
	console.log(selectedCompany);

	// eslint-disable-next-line consistent-return
	const handleNotifications = () => {
		if (notification.event.description === 'Added team member')
			return {
				icon: '/icons/add-user.svg',
				text: `${truncateWallet(notification.wallet)} added to ${
					selectedCompany?.name
				}`,
			};
		if (notification.event.description === 'Created company')
			return {
				icon: '/icons/companies.svg',
				text: `You created ${selectedCompany?.name}`,
			};
	};

	return (
		<Flex
			justify="space-between"
			bg="gray.50"
			color="white"
			borderRadius="base"
			align="center"
			px="3"
			h="12"
		>
			<Flex gap="2" align="center" py="1" w="full">
				<Img src={handleNotifications()?.icon} boxSize="4" color="black" />
				<Flex direction="column" justify="center">
					<Text
						color={theme.text.primary}
						fontSize="sm"
						fontWeight="normal"
						lineHeight="shorter"
					>
						{handleNotifications()?.text}
					</Text>
					<Text color="gray.500" fontSize="xs">
						{dateHandler(notification.created_at, locale)}
					</Text>
				</Flex>
			</Flex>
		</Flex>
	);
};
