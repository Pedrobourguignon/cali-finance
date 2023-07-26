import {
	Button,
	Flex,
	FormControl,
	Icon,
	Img,
	Input,
	InputGroup,
	Text,
	useDisclosure,
} from '@chakra-ui/react';
import { BlackButton, TokenSelector } from 'components';
import { useCompanies, usePicasso, useSchema, useTokens } from 'hooks';
import { useForm } from 'react-hook-form';
import useTranslation from 'next-translate/useTranslation';
import { Dispatch, SetStateAction, useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
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
	const { onClose, isOpen, onOpen } = useDisclosure();
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
		setSelectedOption(selectedButton!);
	};

	const [bool, setBool] = useState(false);
	const handleDeposit = (transaction: IDepositOrWithdrawnForm) => {
		setTransaction({
			amount: transaction.amount,
			logo: getCoinLogo('USDT', listOfTokens),
			symbol: 'USDT',
			type: selectedOption,
		});
		setConfirm(true);
	};

	return (
		<FormControl>
			<form onSubmit={handleSubmit(handleDeposit)}>
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
					{/* <TokenSelector
						isOpen={isOpen}
						onClose={onClose}
						setToken={setToken}
					/> */}
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
					<Flex direction="column" gap="2">
						{selectedOption === translate('deposit') ? (
							<Flex direction="column" gap="2">
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
										// _hover={{ opacity: '80%' }}
										// onClick={onOpen}
									>
										<Flex gap="2" align="center" color="white" px="3">
											<Img
												boxSize="4"
												src={getCoinLogo('USDT', listOfTokens)}
											/>
											<Text fontSize="sm" whiteSpace="nowrap">
												{token.symbol}
											</Text>
											{/* <Icon boxSize="4" as={IoIosArrowDown} /> */}
										</Flex>
									</Flex>
								</InputGroup>
								<Text color="red" fontSize="sm">
									{errors.amount?.message}
								</Text>
							</Flex>
						) : (
							<Flex
								gap="2"
								w="full"
								justify="space-between"
								direction="column"
								pb="4"
							>
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
													? Number(
															selectedCompany.totalFundsUsd
													  ).toLocaleString('en-US')
													: 0}
											</Text>
											<Img
												src={getCoinLogo('USDT', listOfTokens)}
												boxSize="4"
											/>
										</Flex>
									</Flex>
								</Flex>
								<Text color="red" fontSize="sm">
									{errors.amount?.message}
								</Text>
							</Flex>
						)}
						<BlackButton
							h="8"
							type="submit"
							whiteSpace="normal"
							onClick={() => setBool(true)}
						>
							{selectedOption === translate('deposit')
								? translate('addFunds')
								: translate('withdrawFunds')}
						</BlackButton>
					</Flex>
				</Flex>
			</form>
		</FormControl>
	);
};
