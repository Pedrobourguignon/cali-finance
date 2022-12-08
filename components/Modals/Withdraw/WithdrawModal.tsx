import {
	Flex,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	useDisclosure,
} from '@chakra-ui/react';
import {
	WithdrawButton,
	WithdrawContent,
	OffsetShadow,
	TokenSelector,
} from 'components';
import { usePicasso } from 'hooks';
import useTranslation from 'next-translate/useTranslation';
import { IBasicModal, ISelectedCoin } from 'types';

const selectedCoin: ISelectedCoin = {
	logo: 'https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png?1547033579',
	symbol: 'BTC',
};

export const WithdrawModal: React.FC<IBasicModal> = ({ isOpen, onClose }) => {
	const theme = usePicasso();
	const { t: translate } = useTranslation('dashboard');
	const {
		isOpen: isOpenSelector,
		onOpen: onOpenSelector,
		onClose: onCloseSelector,
	} = useDisclosure();

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<OffsetShadow width="100%" height="56" top="2" left="2">
					<Flex
						borderRadius="base"
						borderWidth="0.1rem"
						borderColor={theme.bg.primary}
						direction="column"
						bg="white"
						h="100%"
						w="100%"
					>
						<TokenSelector isOpen={isOpenSelector} onClose={onCloseSelector} />
						<ModalHeader color={theme.text.black2}>
							{translate('withdraw')}
						</ModalHeader>
						<ModalCloseButton color="gray.400" />
						<ModalBody>
							<WithdrawContent coin={selectedCoin} onOpen={onOpenSelector} />
						</ModalBody>

						<ModalFooter>
							<WithdrawButton />
						</ModalFooter>
					</Flex>
				</OffsetShadow>
			</ModalContent>
		</Modal>
	);
};
export default WithdrawModal;
