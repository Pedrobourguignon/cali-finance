/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Button, Flex, useDisclosure } from '@chakra-ui/react';
import { ImageUploaderModal } from 'components';
import { usePicasso } from 'hooks';
import { useSession } from 'next-auth/react';
import useTranslation from 'next-translate/useTranslation';

interface IImageUploader {
	sendImage: (picture: string) => void;
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
}) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const theme = usePicasso();
	const { t: translate } = useTranslation('create-company');
	const { data: session } = useSession();

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
				isOpen={isOpen}
				onClose={onClose}
				sendImage={sendImage}
			/>
		</Flex>
	);
};
