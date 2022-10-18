import {
	Button,
	Flex,
	Icon,
	Select,
	Text,
	useDisclosure,
} from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import Link from 'next/link';
import React from 'react';
import { BsArrowDownUp } from 'react-icons/bs';
import useTranslation from 'next-translate/useTranslation';
import { OffsetShadow, WaitingForConfirmation } from 'components';

export const SwapToken = () => {
	const theme = usePicasso();
	const isLogged = false;
	const { t: translate } = useTranslation('swap-token');
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<Flex
			w="72"
			bg="black"
			mt="6"
			ml="4"
			borderRadius="base"
			direction="column"
		>
			<WaitingForConfirmation isOpen={isOpen} onClose={onClose} />
			<Flex gap="3" mt="5" ml="7" align="center">
				<Icon as={BsArrowDownUp} color="white" boxSize="5" />
				<Text
					color="white"
					fontStyle="normal"
					fontWeight="medium"
					fontSize="xl"
					lineHeight="7"
				>
					{translate('title')}
				</Text>
			</Flex>
			<Flex direction="column" align="center" gap="6" mt="7" mb="10">
				<Flex direction="column" gap="2">
					<Text color="white" fontSize="sm">
						{translate('youPay')}
					</Text>
					<Select
						disabled={isLogged}
						placeholder="0"
						_placeholder={{ color: 'whiteAlpha.500' }}
						w="60"
						color="white"
						alignContent="flex-end"
						border="none"
					>
						<option value="option1">Option 1</option>
					</Select>
				</Flex>
				<Flex direction="column" gap="2">
					<Text color="white" fontSize="sm">
						{translate('youReceive')}
					</Text>
					<Select
						disabled={isLogged}
						placeholder="0"
						_placeholder={{ color: 'whiteAlpha.500' }}
						w="60"
						color="white"
						border="none"
					>
						<option value="option3">Option 1</option>
					</Select>
				</Flex>
			</Flex>
			<Flex color="white" direction="column" w="60" h="32">
				<Flex align="center" justify="space-between" ml="10">
					<Text
						fontStyle="normal"
						fontSize="xs"
						color="whiteAlpha.600"
						textAlign="justify"
					>
						Rate
					</Text>
					<Text>-</Text>
				</Flex>
				<Flex align="center" justify="space-between" ml="10">
					<Text fontStyle="normal" fontSize="xs" color="whiteAlpha.600">
						Slippage tolerance
					</Text>
					<Text>-</Text>
				</Flex>
				<Flex align="center" justify="space-between" ml="10">
					<Text fontStyle="normal" fontSize="xs" color="whiteAlpha.600">
						Estimated fees
					</Text>
					<Text>-</Text>
				</Flex>
				<Flex align="center" justify="space-between" ml="10">
					<Text fontStyle="normal" fontSize="xs" color="whiteAlpha.600">
						Price impact
					</Text>
					<Text>-</Text>
				</Flex>
			</Flex>
			<Link href="/app/dashboard">
				<Flex justify="center">
					<OffsetShadow
						width="60"
						height="8"
						borderColor="white"
						top="2"
						left="1"
					>
						<Button
							disabled={isLogged}
							w="full"
							h="full"
							fontSize="sm"
							color="black"
							borderRadius="base"
							bg="white"
							_hover={{ background: 'white' }}
							_focus={{ background: 'white' }}
							_active={{
								background: 'white',
								transform: 'translateY(6px) translateX(5px)',
							}}
							onClick={onOpen}
						>
							{translate('swap')}
						</Button>
					</OffsetShadow>
				</Flex>
			</Link>
		</Flex>
	);
};

export default SwapToken;
