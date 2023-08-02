import {
	Button,
	Flex,
	FormControl,
	Img,
	Input,
	InputGroup,
	Text,
} from '@chakra-ui/react';
import { BlackButton } from 'components';
import { useCompanies, usePicasso, useSchema, useTokens } from 'hooks';
import { useForm } from 'react-hook-form';
import useTranslation from 'next-translate/useTranslation';
import { Dispatch, SetStateAction, useState } from 'react';
import { ISelectedCoin, ITransaction } from 'types';
import { yupResolver } from '@hookform/resolvers/yup';
import { getCoinLogo } from 'utils';

interface IDepositOrWithdrawCard {
	setTransaction: Dispatch<SetStateAction<ITransaction>>;
	setConfirm: Dispatch<SetStateAction<boolean>>;
}

interface IDepositOrWithdrawnForm {
	amount: number;
}

export const DepositOrWithdrawCard: React.FC<IDepositOrWithdrawCard> = ({
	setTransaction,
	setConfirm,
}) => {
	const { t: translate } = useTranslation('company-overall');
	const { transactionSchema } = useSchema();
	const theme = usePicasso();
	const { listOfTokens } = useTokens();
	const { selectedCompany } = useCompanies();
	const buttonOptions = [translate('deposit'), translate('withdrawal')];
	const [selectedOption, setSelectedOption] = useState<string>(
		translate('deposit')
	);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IDepositOrWithdrawnForm>({
		resolver: yupResolver(transactionSchema),
	});

	const [token, setToken] = useState<ISelectedCoin>({
		logo: 'https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png?1547033579',
		symbol: 'USDT',
	} as ISelectedCoin);

	const handleSelectedButton = (btnName: string) => {
		const selectedButton = buttonOptions.find(item => item === btnName);
		if (selectedButton) setSelectedOption(selectedButton);
	};

	const handleDeposit = (transaction: IDepositOrWithdrawnForm) => {
		setTransaction({
			amount: transaction.amount,
			logo: getCoinLogo('USDT', listOfTokens),
			symbol: 'USDT',
			type: selectedOption,
		});
		setConfirm(true);
	};
	const handleWithdraw = () => {
		setTransaction({
			amount: selectedCompany.totalFundsUsd ? selectedCompany.totalFundsUsd : 0,
			logo: getCoinLogo('USDT', listOfTokens),
			symbol: 'USDT',
			type: selectedOption,
		});
		setConfirm(true);
	};

	return (
		<FormControl>
			<Flex
				bg="white"
				borderRadius="base"
				direction="column"
				color={theme.text.primary}
				p="4"
				gap="4"
				w="100%"
				minH="12rem"
			>
				<Flex w="100%" justify="center" direction="row">
					{buttonOptions.map((item, index) => (
						<Button
							key={+index}
							bgColor={item === selectedOption ? theme.bg.primary : 'none'}
							color={item === selectedOption ? 'white' : 'gray.500'}
							onClick={() => handleSelectedButton(item)}
							h="9"
							borderRadius="full"
							_hover={{}}
							_focus={{}}
							fontSize="sm"
						>
							{item}
						</Button>
					))}
				</Flex>
				<Flex direction="column">
					{selectedOption === translate('deposit') ? (
						<Flex direction="column">
							<form onSubmit={handleSubmit(handleDeposit)}>
								<Flex direction="column" gap="6">
									<Flex direction="column">
										<Text fontSize="sm">{translate('amount')}</Text>
										<InputGroup>
											<Input
												_placeholder={{ color: 'blackAlpha.500' }}
												placeholder="0.00"
												borderColor={errors.amount ? 'red' : theme.bg.primary}
												h="8"
												flex="3"
												borderRightRadius="none"
												_hover={{}}
												color={theme.text.primary}
												zIndex="docked"
												{...register('amount')}
											/>
											<Flex
												borderLeftRadius="none"
												borderRightRadius="md"
												bg={theme.bg.primary}
												h="8"
												_active={{}}
												_focus={{}}
											>
												<Flex gap="2" align="center" color="white" px="3">
													<Img
														boxSize="4"
														src={getCoinLogo('USDT', listOfTokens)}
													/>
													<Text fontSize="sm" whiteSpace="nowrap">
														{token.symbol}
													</Text>
												</Flex>
											</Flex>
										</InputGroup>
										<Text color="red" fontSize="sm">
											{errors.amount?.message}
										</Text>
									</Flex>

									<BlackButton h="8" type="submit" whiteSpace="normal">
										{translate('addFunds')}
									</BlackButton>
								</Flex>
							</form>
						</Flex>
					) : (
						<Flex gap="6" w="full" justify="space-between" direction="column">
							<Flex>
								<Text fontSize="sm" w="full" color="gray.500">
									{translate('availableToWithdraw')}
								</Text>
								<Flex direction="column" w="full" align="end">
									<Text>
										${' '}
										{Number(selectedCompany.totalFundsUsd)
											? Number(selectedCompany.totalFundsUsd).toLocaleString(
													'en-US'
											  )
											: 0}
									</Text>
									<Flex align="center" gap="1">
										<Text fontSize="xs">
											{Number(selectedCompany.totalFundsUsd)
												? Number(selectedCompany.totalFundsUsd).toLocaleString(
														'en-US'
												  )
												: 0}
										</Text>
										<Img src={getCoinLogo('USDT', listOfTokens)} boxSize="4" />
									</Flex>
								</Flex>
							</Flex>
							<BlackButton h="8" onClick={handleWithdraw} whiteSpace="normal">
								{translate('withdrawFunds')}
							</BlackButton>
						</Flex>
					)}
				</Flex>
			</Flex>
		</FormControl>
	);
};
