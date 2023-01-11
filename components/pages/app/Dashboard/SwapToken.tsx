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
import { usePicasso, useTokens } from 'hooks';
import React, { useState } from 'react';

import { BsArrowDownUp } from 'react-icons/bs';
import { BiChevronDown } from 'react-icons/bi';
import useTranslation from 'next-translate/useTranslation';
import { OffsetShadow, WaitingConfirmation, TokenSelector } from 'components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { swapTokensSchema } from 'utils';
import { ISelectedCoin } from 'types';

interface ISwapTokens {
	youPay: string;
	youReceive: string;
	paidToken: string;
	receivedToken: string;
}

export const SwapToken = () => {
	const { setSwapTokenSelector, swapTokenSelector } = useTokens();

	const [receivedData, setReceivedData] = useState<ISelectedCoin>(
		{} as ISelectedCoin
	);
	const [paidData, setPaidData] = useState<ISelectedCoin>({} as ISelectedCoin);
	const theme = usePicasso();
	const isConnected = true;
	const { t: translate } = useTranslation('swap-token');
	const { isOpen, onOpen, onClose } = useDisclosure();
	const {
		isOpen: isOpenPaidTokenSelector,
		onOpen: onOpenPaidTokenSelector,
		onClose: onClosePaidTokenSelector,
	} = useDisclosure();
	const {
		isOpen: isOpenReceivedTokenSelector,
		onOpen: onOpenReceivedTokenSelector,
		onClose: onCloseReceivedTokenSelector,
	} = useDisclosure();

	const {
		register,
		handleSubmit,
		formState: { errors, isDirty },
	} = useForm<ISwapTokens>({
		resolver: yupResolver(swapTokensSchema),
	});

	const handleSwapTokens = (swapTransaction: ISwapTokens) => {
		setSwapTokenSelector({
			paidAmount: swapTransaction.youPay,
			receivedAmount: swapTransaction.youReceive,
			paidToken: paidData.symbol,
			receivedToken: receivedData.symbol,
		});
	};

	return (
		<form onSubmit={handleSubmit(handleSwapTokens)}>
			<FormControl>
				<Flex
					w="full"
					h="max-content"
					py="6"
					bg={theme.bg.primary}
					borderRadius="base"
					direction="column"
					align="center"
					gap="4"
				>
					<WaitingConfirmation isOpen={isOpen} onClose={onClose} />

					<TokenSelector
						onClose={onClosePaidTokenSelector}
						isOpen={isOpenPaidTokenSelector}
						setToken={setPaidData}
					/>
					<TokenSelector
						onClose={onCloseReceivedTokenSelector}
						isOpen={isOpenReceivedTokenSelector}
						setToken={setReceivedData}
					/>
					<Flex gap="3" align="center" w="full" px="6">
						<Icon as={BsArrowDownUp} color="white" boxSize="5" />
						<Text
							color="white"
							fontStyle="normal"
							fontWeight="500"
							fontSize="lg"
							lineHeight="tall"
						>
							{translate('title')}
						</Text>
					</Flex>
					<Flex
						direction="column"
						align="center"
						gap="6"
						w="max-content"
						px="6"
					>
						<Flex direction="column" gap="2" w="full">
							<Text color="white" fontSize="sm">
								{translate('youPay')}
							</Text>
							<InputGroup
								bg={theme.bg.select}
								border="none"
								borderColor="transparent"
								borderRadius="base"
							>
								<Input
									placeholder="0"
									type="number"
									disabled={!isConnected}
									_hover={{ focus: 'none' }}
									{...register('youPay')}
								/>
								<Flex>
									<Input
										type="button"
										border="none"
										as={Button}
										rightIcon={<BiChevronDown />}
										bg="none"
										color="white"
										_hover={{ bg: 'none' }}
										w="full"
										onClick={onOpenPaidTokenSelector}
										gap="2"
									>
										{paidData.logo && <Img src={paidData.logo} boxSize="5" />}
										{!paidData.symbol ? 'Select' : paidData.symbol}
									</Input>
								</Flex>
							</InputGroup>
						</Flex>
						<Text fontSize="xs" color="red" position="absolute">
							{errors.youPay?.message}
						</Text>
						<Flex direction="column" gap="2" w="full">
							<Text color="white" fontSize="sm">
								{translate('youReceive')}
							</Text>
							<InputGroup
								bg={theme.bg.select}
								border="none"
								borderColor="transparent"
								borderRadius="base"
							>
								<Input
									{...register('youReceive')}
									placeholder="0"
									disabled={!isConnected}
									_hover={{ focus: 'none' }}
									type="number"
								/>
								<Flex>
									<Input
										as={Button}
										type="button"
										border="none"
										rightIcon={<BiChevronDown />}
										bg="none"
										color="white"
										_hover={{ bg: 'none' }}
										w="full"
										onClick={onOpenReceivedTokenSelector}
										gap="2"
									>
										{receivedData.logo && (
											<Img src={receivedData.logo} boxSize="5" />
										)}
										{!receivedData.symbol ? 'Select' : receivedData.symbol}
									</Input>
								</Flex>
							</InputGroup>
						</Flex>
					</Flex>
					<Flex
						color="white"
						direction="column"
						h="max-content"
						w="full"
						px="12"
						py="4"
					>
						<Flex align="center" justify="space-between">
							<Text fontStyle="normal" fontSize="xs" color="whiteAlpha.600">
								{translate('rate')}
							</Text>
							<Text>-</Text>
						</Flex>
						<Flex align="center" justify="space-between">
							<Text fontStyle="normal" fontSize="xs" color="whiteAlpha.600">
								{translate('slippageTolerance')}
							</Text>

							<Text>-</Text>
						</Flex>
						<Flex align="center" justify="space-between">
							<Text fontStyle="normal" fontSize="xs" color="whiteAlpha.600">
								{translate('estimatedFees')}
							</Text>
							<Text>-</Text>
						</Flex>
						<Flex align="center" justify="space-between">
							<Text fontStyle="normal" fontSize="xs" color="whiteAlpha.600">
								{translate('priceImpact')}
							</Text>
							<Text>-</Text>
						</Flex>
					</Flex>
					<Flex justify="center">
						<OffsetShadow
							borderColor="white"
							position="absolute"
							buttonText={translate('swap')}
							top="0.375rem"
							left="0.375rem"
							px="32"
						>
							<Button
								position="relative"
								type="submit"
								disabled={!isDirty || !paidData.symbol || !receivedData.symbol}
								_disabled={{
									color: 'black',
									bg: '#EDF2F7',
									cursor: 'not-allowed',
									opacity: '80%',
								}}
								w="full"
								h="full"
								py="2"
								fontSize="md"
								color="black"
								borderRadius="base"
								bg="white"
								_hover={{ background: 'white' }}
								_focus={{ background: 'white' }}
								_active={{
									background: 'white',
									transform: 'translateY(0.375rem) translateX(0.375rem)',
								}}
								onClick={onOpen}
							>
								{translate('swap')}
							</Button>
						</OffsetShadow>
					</Flex>
				</Flex>
			</FormControl>
		</form>
	);
};

export default SwapToken;
