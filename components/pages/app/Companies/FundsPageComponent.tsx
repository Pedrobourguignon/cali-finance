import { Flex, list, Text } from '@chakra-ui/react';
import { usePicasso, useTokens } from 'hooks';
import { AppLayout } from 'layouts';
import {
	CoinCard,
	DepositOrWithdrawBanner,
	HistoryDashboard,
	CompaniesHeader,
} from 'components';
import useTranslation from 'next-translate/useTranslation';
import { useQuery } from 'wagmi';
import { useEffect, useState } from 'react';
import { ICoin } from 'types';
import { getCoinLogo } from 'utils';

export const FundsPageComponent = () => {
	const theme = usePicasso();
	const { t: translate } = useTranslation('company-overall');
	const { getCoinServiceTokens, listOfTokens } = useTokens();
	const [coins, setCoins] = useState<ICoin[]>([]);
	const symbols = ['usdt'];

	const { data: coinServiceTokens } = useQuery(['get-coin-data'], () =>
		getCoinServiceTokens(symbols.toString())
	);

	const createCoin = async () => {
		if (
			coinServiceTokens &&
			coinServiceTokens.USDT &&
			listOfTokens.length !== 0
		) {
			const newCoin: ICoin[] = [
				{
					symbol: coinServiceTokens?.USDT.symbol,
					change: coinServiceTokens?.USDT.change,
					value: coinServiceTokens?.USDT.value,
					logo: getCoinLogo(coinServiceTokens?.USDT.symbol, listOfTokens),
				},
			];
			setCoins(newCoin);
		}
	};

	useEffect(() => {
		createCoin();
	}, [coinServiceTokens, listOfTokens]);

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
						{coins.map((coin, index) => (
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
