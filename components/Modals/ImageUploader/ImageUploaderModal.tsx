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
import { BlackButton, DragDrop } from 'components';
import { useState } from 'react';
import useTranslation from 'next-translate/useTranslation';

interface IImageUploader extends IBasicModal {
	sendImage: React.Dispatch<React.SetStateAction<any>>;
}

export const ImageUploaderModal: React.FC<IImageUploader> = ({
	isOpen,
	onClose,
	sendImage,
}) => {
	const theme = usePicasso();
	const [picture, setPicture] = useState('');
	const { t: translate } = useTranslation('edit-profile');

	const handleUploadFile = () => {
		sendImage(picture);
		onClose();
	};

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
						<Text color={theme.text.primary}>{translate('dragAndDrop')}</Text>
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
								{translate('yourFileNoMustBe')} 5MB
							</Text>
						</Flex>
						<Flex w="100%" justify="center">
							<DragDrop setPicture={setPicture} />
						</Flex>
					</ModalBody>
				</Flex>
				<ModalFooter display="flex" justifyContent="space-between">
					<Button
						onClick={onClose}
						borderRadius="sm"
						color="black"
						borderColor="black"
						borderWidth="0.1rem"
						w="9.5rem"
					>
						{translate('cancel')}
					</Button>
					<BlackButton
						w="9.5rem"
						py="2.5"
						onClick={handleUploadFile}
						borderRadius="sm"
					>
						{translate('uploadFile')}
					</BlackButton>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};
