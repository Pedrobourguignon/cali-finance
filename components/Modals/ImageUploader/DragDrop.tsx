import { Flex, Img, Text } from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import useTranslation from 'next-translate/useTranslation';
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
	blockSvg: boolean;
	setBlockSvg: Dispatch<SetStateAction<boolean>>;
}

export const DragDrop: React.FC<IDragDrop> = ({
	setPicture,
	blockSvg,
	setBlockSvg,
}) => {
	const theme = usePicasso();
	const [sizeIsValid, setSizeIsValid] = useState(true);
	const [fileLink, setFileLink] = useState('/images/add-image.png');
	const { t: translate } = useTranslation('edit-profile');

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
			const fileContent = newFile.result as string;
			setBlockSvg(fileContent.substring(11, 14) === 'svg');
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
				<Img boxSize="40" objectFit="contain" src={fileLink} cursor="pointer" />
			</FileUploader>
			{!sizeIsValid && (
				<Flex bg="red.100" w="100%" py="2" pl="2.5" borderRadius="base">
					<Text color={theme.text.primary} fontWeight="semibold" fontSize="sm">
						{translate('theFileIsTooLarge')}
						<Text as="span" fontWeight="normal" ml="2">
							{translate('pleaseUploadAnother')} 5mb.
						</Text>
					</Text>
				</Flex>
			)}
			{blockSvg && (
				<Flex bg="red.100" w="100%" py="2" pl="2.5" borderRadius="base">
					<Text color={theme.text.primary} fontWeight="semibold" fontSize="sm">
						{translate('dontAcceptSvg')}
					</Text>
				</Flex>
			)}
		</Flex>
	);
};
