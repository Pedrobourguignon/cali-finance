import {
	Button,
	Flex,
	ModalBody,
	ModalCloseButton,
	ModalFooter,
	ModalHeader,
	Text,
} from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import { IBasicModal } from 'types';
import { BlackButton, DragDrop } from 'components';
import { useState } from 'react';
import { MobileModalLayout } from 'layouts';
import useTranslation from 'next-translate/useTranslation';

interface IImageUploader extends IBasicModal {
	sendImage: React.Dispatch<React.SetStateAction<any>>;
}

export const ImageUploaderModalMobile: React.FC<IImageUploader> = ({
	isOpen,
	onClose,
	sendImage,
}) => {
	const theme = usePicasso();
	const [picture, setPicture] = useState('');
	const { t: translate } = useTranslation('create-company');

	const handleUploadFile = () => {
		sendImage(picture);
		onClose();
	};

	return (
		<MobileModalLayout isOpen={isOpen} onClose={onClose}>
			<Flex
				direction="column"
				w="full"
				bg={theme.bg.modal}
				borderRadius="inherit"
			>
				<ModalHeader display="flex">
					<Text
						color={theme.text.primary}
						display={{ base: 'none', sm: 'flex' }}
					>
						{translate('dragAndDrop')}
					</Text>
					<Text
						color={theme.text.primary}
						display={{ base: 'flex', sm: 'none' }}
					>
						{translate('uploadImage')}
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
							{translate('yourFileMustBe')}
						</Text>
					</Flex>
					<Flex w="100%" justify="center">
						<DragDrop setPicture={setPicture} />
					</Flex>
				</ModalBody>
			</Flex>
			<ModalFooter display="flex" justifyContent="space-between" pb="14">
				<Button
					onClick={onClose}
					borderRadius="sm"
					color="black"
					borderColor="black"
					borderWidth="0.1rem"
					px="12"
				>
					Cancel
				</Button>
				<BlackButton
					px="8"
					py="2.5"
					onClick={handleUploadFile}
					borderRadius="sm"
				>
					{translate('uploadFile')}
				</BlackButton>
			</ModalFooter>
		</MobileModalLayout>
	);
};
