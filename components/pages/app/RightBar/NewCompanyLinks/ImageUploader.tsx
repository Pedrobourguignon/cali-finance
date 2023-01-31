import { Button, Flex, useDisclosure } from '@chakra-ui/react';
import { ImageUploaderModal } from 'components';
import { useCompanies, usePicasso } from 'hooks';
import useTranslation from 'next-translate/useTranslation';

export const ImageUploader = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const theme = usePicasso();
	const { t: translate } = useTranslation('create-company');
	const { setSelectedCompanyLogo } = useCompanies();

	return (
		<Flex>
			<Button
				onClick={onOpen}
				borderRadius="base"
				bg={theme.bg.primary}
				fontSize="xs"
				fontWeight="medium"
				px="3"
				h="6"
			>
				{translate('editLogoImage')}
			</Button>
			<ImageUploaderModal
				isOpen={isOpen}
				onClose={onClose}
				sendImage={setSelectedCompanyLogo}
			/>
		</Flex>
	);
};
