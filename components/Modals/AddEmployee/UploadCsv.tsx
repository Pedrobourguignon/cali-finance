import { Button, Flex, Icon, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { BsArrowUp } from 'react-icons/bs';
import { BlackButton, DragAndDrop } from 'components';
import { IUploadedFile } from 'types';
import { usePicasso } from 'hooks';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';

export const UploadCsv = () => {
	const { t: translate } = useTranslation('create-team');
	const { locale } = useRouter();
	const theme = usePicasso();
	const [fileData] = useState();
	const [uploadedFileData, setUploadedFileData] = useState<IUploadedFile>(
		{} as IUploadedFile
	);

	return (
		<Flex direction="column" w="full">
			<Text
				color={theme.text.primary}
				fontSize="sm"
				pb="5"
				px="4"
				textAlign="center"
			>
				{translate('dragAndDrop')}
			</Text>
			<DragAndDrop setUploadedFileData={setUploadedFileData} />

			<Flex py="6" direction="column" align="center" gap="4" px="6">
				<BlackButton
					py="2.5"
					gap="2.5"
					width="full"
					borderRadius="sm"
					disabled={uploadedFileData.ext !== 'csv'}
				>
					<Icon as={BsArrowUp} />
					{translate('loadCsv')}
				</BlackButton>
				<Text fontSize="sm" color={theme.text.primary}>
					{fileData}
				</Text>
				<Text color="gray.500" fontSize="xs" textAlign="center">
					{translate('byAdding')}
					<Text as="u" fontWeight="semibold">
						{translate('termsAndConditions')}
					</Text>
				</Text>
			</Flex>
		</Flex>
	);
};

export default UploadCsv;
