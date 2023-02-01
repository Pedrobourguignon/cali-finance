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
} from 'components';
import { ProfileProvider } from 'contexts';
import { usePicasso } from 'hooks';
import { AppLayout } from 'layouts';
import useTranslation from 'next-translate/useTranslation';
import React, { useMemo, useState } from 'react';
import { BiChevronDown } from 'react-icons/bi';
import { IHistoryNotification, IHistoryPage } from 'types';

export const HistoryComponent: React.FC<IHistoryPage> = ({ history }) => {
	const { t: translate } = useTranslation('history-page');
	const [selectedFilterOption, setSelectedFilterOption] = useState<string>(
		translate('all')
	);
	const [pageNumber, setPageNumber] = useState(0);
	const [filteredNotifications, setFilteredNotifications] =
		useState<IHistoryNotification[]>(history);

	const theme = usePicasso();

	const isConnected = true;
	const shouldDisplay = isConnected ? 'flex' : 'none';
	const shouldntDisplay = isConnected ? 'none' : 'flex';

	const notificationPerPage = 9;
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

	return (
		<ProfileProvider>
			<AppLayout
				right={isConnected ? <LifeIsEasierBanner /> : <CreateAccountBanner />}
			>
				<Flex direction="column" gap="5" pt="6">
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
									gap={{ md: '22', lg: '28', xl: '32' }}
									fontSize={{ md: 'xs', xl: 'sm', '2xl': 'md' }}
									color={theme.text.primary}
									as={Button}
									rightIcon={<BiChevronDown />}
									bg="white"
									disabled={!isConnected}
									_hover={{}}
									_active={{}}
									_focus={{}}
									borderBottomRadius="none"
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
						<Text
							fontSize={{ lg: 'xs', xl: 'sm', '2xl': 'md' }}
							display={shouldntDisplay}
							color={theme.text.primary}
						>
							Please connect your wallet to be able to view your history.
						</Text>
						<HistorySkeletons display={shouldntDisplay} />
						<Flex
							direction="column"
							gap="2"
							display={shouldDisplay}
							color="black"
						>
							<DisplayedNotifications
								notificationPerPage={notificationPerPage}
								pagesVisited={pagesVisited}
								filteredNotifications={filteredNotifications}
							/>
						</Flex>
						<Flex display={shouldDisplay} justify="center">
							<Paginator
								actualPage={pageNumber + 1}
								maxPage={maxPage}
								previous={previous}
								next={next}
							/>
						</Flex>
					</Flex>
				</Flex>
			</AppLayout>
		</ProfileProvider>
	);
};

export default HistoryComponent;
