import {
	Button,
	Flex,
	Icon,
	Img,
	Input,
	InputGroup,
	Text,
	useDisclosure,
} from '@chakra-ui/react';
import { TokenSelector } from 'components/Modals';
import { usePicasso } from 'hooks';
import { useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { ISelectedCoin } from 'types';

const selectedCoin: ISelectedCoin = {
	logo: 'https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png?1547033579',
	symbol: 'BTC',
};

const buttonOptions = ['Deposit', 'Withdraw'];

export const DepositOrWithdrawCard = () => {
	const theme = usePicasso();
	const { onClose, isOpen, onOpen } = useDisclosure();
	const [selectedOption, setSelectedOption] = useState<string | undefined>(
		'Deposit'
	);

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
			<TokenSelector isOpen={isOpen} onClose={onClose} />
			<Flex w="100%" justify="center">
				{buttonOptions.map((item, index) => (
					<Button
						key={+index}
						bgColor={item === selectedOption ? theme.bg.primary : 'none'}
						color={item === selectedOption ? 'white' : 'gray.500'}
						onClick={() => handleSelectedButton(item)}
						borderRadius="full"
						_hover={{}}
						_focus={{}}
					>
						{item}
					</Button>
				))}
			</Flex>
			<Flex direction="column" gap="1">
				<Text>Amount</Text>
				<InputGroup>
					<Input
						_placeholder={{ color: 'blackAlpha.500' }}
						placeholder="0.00"
						borderColor={theme.bg.primary}
						flex="3"
						borderRightRadius="none"
						_hover={{}}
						color="blackAlpha.500"
						type="number"
					/>
					<Button
						borderLeftRadius="none"
						bg={theme.bg.primary}
						_hover={{ opacity: '80%' }}
						_active={{}}
						_focus={{}}
						onClick={onOpen}
					>
						<Flex gap="2" align="center" color="white">
							<Img boxSize="4" src={selectedCoin.logo} />
							<Text fontSize="sm" width="8" lineHeight="5">
								{selectedCoin.symbol}
							</Text>
							<Icon boxSize="4" as={IoIosArrowDown} />
						</Flex>
					</Button>
				</InputGroup>
			</Flex>
			<Button
				bg={theme.bg.primary}
				color="white"
				w="56"
				py="1.5"
				px="6"
				fontSize="sm"
				_hover={{}}
			>
				{selectedOption === 'Deposit'
					? 'Add Funds to Organization'
					: 'Withdraw Funds to Organization'}
			</Button>
		</Flex>
	);
};
