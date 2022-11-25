import { Button, Flex, FormControl, Icon, Input, Text } from '@chakra-ui/react';
import { GrDocumentUpload } from 'react-icons/gr';
import React, { useRef, useState } from 'react';
import { BsArrowUp } from 'react-icons/bs';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { uploadCsvSchema } from 'utils';
import { DragAndDrop } from 'components';

export const UploadCsv = () => {
	// const inputRef = useRef<HTMLInputElement | null>(null);
	const [fileData, setFileData] = useState();
	const [fileType, setFileType] = useState('text/csv');

	// const handleClick = () => {
	// 	inputRef.current.click();
	// };

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(uploadCsvSchema),
	});

	const handleUploadCsv = (csvFile: any) => {
		console.log(csvFile);
	};

	return (
		<form onSubmit={handleSubmit(handleUploadCsv)}>
			<FormControl>
				<Flex direction="column" align="center" w="full">
					<Text color="#121212" fontSize="sm" pb="5">
						Drag &apos;n&apos; drop your .csv or Select and upload your .csv
						file.
					</Text>
					{/* <Button
						_hover={{}}
						_active={{}}
						_focus={{}}
						borderRadius="base"
						px="14"
						py="20"
						border="1px solid"
						borderColor="blackAlpha.200"
						bg="gray.50"
						// onClick={handleClick}
					>
						<Icon as={GrDocumentUpload} boxSize="10" />
						<Input type="file" display="none" ref={inputRef} />
					</Button> */}
					<DragAndDrop />
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
							disabled={fileType !== 'text/csv'}
						>
							<Icon as={BsArrowUp} />
							Load CSV list
						</Button>
						<Text fontSize="sm" color="#121212">
							{fileData}
						</Text>
						<Text color="gray.500" fontSize="xs" textAlign="center">
							By adding this wallet address to your organization you accept the
							Terms and Conditions.
						</Text>
					</Flex>
				</Flex>
			</FormControl>
		</form>
	);
};

export default UploadCsv;
