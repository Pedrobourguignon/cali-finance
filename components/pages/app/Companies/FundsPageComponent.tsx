import { Flex, Text } from '@chakra-ui/react';
import { usePicasso } from 'hooks';
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
		logo: '/icons/tether.svg',
		symbol: 'USDT',
		value: 1,
		change: 0.6,
	},
	{
		logo: '/icons/tether.svg',
		symbol: 'USDT',
		value: 1,
		change: 0,
	},
	{
		logo: '/icons/tether.svg',
		symbol: 'USDT',
		value: 1,
		change: 0.6,
	},
	{
		logo: '/icons/tether.svg',
		symbol: 'USDT',
		value: 1,
		change: 0.6,
	},
	{
		logo: '/icons/tether.svg',
		symbol: 'USDT',
		value: 1,
		change: 0.6,
	},
	{
		logo: '/icons/tether.svg',
		symbol: 'USDT',
		value: 1,
		change: -0.6,
	},
	{
		logo: '/icons/tether.svg',
		symbol: 'USDT',
		value: 1,
		change: 0,
	},
];

export const FundsPageComponent = () => {
	const theme = usePicasso();
	const { t: translate } = useTranslation('company-overall');

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
				<CompaniesHeader />
			</Flex>
			<Flex color={theme.text.primary} py="12" direction="column" gap="10">
				<Flex direction="column" gap="4">
					<Flex fontWeight="medium" gap="1">
						<Text>{translate('coins')}</Text>
					</Flex>
					<Flex w="full" justify="flex-start" flexWrap="wrap" gap="4">
						{coinCard.map((coin, index) => (
							<CoinCard
								coin={coin}
								borderColor="gray.400"
								pr="2.97rem"
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
