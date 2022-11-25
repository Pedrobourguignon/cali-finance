import { Flex, Icon, Img, Text } from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import React, { useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { GrDocumentUpload } from 'react-icons/gr';

const fileTypes = ['CSV'];

interface IFile extends Blob {
	name: string;
	size: number;
	type: string;
}

export const DragAndDrop = () => {
	const theme = usePicasso();
	const [sizeIsValid, setSizeIsValid] = useState(true);
	const [uploadedFileData, setUploadedFileData] = useState<string[]>();

	const loadFile = (file: IFile) => {
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
		setUploadedFileData(fileData);

		// newFile.onload = event => {
		// 	const base64File = {
		// 		file: event.target?.result,
		// 		ext,
		// 	};
		// 	if (base64File.file) {
		// 		setFileLink(base64File.file.toString());
		// 	} else {
		// 		setFileLink('/images/add-image.png');
		// 	}
		// };
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
					bg="gray.50"
				>
					<Icon as={GrDocumentUpload} boxSize="10" />
				</Flex>
			</FileUploader>
			<Text color="#121212">{uploadedFileData}</Text>
			{sizeIsValid ? (
				''
			) : (
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
