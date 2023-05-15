/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
	Flex,
	Text,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	Button,
} from '@chakra-ui/react';
import {
	LifeIsEasierBanner,
	CreateAccountBanner,
	HistorySkeletons,
	DisplayedNotifications,
	Paginator,
	LifeIsEasierTabletBreakpoint,
} from 'components';
import { usePicasso } from 'hooks';
import { AppLayout } from 'layouts';
import { useSession } from 'next-auth/react';
import useTranslation from 'next-translate/useTranslation';
import React, { useMemo, useState, useEffect } from 'react';
import { BiChevronDown } from 'react-icons/bi';
import { IHistoryPage, INotificationList } from 'types';

export const HistoryComponent: React.FC<IHistoryPage> = ({ notifications }) => {
	const { t: translate } = useTranslation('history-page');
	const theme = usePicasso();
	const [selectedFilterOption, setSelectedFilterOption] = useState<string>(
		translate('all')
	);
	const [pageNumber, setPageNumber] = useState(0);
	const { data: session } = useSession();
	const [filteredActivities, setFilteredActivities] = useState<
		INotificationList[]
	>(notifications!);

	const notificationPerPage = 14;
	const maxPage = useMemo(
		() => Math.ceil(filteredActivities?.length / notificationPerPage),
		[filteredActivities?.length]
	);
	const pagesVisited = pageNumber * notificationPerPage;

	const previous = () => {
		setPageNumber(pageNumber - 1);
	};
	const next = () => {
		setPageNumber(pageNumber + 1);
	};

	const historyFilterOptions = [
		translate('all'),
		translate('deposit'),
		translate('withdrawal'),
		translate('createdCompany'),
		translate('addedToTeam'),
		translate('updatedCompany'),
		translate('updatedUser'),
		translate('updatedUserSettings'),
	];

	const handleActivitiesFilterButton = (filter: string) => {
		setFilteredActivities(
			notifications!.filter(
				notification => notification.event.description === filter
			)
		);
		if (filter === translate('all')) {
			setFilteredActivities(notifications!);
		}
		setSelectedFilterOption(filter);
	};

	useEffect(() => {
		setPageNumber(0);
	}, [filteredActivities]);

	useEffect(() => {
		setFilteredActivities(notifications!);
	}, [notifications]);

	return (
		<AppLayout
			right={
				session ? (
					<>
						<Flex display={{ md: 'none', lg: 'flex' }}>
							<LifeIsEasierBanner />
						</Flex>
						<Flex display={{ md: 'flex', lg: 'none' }} w="full">
							<LifeIsEasierTabletBreakpoint />
						</Flex>
					</>
				) : (
					<CreateAccountBanner />
				)
			}
		>
			<Flex direction="column" gap="5" pt="6" w="100%">
				<Flex direction="column" gap="4">
					<Flex align="center" justify="space-between">
						<Text
							fontSize={{ xl: 'md', '2xl': 'lg' }}
							fontWeight="medium"
							color={theme.text.primary}
						>
							{translate('history')}
						</Text>
						<Menu gutter={0} autoSelect={false}>
							<MenuButton
								h="max-content"
								py="2"
								px="3"
								w="11.875rem"
								gap="32"
								fontWeight="normal"
								fontSize={{ md: 'sm', '2xl': 'md' }}
								color={theme.text.primary}
								as={Button}
								rightIcon={<BiChevronDown />}
								bg="white"
								disabled={!session}
								fb0bfdb3e84b980e3bee2b86dd5fa8dc6560fb9
								_hover={{}}
								_active={{}}
								_focus={{}}
							>
								{!session ? translate('all') : selectedFilterOption}
							</MenuButton>
							<MenuList
								p="0"
								borderTopRadius="none"
								borderColor="white"
								minW={theme.sizes.menuItem}
							>
								{historyFilterOptions.map((option, index) => (
									<MenuItem
										key={+index}
										bg="white"
										color={theme.text.primary}
										fontSize={{ md: 'xs', lg: 'sm' }}
										_hover={{ bg: theme.bg.black, color: 'white' }}
										borderBottom="1px solid"
										borderBottomColor="gray.200"
										borderBottomRadius={
											option === translate('teamCreated') ? 'base' : 'none'
										}
										onClick={() => handleActivitiesFilterButton(option)}
										_active={{}}
									>
										{option}
									</MenuItem>
								))}
							</MenuList>
						</Menu>
					</Flex>
					{!session ? (
						<>
							<Text fontSize="sm" color={theme.text.primary}>
								{translate('pleaseConnect')}
							</Text>
							<HistorySkeletons />
						</>
					) : (
						<Flex w="full" direction="column">
							<Flex direction="column" gap="2">
								<DisplayedNotifications
									notificationPerPage={notificationPerPage}
									pagesVisited={pagesVisited}
									filteredNotifications={filteredActivities}
								/>
							</Flex>
							{filteredActivities?.length ? (
								<Flex justify="center" pt="5" pb="6">
									<Paginator
										actualPage={pageNumber + 1}
										maxPage={maxPage}
										previous={previous}
										next={next}
									/>
								</Flex>
							) : (
								<Flex whiteSpace="normal" w={{ md: '33.75rem', lg: 'full' }}>
									<Text
										color={theme.text.primary}
										fontSize="sm"
										whiteSpace="normal"
									>
										{translate('noResults')}
										<Text
											decoration="underline"
											color={theme.text.primary}
											fontSize="sm"
											as="span"
											whiteSpace="normal"
											fontWeight="semibold"
											cursor="pointer"
											onClick={() => {
												setFilteredActivities(notifications!);
												setSelectedFilterOption(translate('all'));
											}}
										>
											{translate('returnToAllResults')}
										</Text>
										{translate('orSelectAnother')}
									</Text>
								</Flex>
							)}
						</Flex>
					)}
				</Flex>
			</Flex>
		</AppLayout>
	);
};

export default HistoryComponent;
