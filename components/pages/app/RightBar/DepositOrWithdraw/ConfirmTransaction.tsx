import { Button, Flex, Img, Text } from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import useTranslation from 'next-translate/useTranslation';
import { Dispatch, SetStateAction, useState } from 'react';
import { ITransaction } from 'types';

interface IConfirmTransaction {
	transaction: ITransaction;
	setConfirm: Dispatch<SetStateAction<boolean>>;
}

const buttonOptions = ['Deposit', 'Withdraw'];
export const ConfirmTransaction: React.FC<IConfirmTransaction> = ({
	transaction,
	setConfirm,
}) => {
	const { t: translate } = useTranslation('company-overall');

	const [selectedOption, setSelectedOption] = useState<string | undefined>(
		transaction.type
	);
	const theme = usePicasso();
	const handleSelectedButton = (btnName: string) => {
		const selectedButton = buttonOptions.find(item => item === btnName);
		setSelectedOption(selectedButton);
	};
	return (
		<Flex
			bg="white"
			borderRadius="base"
			direction="column"
			color={theme.text.primary}
			p="4"
			gap="6"
			w="100%"
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
						disabled={item !== selectedOption}
						_hover={{}}
						_focus={{}}
					>
						{item}
					</Button>
				))}
			</Flex>
			<Flex direction="column" gap="4">
				<Text color={theme.text.primary} fontWeight="medium">
					Confirm Deposit
				</Text>
				<Flex direction="column" gap="3">
					<Flex
						direction="column"
						gap="1.5"
						px="2"
						fontSize="xs"
						color="gray.600"
					>
						<Flex justify="space-between">
							<Text>Amount</Text>
							<Flex align="center" gap="1">
								<Text>{transaction.amount.toLocaleString('en-US')}</Text>
								<Img src={transaction.logo} boxSize="4" />
							</Flex>
						</Flex>
						<Flex justify="space-between">
							<Text>Fee</Text>
							<Text>0.5%</Text>
						</Flex>
					</Flex>
					<Flex
						justify="space-between"
						color={theme.text.primary}
						bg="gray.100"
						h="7"
						align="center"
						borderRadius="base"
						px="2"
					>
						<Text fontWeight="medium">Total Deposit</Text>
						<Flex align="center" gap="1">
							<Text>{transaction.amount.toLocaleString('en-US')}</Text>
							<Img src={transaction.logo} boxSize="4" />
						</Flex>
					</Flex>
				</Flex>
			</Flex>
			<Flex direction="column" gap="2">
				<Button
					bg={theme.bg.primary}
					color="white"
					w="100%"
					py="1.5"
					borderRadius="base"
					fontWeight="medium"
					h="8"
					px="6"
					whiteSpace="normal"
					fontSize="sm"
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
				<Button
					bg="white"
					color={theme.text.primary}
					w="100%"
					borderColor={theme.bg.primary}
					borderWidth="1px"
					borderRadius="base"
					py="1.5"
					onClick={() => setConfirm(false)}
					fontWeight="medium"
					h="8"
					px="6"
					whiteSpace="normal"
					fontSize="sm"
					_hover={{
						opacity: 0.8,
					}}
					_focus={{}}
					_active={{
						opacity: 0.8,
					}}
				>
					Cancel
				</Button>
			</Flex>
		</Flex>
	);
};
