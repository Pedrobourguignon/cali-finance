import {
	Flex,
	Text,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	Button,
	Skeleton,
	SkeletonCircle,
	Stack,
	Icon,
} from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import useTranslation from 'next-translate/useTranslation';
import React, { useState } from 'react';
import { BiChevronDown } from 'react-icons/bi';
import { IHistoryNotification, IHistoryPage } from 'types';
import { Paginator } from '../Dashboard';

export const HistoryComponent: React.FC<IHistoryPage> = ({ history }) => {
	const theme = usePicasso();
	const { t: translate } = useTranslation('history-page');

	const isConnected = true;
	const shouldDisplay = isConnected ? 'flex' : 'none';
	const shouldntDisplay = isConnected ? 'none' : 'flex';

	const [filteredNotifications, setFilteredNotifications] =
		useState<IHistoryNotification[]>(history);
	const [selectedFilterOption, setSelectedFilterOption] = useState('All');

	const [pageNumber, setPageNumber] = useState(0);
	const [actualPage, setActualPage] = useState(1);
	const notificationPerPage = 9;
	const maxPage = Math.ceil(filteredNotifications.length / notificationPerPage);
	const pagesVisited = pageNumber * notificationPerPage;

	const previous = () => {
		setPageNumber(pageNumber - 1);
		setActualPage(actualPage - 1);
	};
	const next = () => {
		setPageNumber(pageNumber + 1);
		setActualPage(actualPage + 1);
	};

	const historyFilterOptions = [
		'All',
		'Deposit',
		'Withdrawal',
		'Added to team',
		'Team Created',
	];

	const filterHistoryNotifications = (filter: string) => {
		setFilteredNotifications(
			history.filter(notification => notification.type === filter)
		);
		if (filter === 'All') {
			setFilteredNotifications(history);
		}
		setSelectedFilterOption(filter);
	};

	const displayNotifications = filteredNotifications
		.slice(pagesVisited, pagesVisited + notificationPerPage)
		.map((notification, index) => (
			<Flex
				key={+index}
				bg="white"
				px="3"
				py="2"
				gap="16"
				borderRadius="base"
				align="center"
			>
				<Flex align="center" gap="3">
					<Icon as={notification.companyIcon} boxSize="6" />
					<Text fontSize="sm" fontWeight="600" color="#121212">
						{notification.company}
					</Text>
				</Flex>
				<Flex align="center" gap="3">
					<Icon as={notification.userIcon} boxSize="6" />
					<Flex direction="column">
						<Text fontSize="sm" fontWeight="400" color="#121212">
							{notification.userWalletAddress}
						</Text>
						<Text fontSize="xs" fontWeight="400" color="gray.500">
							{notification.userTeam}
						</Text>
					</Flex>
				</Flex>
				<Flex align="center" gap="3">
					<Icon as={notification.typeIcon} boxSize="4" />
					<Flex direction="column">
						<Text fontSize="sm" fontWeight="400" color="#121212">
							{notification.type === 'Deposit'
								? translate('deposit')
								: translate('withdrawal')}
						</Text>
						<Text fontSize="xs" fontWeight="400" color="gray.500">
							{notification.date}
						</Text>
					</Flex>
				</Flex>
				<Flex direction="column" align="end" h="max-content">
					<Text color="#121212" fontWeight="400" fontSize="xs">
						{notification.value}
					</Text>
					<Text
						color={
							notification.status === 'Completed' ? 'green.400' : 'yellow.600'
						}
						fontWeight="400"
						fontSize="xs"
					>
						{notification.status === 'Completed'
							? translate('completed')
							: translate('pending')}
					</Text>
				</Flex>
			</Flex>
		));

	return (
		<Flex
			bg="#EDF2F7"
			w="full"
			h="95vh"
			m="auto"
			borderLeft="0.25rem solid"
			borderColor={theme.branding.blue}
			borderLeftRadius="sm"
			gap="4"
			py="8"
			px="7"
		>
			<Flex direction="column" gap="2">
				<Flex direction="column" gap="2" w="46rem">
					<Flex justify="space-between" align="center">
						<Flex direction="column" gap="4">
							<Text
								fontSize="md"
								fontStyle="medium"
								fontWeight="500"
								color="#121212"
							>
								{translate('history')}
							</Text>
							<Text fontSize="sm" display={shouldntDisplay} color="#121212">
								Please connect your wallet to be able to view your history.
							</Text>
						</Flex>
						<Menu gutter={0} autoSelect={false}>
							<MenuButton
								w="11.875rem"
								color="#121212"
								h="max-content"
								as={Button}
								rightIcon={<BiChevronDown />}
								bg="white"
								fontSize="sm"
								px="3"
								py="2"
								gap="24"
								disabled={!isConnected}
								_hover={{}}
								_active={{}}
								_focus={{}}
								borderBottomRadius="none"
							>
								{!isConnected ? 'All' : selectedFilterOption}
							</MenuButton>
							<MenuList
								p="0"
								borderTopRadius="none"
								borderColor="white"
								minW="11.875rem"
							>
								{historyFilterOptions.map((option, index) => (
									<MenuItem
										key={+index}
										bg="white"
										color="#121212"
										fontSize="sm"
										_hover={{ bg: '#191919', color: 'white' }}
										borderBottom="1px solid"
										borderBottomColor="gray.200"
										borderBottomRadius={
											option === 'Team Created' ? 'base' : 'none'
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
					<Flex
						gap="16"
						bg="white"
						w="max-content"
						p="3"
						display={shouldntDisplay}
					>
						<Flex gap="3" align="center">
							<SkeletonCircle size="6" />
							<Skeleton width="28" height="5" />
						</Flex>
						<Flex gap="3" align="center">
							<SkeletonCircle size="6" />
							<Skeleton width="28" height="5" />
						</Flex>
						<Flex gap="2" align="center">
							<SkeletonCircle size="4" />
							<Stack spacing="1">
								<Skeleton width="16" height="4" />
								<Skeleton width="10" height="3" />
							</Stack>
						</Flex>
						<Flex gap="3" direction="column">
							<Stack spacing="1" align="end">
								<Skeleton width="16" height="3" />
								<Skeleton width="10" height="3" />
							</Stack>
						</Flex>
					</Flex>
					<Flex
						direction="column"
						gap="2"
						display={shouldDisplay}
						color="black"
					>
						{displayNotifications}
					</Flex>
				</Flex>
				<Flex justify="center" bottom="0">
					<Paginator
						actualPage={actualPage}
						maxPage={maxPage}
						previous={previous}
						next={next}
					/>
				</Flex>
			</Flex>

			<Flex w="296px" h="629px" bg="#121212" />
		</Flex>
	);
};

export default HistoryComponent;
