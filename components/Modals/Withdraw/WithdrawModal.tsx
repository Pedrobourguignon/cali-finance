import {
	Flex,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
} from '@chakra-ui/react';
import { WithdrawButton, WithdrawContent, OffsetShadow } from 'components';
import { usePicasso } from 'hooks';
import { IBasicModal } from 'types';

export const WithdrawModal: React.FC<IBasicModal> = ({ isOpen, onClose }) => {
	const theme = usePicasso();
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
						<ModalHeader color={theme.text.black2}>Withdraw</ModalHeader>
						<ModalCloseButton color="gray.400" />
						<ModalBody>{/* <WithdrawContent /> */}</ModalBody>

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
