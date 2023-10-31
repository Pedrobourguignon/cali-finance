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
import { useAuth, usePicasso } from 'hooks';
import { MobileLayout } from 'layouts';

import useTranslation from 'next-translate/useTranslation';
import React, { useMemo, useState, useEffect } from 'react';
import { BiChevronDown } from 'react-icons/bi';
import { IHistoryNotifications, IHistoryPage } from 'types';
import { historyPageFilterOptions } from 'utils';

export const HistoryComponentMobile: React.FC<IHistoryPage> = ({ history }) => {
	const { t: translate } = useTranslation('history-page');
	const theme = usePicasso();
	const [selectedFilterOption, setSelectedFilterOption] =
		useState<string>('all');
	const [pageNumber, setPageNumber] = useState(0);
	const { session } = useAuth();
	const [filteredActivities, setFilteredActivities] = useState<
		IHistoryNotifications[]
	>(history || []);

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

	const handleActivitiesFilterButton = (filter: string[]) => {
		if (history) {
			setFilteredActivities(
				history.filter(
					notification => notification.event.description === filter[0]
				)
			);
			if (translate(filter[1]) === translate('all')) {
				setFilteredActivities(history);
			}
			setSelectedFilterOption(translate(filter[1]));
		}
	};

	useEffect(() => {
		setPageNumber(0);
	}, [filteredActivities]);

	useEffect(() => {
		if (history) setFilteredActivities(history);
	}, [history]);

	const returnToAllResults = () => {
		if (history) {
			setFilteredActivities(history);
			setSelectedFilterOption('all');
		}
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
								isDisabled={!session}
								_hover={{}}
								_active={{}}
								_focus={{}}
							>
								<Flex>
									{!session
										? translate('all')
										: translate(selectedFilterOption)}
								</Flex>
							</MenuButton>
							<MenuList
								p="0"
								borderTopRadius="none"
								borderColor="white"
								minW={theme.sizes.menuItem}
							>
								{historyPageFilterOptions.map((option, index) => (
									<MenuItem
										key={+index}
										bg="white"
										color={theme.text.primary}
										fontSize={{ base: 'xs', md: 'xs', lg: 'sm' }}
										_hover={{ bg: theme.bg.black, color: 'white' }}
										borderBottom="1px solid"
										borderBottomColor="gray.200"
										onClick={() => handleActivitiesFilterButton(option.filter)}
										_active={{}}
									>
										{translate(option.filter[1])}
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
