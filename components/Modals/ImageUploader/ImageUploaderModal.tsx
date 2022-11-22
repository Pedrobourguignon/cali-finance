import {
	Button,
	Flex,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
} from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import { IBasicModal } from 'types';
import { DragDrop } from 'components';

export const ImageUploaderModal: React.FC<IBasicModal> = ({
	isOpen,
	onClose,
}) => {
	const theme = usePicasso();

	return (
		<Modal isOpen={isOpen} onClose={onClose} size="sm">
			<ModalOverlay />
			<ModalContent
				m="auto"
				zIndex="1"
				bg="white"
				borderWidth="1px"
				borderStyle="solid"
				borderColor="black"
			>
				<Flex
					direction="column"
					w="full"
					bg={theme.bg.modal}
					borderRadius="base"
				>
					<ModalHeader display="flex">
						<Text color={theme.text.primary}>
							Drag and drop to upload image
						</Text>
						<ModalCloseButton color="gray.400" py="6" />
					</ModalHeader>
					<ModalBody
						display="flex"
						flexDirection="column"
						gap="6"
						alignItems="center"
					>
						<Flex w="100%">
							<Text fontSize="xs" color={theme.text.primary}>
								Your file must be no more than 5MB
							</Text>
						</Flex>
						<Flex w="100%" justify="center">
							<DragDrop />
						</Flex>
					</ModalBody>
				</Flex>
				<ModalFooter display="flex" justifyContent="space-between">
					<Button
						onClick={onClose}
						borderRadius="base"
						color="black"
						borderColor="black"
						borderWidth="0.1rem"
						px="12"
					>
						Cancel
					</Button>

					<Button
						bg="black"
						px="8"
						borderRadius="base"
						_hover={{ opacity: '0.75' }}
					>
						Upload File
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};
