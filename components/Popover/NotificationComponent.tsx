/* eslint-disable no-nested-ternary */
import { Flex, Img, Text } from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import { IHistoryNotifications } from 'types';
import {
	dateHandler,
	formatNumbers,
	notificationsData,
	truncateWallet,
} from 'utils';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';

export const NotificationComponent: React.FC<{
	activities: IHistoryNotifications;
}> = ({ activities }) => {
	const theme = usePicasso();
	const { locale } = useRouter();
	const { t: translate } = useTranslation('history-page');

	return (
		// eslint-disable-next-line react/jsx-no-useless-fragment
		<>
			{activities.event?.name !== 'team_member_added' &&
				activities.event?.name !== 'user_added_to_company' &&
				activities.event?.name !== 'user_added_to_team' && (
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
										src={notificationsData[activities.event.name].icon}
										boxSize="4"
									/>
									<Flex direction="column">
										<Flex gap="2">
											{activities.event.name === 'user_updated' ||
											activities.event.name === 'company_updated' ||
											activities.event.name === 'team_member_updated' ||
											activities.event.name === 'company_created' ||
											activities.event.name === 'user_settings_updated' ||
											activities.event.name === 'user_withdraw' ||
											activities.event.name === 'company_deposit_received' ||
											activities.event.name === 'user_created' ? (
												<Text
													h="max-content"
													fontSize="sm"
													fontWeight="normal"
													whiteSpace="nowrap"
													color={theme.text.primary}
												>
													{truncateWallet(activities.wallet)}
												</Text>
											) : (
												<Text
													h="max-content"
													fontSize="sm"
													fontWeight="normal"
													whiteSpace="nowrap"
													color={theme.text.primary}
												>
													{activities.event.name !== 'company_created' &&
														truncateWallet(
															activities.meta.data?.userAddedWallet
														)}
												</Text>
											)}

											<Text
												fontSize="sm"
												fontWeight="normal"
												color={theme.text.primary}
											>
												{activities &&
													translate(
														notificationsData[activities.event.name]?.text
													)}
											</Text>
										</Flex>

										<Text color="gray.500" fontSize="xs" wordBreak="break-word">
											{locale && dateHandler(activities.created_at, locale)}
										</Text>
									</Flex>
								</Flex>
								{activities.event.name === 'user_withdraw' ||
								activities.event.name === 'company_deposit_received' ? (
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
														formatNumbers(activities.meta.data.amount, locale)}
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
				)}
		</>
	);
};
