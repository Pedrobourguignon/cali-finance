import { Flex, Text } from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import {
	CoinCard,
	DepositOrWithdrawCard,
	HistoryDashboard,
	CompaniesHeaderMobile,
	ConfirmTransaction,
} from 'components';
import { ICoin, ITransaction } from 'types';
import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';

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

export const FundsPageComponentMobile = () => {
	const theme = usePicasso();
	const { t: translate } = useTranslation('company-overall');
	const [transaction, setTransaction] = useState<ITransaction>(
		{} as ITransaction
	);
	const [confirm, setConfirm] = useState(false);

	return (
		<>
			<Flex color="black" zIndex="docked" direction="column" align="start">
				<CompaniesHeaderMobile />
			</Flex>
			<Flex pt="8">
				{confirm ? (
					<ConfirmTransaction
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
			</Flex>
			<Flex w="full" pb="20">
				<HistoryDashboard />
			</Flex>
		</>
	);
};
