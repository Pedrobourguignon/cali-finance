/* eslint-disable no-nested-ternary */
import {
	Accordion,
	AccordionButton,
	AccordionItem,
	AccordionPanel,
	Box,
	Flex,
	Grid,
	GridItem,
	Icon,
	Img,
	Text,
} from '@chakra-ui/react';
import { useAuth, usePicasso, useProfile } from 'hooks';

import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import React from 'react';
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai';
import { useQuery } from 'react-query';
import { IActivitiesData } from 'types';
import {
	dateHandler,
	getLogo,
	handleLogoImage,
	notificationsData,
	truncateWallet,
} from 'utils';
import { useAccount } from 'wagmi';

export const RecentActivitiesData: React.FC<IActivitiesData> = ({
	activities,
}) => {
	const theme = usePicasso();
	const { t: translate } = useTranslation('history-page');
	const { locale } = useRouter();
	const { getProfileData } = useProfile();
	const { isConnected } = useAccount();
	const { session } = useAuth();

	const { data: profileData } = useQuery(
		'profile-data',
		() => getProfileData(activities.wallet as `0x${string}`),
		{
			enabled: !!isConnected && !!session,
		}
	);

	return (
		// eslint-disable-next-line react/jsx-no-useless-fragment
		<>
			<Grid
				display={activities.event.name === 'user_withdraw' ? 'flex' : 'none'}
				templateColumns="repeat(2, 1fr)"
				w="full"
				justifyContent="space-between"
				alignItems="center"
				bg="gray.50"
				px="3"
			>
				<GridItem
					display="flex"
					flexDirection="row"
					alignItems="center"
					gap="2"
				>
					<Img
						src={notificationsData[activities.event.name].icon}
						boxSize="4"
					/>
					<Flex direction="column">
						<Text fontSize="sm" color={theme.text.black}>
							{activities.event.description}
						</Text>
						<Text color="gray.500" fontSize="xs" whiteSpace="nowrap">
							{locale && dateHandler(activities.created_at, locale)}
						</Text>
					</Flex>
				</GridItem>
				<GridItem
					display="flex"
					flexDirection="column"
					alignItems="center"
					gap="2"
				>
					<Flex direction="column" align="end">
						<Text fontSize="xs" color={theme.text.black}>
							{Number(activities.meta.data.amount).toFixed(2)} USDT
						</Text>
						<Text color="green.400 " fontSize="xs" whiteSpace="nowrap">
							Completed
						</Text>
					</Flex>
				</GridItem>
			</Grid>
			{/* {activities.event.name !== 'team_member_added' &&
				activities.event.name !== 'user_added_to_company' &&
				activities.event.name !== 'user_added_to_team' && (
					<Grid
						display={
							activities.event.name === 'user_withdraw' ? 'none' : 'flex'
						}
						templateColumns="repeat(4, 1fr)"
						gap={2}
						w="full"
						justifyContent="space-between"
						alignItems="center"
						bg="gray.50"
					>
						<GridItem display="flex" alignItems="center" gap="2" flex="3.5">
							{activities.event.name !== 'user_updated' &&
							activities.event.name !== 'user_settings_updated' &&
							activities.meta.data.companyLogo ? (
								<Img
									src={getLogo(activities.meta.data.companyLogo)}
									boxSize="6"
									borderRadius="base"
								/>
							) : activities.event.name === 'user_updated' ||
							  activities.event.name === 'user_settings_updated' ? (
								<Flex
									boxSize="6"
									borderRadius="full"
									align="center"
									justify="center"
									fontSize="xs"
									fontWeight="bold"
									bg={theme.bg.white2}
									color={theme.text.primary}
								>
									<Img
										src={getLogo(profileData?.picture)}
										borderRadius="full"
										boxSize="6"
										objectFit="cover"
										bg="red"
									/>
								</Flex>
							) : (
								activities.event.name !== 'user_updated' &&
								activities.event.name !== 'user_settings_updated' && (
									<Flex
										boxSize="6"
										borderRadius="full"
										align="center"
										justify="center"
										fontSize="xs"
										fontWeight="bold"
										bg={theme.bg.white2}
										color={theme.text.primary}
									>
										{handleLogoImage(activities.meta.data.companyName)}
									</Flex>
								)
							)}
							{activities.event.name === 'user_updated' ||
							activities.event.name === 'team_member_updated' ||
							activities.event.name === 'user_settings_updated' ? (
								<Accordion allowToggle w="full">
									<AccordionItem>
										{({ isExpanded }) => (
											<>
												<AccordionButton p="0" justifyContent="space-between">
													<Box
														as="span"
														fontSize="sm"
														textAlign="left"
														color={theme.text.primary}
														display="flex"
														alignItems="center"
														w="full"
														gap="4"
													>
														{truncateWallet(activities.wallet)}
														{isExpanded ? (
															<Icon
																as={AiOutlineArrowUp}
																color="black"
																boxSize="4"
															/>
														) : (
															<Icon
																as={AiOutlineArrowDown}
																color="black"
																boxSize="4"
															/>
														)}
													</Box>
												</AccordionButton>
												<AccordionPanel
													p="2"
													color={theme.text.primary}
													fontSize="xs"
													maxW="11.25rem"
												>
													{activities.meta.description[locale!]}
												</AccordionPanel>
											</>
										)}
									</AccordionItem>
								</Accordion>
							) : (
								<Text fontSize="sm" color={theme.text.primary}>
									{activities.meta.data.companyName}
								</Text>
							)}
						</GridItem>
						<GridItem flex={{ base: '3.2', md: '2.8' }}>
							<Flex align="center" gap="2">
								<Img
									src={notificationsData[activities.event.name].icon}
									boxSize="4"
								/>
								<Flex direction="column">
									<Text
										fontSize="xs"
										fontWeight="normal"
										whiteSpace="nowrap"
										color={theme.text.primary}
									>
										{activities &&
											translate(notificationsData[activities.event.name].text)}
									</Text>
									<Text color="gray.500" fontSize="xs" whiteSpace="nowrap">
										{locale && dateHandler(activities.created_at, locale)}
									</Text>
								</Flex>
							</Flex>
						</GridItem>
					</Grid>
				)} */}
		</>
	);
};

export default RecentActivitiesData;
