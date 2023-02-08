import { Flex, Grid, GridItem, Text } from '@chakra-ui/react';
import { useCompanies, usePicasso } from 'hooks';
import { AppLayout } from 'layouts';
import {
	CoinCard,
	DepositOrWithdrawBanner,
	HistoryDashboard,
	CompaniesHeader,
} from 'components';
import { ICoin } from 'types';
import useTranslation from 'next-translate/useTranslation';

const coinCard: ICoin[] = [
	{
		icon: '/icons/tether.svg',
		name: 'USDT',
		value: '$1,00',
		variation: 0.6,
	},
	{
		icon: '/icons/tether.svg',
		name: 'USDT',
		value: '$1,00',
		variation: 0,
	},
	{
		icon: '/icons/tether.svg',
		name: 'USDT',
		value: '$1,00',
		variation: 0.6,
	},
	{
		icon: '/icons/tether.svg',
		name: 'USDT',
		value: '$1,00',
		variation: 0.6,
	},
	{
		icon: '/icons/tether.svg',
		name: 'USDT',
		value: '$1,00',
		variation: 0.6,
	},
	{
		icon: '/icons/tether.svg',
		name: 'USDT',
		value: '$1,00',
		variation: -0.6,
	},
	{
		icon: '/icons/tether.svg',
		name: 'USDT',
		value: '$1,00',
		variation: 0,
	},
];

export const FundsPageComponent = () => {
	const theme = usePicasso();
	const { t: translate } = useTranslation('company-overall');
	const { selectedCompany } = useCompanies();

	return (
		<AppLayout right={<DepositOrWithdrawBanner />}>
			<Flex w="100%" bg="white" position="absolute" h="14.4rem" left="0" />
			<Flex
				color="black"
				pt="6"
				zIndex="docked"
				direction="column"
				align="start"
			>
				<CompaniesHeader company={selectedCompany} />
			</Flex>
			<Flex color={theme.text.primary} py="12" direction="column" gap="10">
				<Flex direction="column" gap="4">
					<Flex fontWeight="medium" gap="1">
						<Text>{translate('coins')}</Text>
					</Flex>

					<Flex gap="4" w="full" justify="flex-start" flexWrap="wrap">
						{coinCard.map((coin, index) => (
							<CoinCard
								coin={coin}
								borderColor="gray.400"
								bg="white"
								color={theme.text.primary}
								key={+index}
							/>
						))}
					</Flex>
				</Flex>
				<HistoryDashboard />
			</Flex>
		</AppLayout>
	);
};
