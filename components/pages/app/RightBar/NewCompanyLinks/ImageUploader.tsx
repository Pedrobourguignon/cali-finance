/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Button, Flex, useDisclosure } from '@chakra-ui/react';
import { ImageUploaderModal } from 'components';
import { useAuth, usePicasso } from 'hooks';

import useTranslation from 'next-translate/useTranslation';
import { Dispatch, SetStateAction } from 'react';

interface IImageUploader {
	sendImage: (picture: string) => void;
	openImageUploaderModal: boolean;
	setOpenImageUploaderModal: Dispatch<SetStateAction<boolean>>;
	newCompanyPicture?: string;
	editedCompanyPicture?: string;
	displayedEditedPicture?: string;
	handleNewPicture?: (picture: string) => void;
	handleEditedPicture?: (picture: string) => void;
}

export const ImageUploader: React.FC<IImageUploader> = ({
	sendImage,
	newCompanyPicture,
	handleNewPicture,
	handleEditedPicture,
	editedCompanyPicture,
	displayedEditedPicture,
	openImageUploaderModal,
	setOpenImageUploaderModal,
}) => {
	const { onOpen, onClose } = useDisclosure();
	const theme = usePicasso();
	const { t: translate } = useTranslation('create-company');
	const { session } = useAuth();

	return (
		<Flex w="full" justify="space-evenly">
			<Button
				_active={{}}
				_focus={{}}
				onClick={onOpen}
				borderRadius="base"
				bg={theme.bg.primary}
				fontSize="xs"
				fontWeight="medium"
				px="3"
				h="6"
				disabled={!session}
			>
				{translate('editLogoImage')}
			</Button>
			{newCompanyPicture && (
				<Button
					onClick={() => handleNewPicture!('')}
					borderRadius="base"
					bg={theme.bg.primary}
					fontSize="xs"
					fontWeight="medium"
					px="3"
					h="6"
					disabled={!session}
				>
					{translate('deleteImage')}
				</Button>
			)}
			{(editedCompanyPicture || displayedEditedPicture) && (
				<Button
					onClick={() => handleEditedPicture!('')}
					borderRadius="base"
					bg={theme.bg.primary}
					fontSize="xs"
					fontWeight="medium"
					px="3"
					h="6"
					disabled={!session}
				>
					{translate('deleteImage')}
				</Button>
			)}
			<ImageUploaderModal
				openImageUploaderModal={openImageUploaderModal}
				isOpen={openImageUploaderModal}
				setOpenImageUploaderModal={setOpenImageUploaderModal}
				onClose={onClose}
				sendImage={sendImage}
			/>
		</Flex>
	);
};
