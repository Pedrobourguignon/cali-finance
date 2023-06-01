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
	WithdrawContent,
	OffsetShadow,
	TokenSelector,
	WithdrawButton,
} from 'components';
import { usePicasso } from 'hooks';
import useTranslation from 'next-translate/useTranslation';
import { IBasicModal, ISelectedCoin } from 'types';
import { useState } from 'react';
import {
	GetUserCompaniesRes,
	ICompany,
} from 'types/interfaces/main-server/ICompany';

interface IWithdrawModal extends IBasicModal {
	userCompanies: ICompany[];
	company: GetUserCompaniesRes;
}

export const WithdrawModal: React.FC<IWithdrawModal> = ({
	isOpen,
	onClose,
	userCompanies,
	company,
}) => {
	const theme = usePicasso();
	const [token, setToken] = useState<ISelectedCoin>({
		logo: 'https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png?1547033579',
		symbol: 'BTC',
	} as ISelectedCoin);
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
				<OffsetShadow width="100%" top="0.5rem" left="0.5rem">
					<Flex
						borderRadius="base"
						borderWidth="0.1rem"
						borderColor={theme.bg.primary}
						direction="column"
						bg="white"
						h="100%"
						w="100%"
					>
						<TokenSelector
							isOpen={isOpenSelector}
							onClose={onCloseSelector}
							setToken={setToken}
						/>
						<ModalHeader color={theme.text.black2}>
							{translate('withdraw')}
						</ModalHeader>
						<ModalCloseButton color="gray.400" />
						<ModalBody>
							<WithdrawContent
								coin={token}
								onOpen={onOpenSelector}
								userCompanies={userCompanies}
								company={company}
							/>
						</ModalBody>

						<ModalFooter>
							<WithdrawButton onClose={onClose} />
						</ModalFooter>
					</Flex>
				</OffsetShadow>
			</ModalContent>
		</Modal>
	);
};
export default WithdrawModal;
