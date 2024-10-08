import { Flex } from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import {
	InfosBanner,
	LifeIsEasier,
	DepositOrWithdrawCard,
	HaveProblemCard,
	ConfirmTransaction,
} from 'components';
import { useState } from 'react';
import { ITransaction } from 'types';

export const DepositOrWithdrawBanner = () => {
	const [transaction, setTransaction] = useState<ITransaction>(
		{} as ITransaction
	);
	const [confirm, setConfirm] = useState(false);
	const theme = usePicasso();

	return (
		<Flex direction="column" gap="8">
			<InfosBanner
				ilustrationImg="/images/illustration.svg"
				ondulatedImg="/images/bottom-small-wave.svg"
				bottom="0"
			>
				<Flex
					bg={theme.bg.black}
					zIndex="docked"
					gap={confirm ? '6' : '3.6rem'}
					p="4"
					direction="column"
					borderRadius="base"
					className="deposit-withdraw-banner"
				>
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
					<LifeIsEasier />
				</Flex>
			</InfosBanner>
			<HaveProblemCard />
		</Flex>
	);
};
