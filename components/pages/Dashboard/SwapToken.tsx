/* eslint-disable react/no-children-prop */
import {
	Button,
	Flex,
	Icon,
	Input,
	InputGroup,
	InputRightElement,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Text,
} from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import Link from 'next/link';
import React from 'react';
import { BsArrowDownUp } from 'react-icons/bs';
import { BiChevronDown } from 'react-icons/bi';
import useTranslation from 'next-translate/useTranslation';

export const SwapToken = () => {
	const theme = usePicasso();
	const { t: translate } = useTranslation('swap-token');

	return (
		<Flex
			w="72"
			h="max-content"
			py="6"
			bg="black"
			borderRadius="base"
			direction="column"
			align="center"
			gap="4"
		>
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
			<Flex direction="column" align="center" gap="6" w="max-content">
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
						<Input placeholder="0" disabled />
						<InputRightElement
							children={
								<Flex>
									<Menu>
										<MenuButton
											as={Button}
											rightIcon={<BiChevronDown />}
											bg="none"
											color="white"
											disabled
											_hover={{ bg: 'none' }}
										>
											Select
										</MenuButton>
										<MenuList>
											<MenuItem>Bitícu</MenuItem>
										</MenuList>
									</Menu>
								</Flex>
							}
							w="max-content"
						/>
					</InputGroup>
				</Flex>
				<Flex direction="column" gap="2">
					<Text color="white" fontSize="sm">
						{translate('youReceive')}
					</Text>
					<InputGroup
						bg={theme.bg.select}
						border="none"
						borderColor="transparent"
						borderRadius="base"
					>
						<Input placeholder="0" disabled />
						<InputRightElement
							children={
								<Flex>
									<Menu>
										<MenuButton
											as={Button}
											rightIcon={<BiChevronDown />}
											bg="none"
											color="white"
											disabled
											_hover={{ bg: 'none' }}
										>
											Select
										</MenuButton>
										<MenuList>
											<MenuItem>Bitícu</MenuItem>
										</MenuList>
									</Menu>
								</Flex>
							}
							w="max-content"
						/>
					</InputGroup>
				</Flex>
			</Flex>
			<Flex
				color="white"
				direction="column"
				h="max-content"
				w="max-content"
				py="4"
			>
				<Flex align="center" justify="space-between">
					<Text fontStyle="normal" fontSize="xs" color="whiteAlpha.600">
						Rate
					</Text>
					<Flex px="20" />
					<Text>-</Text>
				</Flex>
				<Flex align="center" justify="space-between">
					<Text fontStyle="normal" fontSize="xs" color="whiteAlpha.600">
						Slippage tolerance
					</Text>

					<Text>-</Text>
				</Flex>
				<Flex align="center" justify="space-between">
					<Text fontStyle="normal" fontSize="xs" color="whiteAlpha.600">
						Estimated fees
					</Text>
					<Text>-</Text>
				</Flex>
				<Flex align="center" justify="space-between">
					<Text fontStyle="normal" fontSize="xs" color="whiteAlpha.600">
						Price impact
					</Text>
					<Text>-</Text>
				</Flex>
			</Flex>
			<Link href="/app/dashboard">
				<Flex justify="center">
					<Button
						disabled
						w="max-content"
						h="max-content"
						py="2"
						px="24"
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
					>
						{translate('swap')}
					</Button>
				</Flex>
			</Link>
		</Flex>
	);
};

export default SwapToken;
