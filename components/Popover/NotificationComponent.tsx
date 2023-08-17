import { Flex, Img, Text } from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import { IHistoryNotifications } from 'types';
import {
	dateHandler,
	formatContractNumbers,
	getNotificationsData,
} from 'utils';
import { useRouter } from 'next/router';

export const NotificationComponent: React.FC<{
	activities: IHistoryNotifications;
}> = ({ activities }) => {
	const theme = usePicasso();
	const { locale } = useRouter();

	return (
		<Flex
			justify="space-between"
			bg="gray.50"
			color="white"
			borderRadius="base"
			align="center"
			px="3"
			py="1"
		>
			<Flex gap="2" align="center" w="full">
				<Flex align="center" gap="2" w="full" justify="space-between">
					<Flex align="center" gap="2">
						<Img
							src={getNotificationsData(activities.meta.data.event).icon}
							boxSize="4"
						/>
						<Flex direction="column">
							<Flex gap="2">
								<Text
									fontSize="sm"
									fontWeight="normal"
									color={theme.text.primary}
								>
									{locale && activities.meta.description[locale]}
								</Text>
							</Flex>

							<Text color="gray.500" fontSize="xs" wordBreak="break-word">
								{locale && dateHandler(activities.created_at, locale)}
							</Text>
						</Flex>
					</Flex>
					{activities.meta.data.event === 'user_withdraw' ||
					activities.meta.data.event === 'company_deposit_received' ? (
						<Flex maxW={{ base: '85px', md: 'full' }}>
							<Flex align="end" direction="column">
								<Flex gap="1">
									<Text
										wordBreak="break-all"
										fontSize="xs"
										fontWeight="normal"
										color={theme.text.primary}
									>
										{activities.meta.data.amount &&
											locale &&
											formatContractNumbers(
												BigInt(activities.meta.data.amount),
												locale,
												18,
												false
											)}
									</Text>
									<Text
										fontSize="xs"
										fontWeight="normal"
										color={theme.text.primary}
									>
										USDT
									</Text>
								</Flex>
								<Text fontSize="xs" fontWeight="normal" color="green.400">
									Completed
								</Text>
							</Flex>
						</Flex>
					) : (
						<Flex />
					)}
				</Flex>
			</Flex>
		</Flex>
	);
};
