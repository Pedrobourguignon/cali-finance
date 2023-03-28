/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
	Button,
	Flex,
	Img,
	Input,
	InputGroup,
	Text,
	useDisclosure,
	Icon,
} from '@chakra-ui/react';
import { TokenSelector } from 'components';
import { OffsetShadow } from 'components/OffsetShadow';
import { usePicasso, useTokens } from 'hooks';
import useTranslation from 'next-translate/useTranslation';
import React, { useEffect, useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { useQuery } from 'react-query';
import { ISelectedCoin } from 'types';

export const FeeCalculator = () => {
	const [amount, setAmount] = useState(0);
	const [feePrice, setFeePrice] = useState(0);
	const [amountToCompare, setAmountToCompare] = useState(999);
	const [token, setToken] = useState<ISelectedCoin>({
		logo: 'https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png?1547033579',
		symbol: 'BTC',
	} as ISelectedCoin);
	const { getCoinServiceTokens } = useTokens();
	const { t: translate } = useTranslation('landing');
	const { isOpen, onOpen, onClose } = useDisclosure();
	const theme = usePicasso();

	const { data: coinServiceTokens } = useQuery('get-coin-data', () =>
		getCoinServiceTokens(token.symbol)
	);

	const [feeInDolarPrice, setFeeInDolarPrice] = useState<number | undefined>(0);

	useEffect(() => {
		if (coinServiceTokens) {
			setFeeInDolarPrice(Object.values(coinServiceTokens!)[0].value);
		}
	}, [coinServiceTokens]);

	return (
		<OffsetShadow
			borderRadius="xl"
			width="22.125rem"
			height="13.813rem"
			borderColor={theme.bg.primary}
			top="0.5rem"
			left="0.625rem"
			bgGradient={theme.gradients.landing}
		>
			<TokenSelector setToken={setToken} isOpen={isOpen} onClose={onClose} />
			<Flex
				borderRadius="xl"
				bg={theme.bg.white}
				w={{ md: '22.125rem', '2xl': '35rem' }}
				h="13.813rem"
			>
				<Flex direction="column" p="6" w="full">
					<Text
						fontSize="sm"
						fontWeight="medium"
						color={theme.text.primary}
						pb="2"
					>
						{translate('amount')}
					</Text>
					<InputGroup h="max-content" pb="4">
						<Input
							_placeholder={{
								color: 'blackAlpha.500',
								fontSize: { lg: 'xs', xl: 'sm' },
							}}
							placeholder="0.00"
							borderColor={theme.bg.primary}
							flex="3"
							borderRightRadius="none"
							_hover={{}}
							color={theme.text.primary}
							type="number"
							h="8"
							onChange={inputAmount =>
								setAmount(Number(inputAmount.target.value))
							}
						/>
						<Button
							p="0"
							borderLeftRadius="none"
							bg={theme.bg.primary}
							_hover={{ opacity: '80%' }}
							_active={{}}
							_focus={{}}
							onClick={onOpen}
							w={{ md: '30%', lg: '50%', xl: '40%' }}
							h="8"
						>
							<Flex gap="2" align="center">
								<Img boxSize={{ md: '4' }} src={token.logo} />
								<Text
									fontSize={{ md: 'xs', xl: 'sm' }}
									width={{ lg: '6', xl: '8' }}
									lineHeight="5"
								>
									{token.symbol.toUpperCase()}
								</Text>
								<Icon boxSize={{ md: '2', xl: '4' }} as={IoIosArrowDown} />
							</Flex>
						</Button>
					</InputGroup>
					<Flex pb="5" justify="space-between" direction="column">
						<Flex justify="space-between" w="full">
							<Text
								fontWeight="medium"
								fontSize="sm"
								color={theme.text.primary}
							>
								{translate('fee')}
							</Text>
							<Text fontSize="sm" color={theme.text.primary}>
								{amount === 0
									? '0.5%'
									: `${feePrice} ${token.symbol.toUpperCase()}`}
							</Text>
						</Flex>

						<Flex justify="end" w="full">
							<Text fontSize="xs" color="blackAlpha.700">
								{amountToCompare === 999
									? '0'
									: ` ${(
											((feeInDolarPrice! * 0.5) / 100) *
											amount
									  ).toLocaleString()} US$`}
							</Text>
						</Flex>
					</Flex>
					<Button
						h="2rem"
						_hover={{ opacity: 0.8 }}
						_active={{}}
						_focus={{}}
						bg={theme.bg.black}
						w="full"
						fontWeight="medium"
						fontSize="sm"
						onClick={() => {
							setFeePrice((amount * 0.5) / 100);
							setAmountToCompare(amount);
						}}
						isDisabled={
							amount === 0 || amountToCompare === amount || amount < 0
						}
					>
						{amountToCompare === amount
							? translate('typeAnotherAmount')
							: translate('calculate')}
					</Button>
				</Flex>
			</Flex>
		</OffsetShadow>
	);
};

export default FeeCalculator;
