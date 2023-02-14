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
import { useCompanies, usePicasso, useProfile } from 'hooks';
import { AppLayout } from 'layouts';
import useTranslation from 'next-translate/useTranslation';
import React, { useMemo, useState, useEffect } from 'react';
import { BiChevronDown } from 'react-icons/bi';
import { IHistoryPage } from 'types';

export const HistoryComponent: React.FC<IHistoryPage> = ({ history }) => {
	const { t: translate } = useTranslation('history-page');
	const theme = usePicasso();
	const [selectedFilterOption, setSelectedFilterOption] = useState<string>(
		translate('all')
	);
	const [pageNumber, setPageNumber] = useState(0);
	const { filteredNotifications, setFilteredNotifications } = useCompanies();
	const { isConnected } = useProfile();

	const notificationPerPage = 14;
	const maxPage = useMemo(
		() => Math.ceil(filteredNotifications.length / notificationPerPage),
		[filteredNotifications.length]
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
		translate('addedToTeam'),
		translate('teamCreated'),
	];

	const filterHistoryNotifications = (filter: string) => {
		setFilteredNotifications(
			history.filter(notification => notification.type === filter)
		);
		if (filter === translate('all')) {
			setFilteredNotifications(history);
		}
		setSelectedFilterOption(filter);
	};

	console.log(selectedFilterOption);

	useEffect(() => {
		setPageNumber(0);
	}, [filteredNotifications]);

	return (
		<AppLayout
			right={
				isConnected ? (
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
								disabled={!isConnected}
								_hover={{}}
								_active={{}}
								_focus={{}}
							>
								{!isConnected ? translate('all') : selectedFilterOption}
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
										onClick={() => filterHistoryNotifications(option)}
										_active={{}}
									>
										{option}
									</MenuItem>
								))}
							</MenuList>
						</Menu>
					</Flex>
					{!isConnected ? (
						<>
							<Text fontSize="sm" color={theme.text.primary}>
								Please connect your wallet to be able to view your history.
							</Text>
							<HistorySkeletons />
						</>
					) : (
						<Flex w="full" direction="column">
							<Flex direction="column" gap="2">
								<DisplayedNotifications
									notificationPerPage={notificationPerPage}
									pagesVisited={pagesVisited}
									filteredNotifications={filteredNotifications}
								/>
							</Flex>
							{filteredNotifications.length ? (
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
												setFilteredNotifications(history);
												setSelectedFilterOption(translate('all'));
											}}
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
		</AppLayout>
	);
};

export default HistoryComponent;
