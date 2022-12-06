import { Button, Flex, Icon, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { BsArrowUp } from 'react-icons/bs';
import { DragAndDrop } from 'components';
import { IUploadedFile } from 'types';

export const UploadCsv = () => {
	const [fileData] = useState();
	const [uploadedFileData, setUploadedFileData] = useState<IUploadedFile>(
		{} as IUploadedFile
	);

	return (
		<Flex direction="column" align="center" w="full">
			<Text color="#121212" fontSize="sm" pb="5">
				Drag &apos;n&apos; drop your .csv or Select and upload your .csv file.
			</Text>
			<DragAndDrop setUploadedFileData={setUploadedFileData} />

			<Flex py="6" direction="column" align="center" gap="4" px="6">
				<Button
					type="submit"
					w="full"
					gap="2.5"
					bg="#121212"
					color="white"
					borderRadius="sm"
					fontSize="md"
					fontWeight="500"
					_hover={{}}
					_active={{}}
					_focus={{}}
					py="2"
					disabled={uploadedFileData.ext !== 'csv'}
				>
					<Icon as={BsArrowUp} />
					Load CSV list
				</Button>
				<Text fontSize="sm" color="#121212">
					{fileData}
				</Text>
				<Text color="gray.500" fontSize="xs" textAlign="center">
					By adding this wallet address to your organization you accept the{' '}
					<Text as="u" fontWeight="semibold">
						Terms and Conditions.
					</Text>
				</Text>
			</Flex>
		</Flex>
	);
};

export default UploadCsv;
