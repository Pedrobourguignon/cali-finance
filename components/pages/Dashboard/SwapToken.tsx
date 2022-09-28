import { Button, Flex, Icon, Select, Text } from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import Link from 'next/link';
import React from 'react';
import { BsArrowDownUp } from 'react-icons/bs';
import useTranslation from 'next-translate/useTranslation';

export const SwapToken = () => {
	const theme = usePicasso();
	const { t: translate } = useTranslation('swap-token');

	return (
		<Flex
			w="72"
			h={theme.cardHeight.swap}
			bg="black"
			mt="6"
			ml="4"
			borderRadius="base"
			direction="column"
		>
			<Flex gap="3" mt="5" ml="7" align="center">
				<Icon as={BsArrowDownUp} color="white" boxSize="5" />
				<Text
					color="white"
					fontStyle="normal"
					fontWeight="500"
					fontSize="20px"
					lineHeight="28px"
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
						disabled
						placeholder="0"
						_placeholder={{ color: 'whiteAlpha.500' }}
						w="60"
						color="white"
						alignContent="flex-end"
						bg={theme.bg.select}
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
						disabled
						placeholder="0"
						_placeholder={{ color: 'whiteAlpha.500' }}
						w="60"
						color="white"
						bg={theme.bg.select}
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
						fontWeight="400"
						fontSize="xs"
						lineHeight="16px"
						color="whiteAlpha.600"
						textAlign="justify"
					>
						Rate
					</Text>
					<Text>-</Text>
				</Flex>
				<Flex align="center" justify="space-between" ml="10">
					<Text
						fontStyle="normal"
						fontWeight="400"
						fontSize="xs"
						lineHeight="16px"
						color="whiteAlpha.600"
					>
						Slippage tolerance
					</Text>
					<Text>-</Text>
				</Flex>
				<Flex align="center" justify="space-between" ml="10">
					<Text
						fontStyle="normal"
						fontWeight="400"
						fontSize="xs"
						lineHeight="16px"
						color="whiteAlpha.600"
					>
						Estimated fees
					</Text>
					<Text>-</Text>
				</Flex>
				<Flex align="center" justify="space-between" ml="10">
					<Text
						fontStyle="normal"
						fontWeight="400"
						fontSize="xs"
						lineHeight="16px"
						color="whiteAlpha.600"
					>
						Price impact
					</Text>
					<Text>-</Text>
				</Flex>
			</Flex>
			<Link href="/app/dashboard">
				<Flex justify="center">
					<Flex
						position="absolute"
						display=" block"
						w="60"
						p="4"
						border="1px solid white"
						borderRadius="base"
					/>
					<Button
						disabled
						w="60"
						h="8"
						fontSize="sm"
						color="black"
						borderRadius="base"
						display=" block"
						m="-5px 0px -10px -10px"
						bg="white"
						_hover={{ background: 'white' }}
						_focus={{ background: 'white' }}
						_active={{
							background: 'white',
							transform: 'translateY(6px) translateX(5px)',
						}}
					>
						{translate('swap')}
					</Button>
				</Flex>
			</Link>
		</Flex>
	);
};

export default SwapToken;
