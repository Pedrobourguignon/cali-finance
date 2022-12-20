/* eslint-disable react/no-children-prop */
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
import {
	OffsetShadow,
	WaitingConfirmation,
	PaidTokenSelector,
	ReceivedTokenSelector,
} from 'components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { swapTokensSchema } from 'utils';

interface ISwapTokens {
	youPay: string;
	youReceive: string;
	paidToken: string;
	receivedToken: string;
}

export const SwapToken = () => {
	const { swapTokenSelector } = useTokens();
	const [swapTokensData, setSwapTokensData] = useState<ISwapTokens>({
		youPay: '',
		youReceive: '',
		paidToken: swapTokenSelector.paidToken,
		receivedToken: swapTokenSelector.receivedToken,
	} as ISwapTokens);
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
		formState: { errors },
	} = useForm<ISwapTokens>({
		resolver: yupResolver(swapTokensSchema),
	});

	const handleSwapTokens = (swapTransaction: ISwapTokens) => {
		setSwapTokensData({
			youPay: swapTransaction.youPay,
			youReceive: swapTransaction.youReceive,
			paidToken: swapTokenSelector.paidToken,
			receivedToken: swapTokenSelector.receivedToken,
		});
		console.log(swapTokensData);
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
					<PaidTokenSelector
						isOpen={isOpenPaidTokenSelector}
						onClose={onClosePaidTokenSelector}
					/>
					<ReceivedTokenSelector
						isOpen={isOpenReceivedTokenSelector}
						onClose={onCloseReceivedTokenSelector}
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
									onChange={youPay =>
										setSwapTokensData(prevState => ({
											...prevState,
											youPay: youPay.target.value,
											youReceive: youPay.target.value,
										}))
									}
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
										<Img src={swapTokenSelector.paidTokenIcon} boxSize="5" />
										{swapTokenSelector.paidToken === 'Select'
											? swapTokenSelector.paidToken
											: swapTokenSelector.paidToken.toUpperCase()}
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
									value={swapTokensData.youPay}
									placeholder="0"
									disabled={!isConnected}
									_hover={{ focus: 'none' }}
									type="number"
									// onChange={youReceive =>
									// 	setSwapTokensData(prevState => ({
									// 		...prevState,
									// 		youReceive: youReceive.target.value,
									// 	}))
									// }
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
										<Img
											src={swapTokenSelector.receivedTokenIcon}
											boxSize="5"
										/>
										{swapTokenSelector.receivedToken === 'Select'
											? swapTokenSelector.receivedToken
											: swapTokenSelector.receivedToken.toUpperCase()}
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
								disabled={
									swapTokensData.youPay === '' ||
									swapTokenSelector.paidToken === 'Select' ||
									swapTokenSelector.receivedToken === 'Select'
								}
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
