import { Modal, ModalOverlay, ModalContent } from '@chakra-ui/react';
import React from 'react';

interface IMobileModalLayout {
	children: React.ReactNode;
	isOpen: boolean;
	onClose: () => void;
}

export const MobileModalLayout: React.FC<IMobileModalLayout> = ({
	children,
	isOpen,
	onClose,
}) => (
	<Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInBottom">
		<ModalOverlay />
		<ModalContent
			borderTopRadius="2xl"
			bg="white"
			borderBottomRadius="none"
			position="fixed"
			bottom="0"
			mb="0"
		>
			{children}
		</ModalContent>
	</Modal>
);

export default MobileModalLayout;
