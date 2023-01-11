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
import { TokenSelector } from 'components';
import { usePicasso } from 'hooks';
import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { ISelectedCoin } from 'types';

const selectedCoin: ISelectedCoin = {
	logo: 'https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png?1547033579',
	symbol: 'BTC',
};

export const DepositOrWithdrawCard = () => {
	const { t: translate } = useTranslation('organization-overall');
	const theme = usePicasso();
	const { onClose, isOpen, onOpen } = useDisclosure();
	const [selectedOption, setSelectedOption] = useState<string | undefined>(
		translate('deposit')
	);
	const buttonOptions = [translate('deposit'), translate('withdrawal')];

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
				<Text>{translate('amount')}</Text>
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
				w="full"
				py="1.5"
				px="6"
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
		</Flex>
	);
};
