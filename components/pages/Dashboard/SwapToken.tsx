/* eslint-disable react/no-children-prop */
import {
	Button,
	Flex,
	Icon,
	Input,
	InputGroup,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Text,
	useDisclosure,
} from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import Link from 'next/link';
import React from 'react';
import { BsArrowDownUp } from 'react-icons/bs';
import { BiChevronDown } from 'react-icons/bi';
import useTranslation from 'next-translate/useTranslation';
import { OffsetShadow, WaitingForConfirmation } from 'components';

export const SwapToken = () => {
	const theme = usePicasso();
	const isConnected = true;
	const { t: translate } = useTranslation('swap-token');
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<Flex
			w="full"
			h="max-content"
			py="6"
			bg="black"
			borderRadius="base"
			direction="column"
			align="center"
			gap="4"
		>
			<WaitingForConfirmation isOpen={isOpen} onClose={onClose} />
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
			<Flex direction="column" align="center" gap="6" w="max-content" px="6">
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
							disabled={!isConnected}
							_hover={{ focus: 'none' }}
						/>
						<Flex>
							<Menu>
								<MenuButton
									as={Button}
									rightIcon={<BiChevronDown />}
									bg="none"
									color="white"
									_hover={{ bg: 'none' }}
									w="full"
								>
									Select
								</MenuButton>
								<MenuList>
									<MenuItem>Bitícu</MenuItem>
								</MenuList>
							</Menu>
						</Flex>
					</InputGroup>
				</Flex>
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
							placeholder="0"
							disabled={!isConnected}
							_hover={{ focus: 'none' }}
						/>
						<Flex>
							<Menu>
								<MenuButton
									as={Button}
									rightIcon={<BiChevronDown />}
									bg="none"
									color="white"
									_hover={{ bg: 'none' }}
									w="full"
								>
									Select
								</MenuButton>
								<MenuList>
									<MenuItem>Bitícu</MenuItem>
								</MenuList>
							</Menu>
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
						Rate
					</Text>
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
					<OffsetShadow
						borderColor="white"
						position="absolute"
						buttonText="Swap"
						top="1.5"
						left="1.5"
						px="32"
					>
						<Button
							position="relative"
							disabled={!isConnected}
							w="full"
							h="full"
							py="2"
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
