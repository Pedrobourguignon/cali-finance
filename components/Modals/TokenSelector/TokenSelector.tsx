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
import { IBasicModal, ISelectedCoin, IToken } from 'types';
import { TokenOptions } from 'components';
import { IoIosSearch, IoMdArrowDown } from 'react-icons/io';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import useTranslation from 'next-translate/useTranslation';

interface ITokenSelector extends IBasicModal {
	setToken: React.Dispatch<React.SetStateAction<ISelectedCoin>>;
}

export const TokenSelector: React.FC<ITokenSelector> = ({
	isOpen,
	onClose,
	setToken,
}) => {
	const theme = usePicasso();
	const { t: translate } = useTranslation('swap-token');
	const { setFilteredTokens, filteredTokens, handleSearchToken, listOfTokens } =
		useTokens();

	const perPage = 20;
	const [lastObjectPosition, setLastObjectPosition] = useState(perPage);
	const [loadedTokens, setLoadedTokens] = useState<IToken[]>([]);

	useEffect(() => {
		setLoadedTokens(filteredTokens.slice(0, perPage));
	}, [filteredTokens]);

	const handleOnClose = () => {
		setFilteredTokens(listOfTokens);
		setLoadedTokens(filteredTokens.slice(0, perPage));
		onClose();
	};

	const handleOnClick = (name: string, logoURI: string) => {
		const chosedToken = {
			symbol: name,
			logo: logoURI,
		};
		setToken(chosedToken);
		handleOnClose();
	};

	const loadMoreTokens = () => {
		setLoadedTokens(prevState =>
			prevState.concat(
				filteredTokens.slice(lastObjectPosition, lastObjectPosition + perPage)
			)
		);
		setLastObjectPosition(lastObjectPosition + perPage);
	};

	return (
		<Modal isOpen={isOpen} onClose={handleOnClose} size="xs">
			<ModalOverlay />
			<ModalContent
				bg="white"
				borderColor={theme.bg.primary}
				borderRadius="base"
				borderWidth="0.1rem"
			>
				<ModalHeader color={theme.bg.primary}>
					{translate('selectACoin')}
				</ModalHeader>
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
							placeholder={translate('searchName')}
							w="100%"
						/>
					</InputGroup>
				</Flex>
				<ModalCloseButton color={theme.text.gray} />
				<ModalBody>
					<Flex align="center" gap="2">
						<Text color={theme.bg.primary}>{translate('tokenName')}</Text>
						<Icon boxSize="5" color={theme.branding.blue} as={IoMdArrowDown} />
					</Flex>
					<Flex
						direction="column"
						id="scrollableDiv"
						h="xs"
						overflowX="hidden"
						overflowY="auto"
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
						{filteredTokens?.map((token, index) => (
							<TokenOptions
								key={+index}
								token={token}
								onClick={() =>
									handleOnClick(token.symbol.toLowerCase(), token.logoURI)
								}
							/>
						))}
						<InfiniteScroll
							dataLength={loadedTokens.length}
							next={() => loadMoreTokens()}
							hasMore={lastObjectPosition < listOfTokens.length}
							loader={<h4>{translate('loading')}...</h4>}
							scrollableTarget="scrollableDiv"
						>
							{loadedTokens.map((token, index) => (
								<TokenOptions
									key={+index}
									token={token}
									onClick={() =>
										handleOnClick(token.symbol.toLowerCase(), token.logoURI)
									}
								/>
							))}
						</InfiniteScroll>
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
						{translate('saveChanges')}
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};
