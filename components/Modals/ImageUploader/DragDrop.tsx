import { Flex, Img, Text } from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import React, { useCallback, useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';

const fileTypes = ['JPG', 'PNG', 'SVG', 'JPEG'];

interface IFile extends Blob {
	name: string;
	size: number;
	type: string;
}

export const DragDrop = () => {
	const theme = usePicasso();
	const [sizeIsValid, setSizeIsValid] = useState(true);
	const [fileLink, setFileLink] = useState('/images/add-image.png');

	const loadFile = useCallback((file: IFile) => {
		const newFile = new FileReader();
		const size = file?.size;
		const fileData = file?.name.split('.');
		const ext = fileData?.[fileData.length - 1];
		if (!size || size > 5000000) {
			setSizeIsValid(false);
			return;
		}
		setSizeIsValid(true);
		newFile.readAsDataURL(file);

		newFile.onload = event => {
			const base64File = {
				file: event.target?.result,
				extensao: ext,
			};
			// eslint-disable-next-line no-unused-expressions
			base64File.file
				? setFileLink(base64File.file.toString())
				: setFileLink('/images/add-image.png');
		};
	}, []);

	return (
		<Flex direction="column" align="center" gap="4">
			<FileUploader
				// eslint-disable-next-line react/no-children-prop
				children={<Img boxSize="40" src={fileLink} />}
				handleChange={loadFile}
				name="file"
				types={fileTypes}
			/>
			{sizeIsValid ? (
				''
			) : (
				<Flex bg="red.100" w="100%" py="2" pl="2.5" borderRadius="base">
					<Text color={theme.text.primary} fontWeight="semibold" fontSize="sm">
						The file is too large.
						<Text as="span" fontWeight="normal">
							Please upload another image up to 5mb.
						</Text>
					</Text>
				</Flex>
			)}
		</Flex>
	);
};
