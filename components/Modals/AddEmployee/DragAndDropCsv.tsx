import { Flex, Icon, Text } from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import React, { useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { GrDocumentUpload } from 'react-icons/gr';

const fileTypes = ['CSV'];

interface IFileDrag extends Blob {
	name: string;
	size: number;
	type: string;
}

interface IDragAndDrop {
	setUploadedFileData: React.Dispatch<
		React.SetStateAction<string | undefined | null | ArrayBuffer>
	>;
}

export const DragAndDropCsv: React.FC<IDragAndDrop> = ({
	setUploadedFileData,
}) => {
	const theme = usePicasso();
	const [sizeIsValid, setSizeIsValid] = useState(true);

	const loadFile = (file: IFileDrag) => {
		const newFile = new FileReader();
		newFile.readAsText(file);
		if (file) {
			newFile.onload = event => {
				setUploadedFileData(event.target?.result);
			};
		}
	};

	return (
		<Flex direction="column" align="center" gap="4">
			<FileUploader
				handleChange={loadFile}
				name="file"
				types={fileTypes}
				onChange={(event: { target: { file: IFileDrag } }) =>
					loadFile(event.target.file)
				}
			>
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
