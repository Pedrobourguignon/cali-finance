import { Flex, Icon, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { BsArrowUp } from 'react-icons/bs';
import { BlackButton, DragAndDropCsv } from 'components';
import { useCompanies, usePicasso, useToasty } from 'hooks';
import useTranslation from 'next-translate/useTranslation';
import { useMutation, useQueryClient } from 'react-query';
import { AxiosError } from 'axios';

export const UploadCsv = () => {
	const { t: translate } = useTranslation('create-team');
	const theme = usePicasso();
	const [fileData] = useState();
	const [uploadedFileData, setUploadedFileData] = useState<
		string | undefined | null | ArrayBuffer
	>('');
	const { toast } = useToasty();
	const { addEmployeeCsv } = useCompanies();
	const queryClient = useQueryClient();

	const { mutate, error } = useMutation(
		(employee: string | undefined | null | ArrayBuffer) =>
			addEmployeeCsv(employee),
		{
			onSuccess: () =>
				queryClient.invalidateQueries({ queryKey: ['all-company-employees'] }),
		}
	);

	const handleUploadCsv = () => {
		mutate(uploadedFileData);
	};

	useEffect(() => {
		if (error instanceof AxiosError) {
			// eslint-disable-next-line array-callback-return
			error.response?.data.errors.map((item: string | string[]) => {
				if (item.includes('Error adding user undefined')) {
					toast({
						title: 'Error',
						description: 'Csv content different from the default',
						status: 'error',
					});
					setUploadedFileData('');
					return;
				}
				if (item.includes('Error adding user')) {
					toast({
						title: 'Error',
						description: 'User already exists in this company',
						status: 'error',
					});
					setUploadedFileData('');
				}
			});
		}
	}, [error]);

	return (
		<Flex direction="column" w="full">
			<Text color={theme.text.primary} fontSize="sm" pb="5" px="6">
				{translate('yourCsvMustHave')}
			</Text>
			<DragAndDropCsv setUploadedFileData={setUploadedFileData} />

			<Flex py="6" direction="column" align="center" gap="4" px="6">
				<BlackButton
					py="2.5"
					gap="2.5"
					width="full"
					borderRadius="sm"
					onClick={handleUploadCsv}
					isDisabled={!uploadedFileData}
				>
					<Icon as={BsArrowUp} />
					{translate('loadCsv')}
				</BlackButton>
				<Text fontSize="sm" bg="red" color={theme.text.primary}>
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
