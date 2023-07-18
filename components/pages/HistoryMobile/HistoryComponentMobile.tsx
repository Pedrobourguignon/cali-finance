/* eslint-disable no-unsafe-optional-chaining */
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
	HistorySkeletons,
	Paginator,
	DisplayedNotificationsMobile,
} from 'components';
import { usePicasso } from 'hooks';
import { MobileLayout } from 'layouts';
import { useSession } from 'next-auth/react';
import useTranslation from 'next-translate/useTranslation';
import React, { useMemo, useState, useEffect } from 'react';
import { BiChevronDown } from 'react-icons/bi';
import { IHistoryNotifications, IHistoryPage } from 'types';

export const HistoryComponentMobile: React.FC<IHistoryPage> = ({ history }) => {
	const { t: translate } = useTranslation('history-page');
	const theme = usePicasso();
	const [selectedFilterOption, setSelectedFilterOption] = useState<string>(
		translate('all')
	);
	const [pageNumber, setPageNumber] = useState(0);
	const { data: session } = useSession();
	const [filteredActivities, setFilteredActivities] = useState<
		IHistoryNotifications[]
	>(history!);

	const notificationPerPage = 7;
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
			history!.filter(notification => notification.event.description === filter)
		);
		if (filter === translate('all')) {
			setFilteredActivities(history!);
		}
		setSelectedFilterOption(filter);
	};

	useEffect(() => {
		setPageNumber(0);
	}, [filteredActivities]);

	useEffect(() => {
		setFilteredActivities(history!);
	}, [history]);

	const returnToAllResults = () => {
		setFilteredActivities(history!);
		setSelectedFilterOption(translate('all'));
	};

	return (
		<MobileLayout>
			<Flex direction="column" gap="5" w="100%">
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
								minW="11.875rem"
								fontWeight="normal"
								fontSize={{ base: 'xs', md: 'sm', '2xl': 'md' }}
								color={theme.text.primary}
								as={Button}
								rightIcon={<BiChevronDown />}
								bg="white"
								disabled={!session}
								_hover={{}}
								_active={{}}
								_focus={{}}
							>
								<Flex>
									{!session ? translate('all') : selectedFilterOption}
								</Flex>
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
										fontSize={{ base: 'xs', md: 'xs', lg: 'sm' }}
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
								<DisplayedNotificationsMobile
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
										{translate('noResults')}{' '}
										<Text
											decoration="underline"
											color={theme.text.primary}
											fontSize="sm"
											as="span"
											whiteSpace="normal"
											fontWeight="semibold"
											cursor="pointer"
											onClick={returnToAllResults}
										>
											{translate('returnToAllResults')}
										</Text>{' '}
										{translate('orSelectAnother')}
									</Text>
								</Flex>
							)}
						</Flex>
					)}
				</Flex>
			</Flex>
		</MobileLayout>
	);
};

export default HistoryComponentMobile;
