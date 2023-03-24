import { Flex, Icon, Text } from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import React, { useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { GrDocumentUpload } from 'react-icons/gr';
import { IUploadedFile } from 'types';

const fileTypes = ['CSV'];

interface IFileDrag extends Blob {
	name: string;
	size: number;
	type: string;
}

interface IDragAndDrop {
	setUploadedFileData: React.Dispatch<React.SetStateAction<IUploadedFile>>;
}

export const DragAndDrop: React.FC<IDragAndDrop> = ({
	setUploadedFileData,
}) => {
	const theme = usePicasso();
	const [sizeIsValid, setSizeIsValid] = useState(true);

	const loadFile = (file: IFileDrag) => {
		const newFile = new FileReader();
		const size = file?.size;
		if (!size || size > 5000000) {
			setSizeIsValid(false);
			return;
		}
		const fileData = file?.name.split('.');
		const ext = fileData?.[fileData.length - 1];
		setSizeIsValid(true);
		newFile.readAsDataURL(file);

		newFile.onload = event => {
			const base64File = {
				file: event.target?.result,
				ext,
			};
			setUploadedFileData(base64File);
		};
	};

	return (
		<Flex direction="column" align="center" gap="4">
			<FileUploader handleChange={loadFile} name="file" types={fileTypes}>
				<Flex
					cursor="pointer"
					borderRadius="base"
					p="14"
					border="1px solid"
					borderColor="blackAlpha.200"
					bg="gray.100"
				>
					<Icon as={GrDocumentUpload} boxSize="10" />
				</Flex>
			</FileUploader>
			{!sizeIsValid && (
				<Flex bg="red.100" w="100%" py="2" pl="2.5" borderRadius="base">
					<Text color={theme.text.primary} fontWeight="semibold" fontSize="sm">
						The file is too large.
						<Text as="span" fontWeight="normal" ml="2">
							Please upload another image up to 5mb.
						</Text>
					</Text>
				</Flex>
			)}
		</Flex>
	);
};
