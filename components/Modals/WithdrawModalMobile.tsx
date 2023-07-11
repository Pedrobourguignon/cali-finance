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
import { MobileModalLayout } from 'layouts';

interface IWithdrawModal extends IBasicModal {
	userCompanies: ICompany[];
	company: GetUserCompaniesRes;
	employeeBalance: number;
}

export const WithdrawModalMobile: React.FC<IWithdrawModal> = ({
	isOpen,
	onClose,
	userCompanies,
	company,
	employeeBalance,
}) => {
	const theme = usePicasso();
	const { t: translate } = useTranslation('dashboard');
	const {
		isOpen: isOpenSelector,
		onOpen: onOpenSelector,
		onClose: onCloseSelector,
	} = useDisclosure();

	return (
		<MobileModalLayout isOpen={isOpen} onClose={onClose}>
			<Flex
				borderTopRadius="2xl"
				borderWidth="0.1rem"
				borderColor={theme.bg.primary}
				direction="column"
				bg="white"
				h="100%"
				w="100%"
			>
				<ModalHeader color={theme.text.black2}>
					{translate('withdraw')}
				</ModalHeader>
				<ModalCloseButton color="gray.400" />
				<ModalBody py="0">
					<WithdrawContent
						employeeBalance={employeeBalance}
						onOpen={onOpenSelector}
						userCompanies={userCompanies}
						company={company}
					/>
				</ModalBody>
				<ModalFooter py="6">
					<WithdrawButton onClose={onClose} company={company} />
				</ModalFooter>
			</Flex>
		</MobileModalLayout>
	);
};
export default WithdrawModalMobile;
