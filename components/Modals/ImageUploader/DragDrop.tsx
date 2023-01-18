import { Flex, Img, Text } from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';

const fileTypes = ['JPG', 'PNG', 'SVG', 'JPEG'];

interface IFile extends Blob {
	name: string;
	size: number;
	type: string;
}

interface IDragDrop {
	setPicture: Dispatch<SetStateAction<string>>;
}

export const DragDrop: React.FC<IDragDrop> = ({ setPicture }) => {
	const theme = usePicasso();
	const [sizeIsValid, setSizeIsValid] = useState(true);
	const [fileLink, setFileLink] = useState('/images/add-image.png');

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

		newFile.onload = event => {
			const base64File = {
				file: event.target?.result,
				ext,
			};
			if (base64File.file) {
				setFileLink(base64File.file.toString());
				setPicture(base64File.file.toString());
			} else {
				setFileLink('/images/add-image.png');
			}
		};
	};

	return (
		<Flex direction="column" align="center" gap="4">
			<FileUploader handleChange={loadFile} name="file" types={fileTypes}>
				<Img boxSize="40" objectFit="contain" src={fileLink} />
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
