import { Flex, Text } from '@chakra-ui/react';
import { usePicasso, useTokens } from 'hooks';
import {
	CoinCard,
	DepositOrWithdrawCard,
	HistoryDashboard,
	CompaniesHeaderMobile,
	ConfirmTransaction,
} from 'components';
import { ICoin, ITransaction } from 'types';
import useTranslation from 'next-translate/useTranslation';
import { useEffect, useState } from 'react';
import { useQuery } from 'wagmi';
import { getCoinLogo } from 'utils';

export const FundsPageComponentMobile = () => {
	const theme = usePicasso();
	const { t: translate } = useTranslation('company-overall');
	const [transaction, setTransaction] = useState<ITransaction>(
		{} as ITransaction
	);
	const symbols = ['usdt'];
	const [confirm, setConfirm] = useState(false);
	const { coins, setCoins, getCoinServiceTokens, listOfTokens } = useTokens();

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
		<>
			<Flex color="black" zIndex="docked" direction="column" align="start">
				<CompaniesHeaderMobile />
			</Flex>
			<Flex pt="8">
				{confirm ? (
					<ConfirmTransaction
						confirm={confirm}
						setConfirm={setConfirm}
						transaction={transaction}
					/>
				) : (
					<DepositOrWithdrawCard
						setTransaction={setTransaction}
						setConfirm={setConfirm}
					/>
				)}
			</Flex>
			<Flex overflowX="hidden" direction="column" py="10">
				<Text
					fontSize="md"
					fontWeight="medium"
					color={theme.text.primary}
					pb="4"
				>
					{translate('coins')}
				</Text>
				<Flex w="full" h="full" display="block">
					<Flex
						gap="4"
						overflowX="scroll"
						sx={{
							'&::-webkit-scrollbar': {
								display: 'none',
							},
						}}
					>
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
			</Flex>
			<Flex w="full" pb="20">
				<HistoryDashboard />
			</Flex>
		</>
	);
};
