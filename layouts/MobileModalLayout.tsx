import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	Text,
} from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import React from 'react';

interface IMobileModalLayout {
	children: React.ReactNode;
	isOpen: boolean;
	modalName: string;
	onClose: () => void;
}

export const MobileModalLayout: React.FC<IMobileModalLayout> = ({
	children,
	isOpen,
	onClose,
	modalName,
}) => {
	const theme = usePicasso();
	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			size="sm"
			motionPreset="slideInBottom"
		>
			<ModalOverlay />
			<ModalContent
				borderTopRadius="2xl"
				bg="white"
				borderBottomRadius="none"
				position="fixed"
				bottom="0"
				mb="0"
			>
				<ModalHeader borderTopRadius="2xl" alignItems="center">
					<Text color={theme.text.primary} fontSize="lg" fontWeight="medium">
						{modalName}
					</Text>
					<ModalCloseButton color="gray.400" pt="2" />
				</ModalHeader>
				{children}
			</ModalContent>
		</Modal>
	);
};

export default MobileModalLayout;
