import {
	Button,
	Flex,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Text,
} from '@chakra-ui/react';
import { useAuth, useCompanies, usePicasso } from 'hooks';
import { HistoryData } from 'components';
import { IHistoryNotifications } from 'types';
import { useEffect, useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { BiChevronDown } from 'react-icons/bi';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';

export const HistoryDashboard = () => {
	const { t: translate } = useTranslation('company-overall');
	const { t: translateHistory } = useTranslation('history-page');
	const { getCompanieActivities } = useCompanies();
	const { session } = useAuth();
	const { query } = useRouter();

	const { data: companyFinancialActivities } = useQuery(
		'recent-activities',
		() => getCompanieActivities(Number(query.id)),
		{
			enabled: !!query.id && !!session,
		}
	);

	const financialNotifications = companyFinancialActivities?.filter(
		notification =>
			notification.event.name === 'user_withdraw' ||
			notification.event.name === 'company_withdraw' ||
			notification.event.name === 'company_deposit_received'
	);

	const theme = usePicasso();
	const [filteredUserHistory, setFilteredUserHistory] =
		useState<IHistoryNotifications[]>();
	const [selectedFilterOption, setSelectedFilterOption] = useState<string>(
		translate('all')
	);

	useEffect(() => {
		if (financialNotifications) setFilteredUserHistory(financialNotifications);
	}, [financialNotifications]);

	const filterUserHistory = (filter: string[]) => {
		setFilteredUserHistory(
			financialNotifications?.filter(
				notification => notification.event.name === filter[0]
			)
		);
		if (filter[0] === translate('all')) {
			setFilteredUserHistory(financialNotifications);
		}
		setSelectedFilterOption(filter[1]);
	};

	const selectOptions = [
		{
			filter: [translate('all'), translate('all')],
		},
		{
			filter: ['company_deposit_received', translate('companyDepositReceived')],
		},
		{
			filter: ['user_withdraw', translate('userWithdraw')],
		},
		{
			filter: ['company_withdraw', translate('companyWithdraw')],
		},
	];

	return (
		<Flex direction="column" gap="4" w="full">
			<Flex
				w="100%"
				justify="space-between"
				align="center"
				color={theme.text.primary}
			>
				<Text fontWeight="medium">{translate('history')}</Text>
				<Menu gutter={0} autoSelect={false}>
					<MenuButton
						h="max-content"
						py="1.5"
						px="3"
						minW="11.875rem"
						fontWeight="normal"
						fontSize={{ md: 'sm', '2xl': 'md' }}
						color={theme.text.primary}
						as={Button}
						rightIcon={<BiChevronDown />}
						bg="white"
						_hover={{}}
						_active={{}}
						_focus={{}}
					>
						<Flex>{selectedFilterOption}</Flex>
					</MenuButton>
					<MenuList
						p="0"
						borderTopRadius="none"
						borderColor="white"
						minW={theme.sizes.menuItem}
					>
						{selectOptions.map((option, index) => (
							<MenuItem
								key={+index}
								bg="white"
								color={theme.text.primary}
								fontSize={{ md: 'xs', lg: 'sm' }}
								_hover={{ bg: theme.bg.black, color: 'white' }}
								borderBottom="1px solid"
								borderBottomColor="gray.200"
								onClick={() => filterUserHistory(option.filter)}
								_active={{}}
							>
								{option.filter[1]}
							</MenuItem>
						))}
					</MenuList>
				</Menu>
			</Flex>
			<Flex direction="column" gap="2">
				{filteredUserHistory?.map((item, index) => (
					<HistoryData key={+index} userHistory={item} />
				))}
			</Flex>
			{!filteredUserHistory?.length && (
				<Flex whiteSpace="normal">
					<Text color={theme.text.primary} fontSize="sm" whiteSpace="normal">
						{translateHistory('noResults')}
						<Text
							decoration="underline"
							color={theme.text.primary}
							fontSize="sm"
							as="span"
							whiteSpace="normal"
							fontWeight="semibold"
							cursor="pointer"
							onClick={() => {
								setFilteredUserHistory(financialNotifications);
								setSelectedFilterOption(translate('all'));
							}}
						>
							&nbsp;{translateHistory('returnToAllResults')}&nbsp;
						</Text>
						&nbsp;{translateHistory('orSelectAnother')}
					</Text>
				</Flex>
			)}
		</Flex>
	);
};
