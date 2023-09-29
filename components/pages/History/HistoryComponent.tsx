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
	LifeIsEasierBanner,
	CreateAccountBanner,
	HistorySkeletons,
	DisplayedNotifications,
	Paginator,
	LifeIsEasierTabletBreakpoint,
} from 'components';
import { useAuth, usePicasso } from 'hooks';
import { AppLayout } from 'layouts';

import useTranslation from 'next-translate/useTranslation';
import React, { useMemo, useState, useEffect } from 'react';
import { BiChevronDown } from 'react-icons/bi';
import { IHistoryNotifications, IHistoryPage } from 'types';
import { historyPageFilterOptions } from 'utils';

export const HistoryComponent: React.FC<IHistoryPage> = ({ history }) => {
	const { t: translate } = useTranslation('history-page');
	const theme = usePicasso();
	const [selectedFilterOption, setSelectedFilterOption] =
		useState<string>('all');
	const [pageNumber, setPageNumber] = useState(0);
	const { session } = useAuth();
	const [filteredActivities, setFilteredActivities] = useState<
		IHistoryNotifications[]
	>(history || []);

	const notificationPerPage = 13;
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
		}
		if (translate(filter[1]) === translate('all') && history) {
			setFilteredActivities(history);
		}
		setSelectedFilterOption(translate(filter[1]));
	};

	useEffect(() => {
		setPageNumber(0);
	}, [filteredActivities]);

	useEffect(() => {
		if (history) setFilteredActivities(history);
	}, [history]);

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
								display="flex"
								justifyItems="space-between"
								h="max-content"
								py="2"
								px="3"
								minW="11.875rem"
								fontWeight="normal"
								fontSize={{ md: 'sm', '2xl': 'md' }}
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
										fontSize={{ md: 'xs', lg: 'sm' }}
										_hover={{ bg: theme.bg.black, color: 'white' }}
										borderBottom="1px solid"
										borderBottomColor="gray.200"
										// borderBottomRadius={
										// 	translate(option[0]) === translate('teamCreated')
										// 		? 'base'
										// 		: 'none'
										// }
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
										maxPage={maxPage === 1 ? maxPage : maxPage - 1}
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
