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
import { TokenSelector } from 'components';
import { usePicasso } from 'hooks';
import { useForm } from 'react-hook-form';
import useTranslation from 'next-translate/useTranslation';
import { Dispatch, SetStateAction, useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { ISelectedCoin, ITransaction } from 'types';
import { yupResolver } from '@hookform/resolvers/yup';
import { transactionSchema } from 'utils';

interface IDepoistOrWithdrawCard {
	setTransaction: Dispatch<SetStateAction<ITransaction>>;
	setConfirm: Dispatch<SetStateAction<boolean>>;
}

interface IDepositOrWithdrawnForm {
	amount: number;
}

export const DepositOrWithdrawCard: React.FC<IDepoistOrWithdrawCard> = ({
	setTransaction,
	setConfirm,
}) => {
	const { t: translate } = useTranslation('company-overall');
	const theme = usePicasso();
	const { onClose, isOpen, onOpen } = useDisclosure();
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
		symbol: 'BTC',
	} as ISelectedCoin);

	const handleSelectedButton = (btnName: string) => {
		const selectedButton = buttonOptions.find(item => item === btnName);
		setSelectedOption(selectedButton!);
	};

	const handleDeposit = (transaction: IDepositOrWithdrawnForm) => {
		setTransaction({
			amount: transaction.amount,
			logo: token.logo,
			symbol: token.symbol,
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
				>
					<TokenSelector
						isOpen={isOpen}
						onClose={onClose}
						setToken={setToken}
					/>
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
						<Text fontSize="sm">{translate('amount')}</Text>
						<InputGroup>
							<Input
								_placeholder={{ color: 'blackAlpha.500' }}
								placeholder="0.00"
								borderColor={theme.bg.primary}
								h="8"
								flex="3"
								borderRightRadius="none"
								_hover={{}}
								color="blackAlpha.500"
								type="number"
								zIndex="docked"
								{...register('amount')}
							/>
							<Text position="absolute" color="red" pt="7">
								{errors.amount?.message}
							</Text>
							<Button
								borderLeftRadius="none"
								bg={theme.bg.primary}
								_hover={{ opacity: '80%' }}
								h="8"
								_active={{}}
								_focus={{}}
								onClick={onOpen}
							>
								<Flex gap="2" align="center" color="white">
									<Img boxSize="4" src={token.logo} />
									<Text fontSize="sm" whiteSpace="nowrap">
										{token.symbol}
									</Text>
									<Icon boxSize="4" as={IoIosArrowDown} />
								</Flex>
							</Button>
						</InputGroup>
					</Flex>
					<Button
						bg={theme.bg.primary}
						type="submit"
						color="white"
						w="100%"
						py="1.5"
						h="8"
						px="6"
						whiteSpace="normal"
						fontSize={{ base: 'xs', xl: 'md' }}
						_hover={{
							opacity: 0.8,
						}}
						_focus={{}}
						_active={{
							opacity: 0.8,
						}}
					>
						{selectedOption === translate('deposit')
							? translate('addFunds')
							: translate('withdrawFunds')}
					</Button>
				</Flex>
			</form>
		</FormControl>
	);
};
