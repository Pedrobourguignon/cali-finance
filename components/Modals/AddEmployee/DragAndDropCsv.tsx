import { Flex, Icon, Img, Text } from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import React, { useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { GrDocumentUpload } from 'react-icons/gr';
import { SiGooglesheets } from 'react-icons/si';

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
	const [csvName, setCsvName] = useState('');

	const loadFile = (file: IFileDrag) => {
		setCsvName(file.name);
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
					p="12"
					border="1px solid"
					borderColor="blackAlpha.200"
					bg="gray.50"
					boxSize="40"
					align="center"
					justify="center"
				>
					{csvName ? (
						<Flex direction="column" align="center" justify="center" gap="2">
							<Img src="/images/Sheets.svg" boxSize="10" />
							<Text
								w="28"
								color={theme.text.primary}
								overflow="clip"
								fontSize="xs"
							>
								{csvName}
							</Text>
						</Flex>
					) : (
						<Icon as={GrDocumentUpload} boxSize="10" />
					)}
				</Flex>
			</FileUploader>
		</Flex>
	);
};
