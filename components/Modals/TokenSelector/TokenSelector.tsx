import {
	Button,
	Flex,
	Icon,
	Input,
	InputGroup,
	InputLeftElement,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
} from '@chakra-ui/react';
import { usePicasso, useTokens } from 'hooks';
import { IBasicModal } from 'types';
import { TokenOptions } from 'components';
import { IoIosSearch, IoMdArrowDown } from 'react-icons/io';
import { useCallback } from 'react';

export const TokenSelector: React.FC<IBasicModal> = ({ isOpen, onClose }) => {
	const theme = usePicasso();
	const {
		setFilteredTokens,
		filteredTokens,
		handleSearchToken,
		listOfTokens,
		setChosenToken,
	} = useTokens();

	const handleOnClose = useCallback(() => {
		setFilteredTokens(listOfTokens);
		onClose();
	}, [listOfTokens]);

	const handleOnClick = (name: string, logoURI: string) => {
		const chosedToken = {
			symbol: name,
			logo: logoURI,
		};
		setChosenToken(chosedToken);
		handleOnClose();
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent
				bg="white"
				borderColor={theme.bg.primary}
				borderRadius="base"
				borderWidth="0.1rem"
			>
				<ModalHeader color={theme.bg.primary}>Select a coin</ModalHeader>
				<Flex w="100%" justify="center" px="6">
					<InputGroup>
						<InputLeftElement>
							<Icon as={IoIosSearch} boxSize="5" color="gray.500" />
						</InputLeftElement>
						<Input
							color="gray.500"
							borderColor="gray.300"
							borderRadius="full"
							onChange={event =>
								handleSearchToken(event.target.value, listOfTokens)
							}
							_placeholder={{ color: 'gray.500' }}
							placeholder="Search name "
							w="100%"
						/>
					</InputGroup>
				</Flex>
				<ModalCloseButton color={theme.text.gray} />
				<ModalBody>
					<Flex align="center" gap="2">
						<Text color={theme.bg.primary}>Token name</Text>
						<Icon boxSize="5" color={theme.branding.blue} as={IoMdArrowDown} />
					</Flex>
					<Flex
						direction="column"
						h="xl"
						overflow="auto"
						gap="2"
						sx={{
							'&::-webkit-scrollbar': {
								width: '2',
								borderRadius: 'md',
								backgroundColor: 'blackAlpha.50',
							},
							'&::-webkit-scrollbar-thumb': {
								backgroundColor: 'blackAlpha.200',
								height: '20',
								borderRadius: 'md',
							},
							px: '1',
						}}
					>
						{filteredTokens.map((token, index) => (
							<TokenOptions
								key={+index}
								token={token}
								onClick={() =>
									handleOnClick(token.symbol.toLowerCase(), token.logoURI)
								}
							/>
						))}
					</Flex>
				</ModalBody>
				<ModalFooter>
					<Button
						color="black"
						w="100%"
						borderColor="gray.300"
						borderWidth="0.1rem"
						borderRadius="none"
					>
						Save Changes
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};
