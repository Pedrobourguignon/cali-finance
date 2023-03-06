import { Button, Flex, useDisclosure } from '@chakra-ui/react';
import { ImageUploaderModal } from 'components';
import { CompaniesProvider } from 'contexts';
import { useCompanies, usePicasso } from 'hooks';
import { useSession } from 'next-auth/react';
import useTranslation from 'next-translate/useTranslation';

export const ImageUploader = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const theme = usePicasso();
	const { t: translate } = useTranslation('create-company');
	const { setSelectedCompanyLogo, setCreatedCompanyPicture } = useCompanies();
	const { data: session } = useSession();

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
				disabled={!session}
			>
				{translate('editLogoImage')}
			</Button>
			<ImageUploaderModal
				isOpen={isOpen}
				onClose={onClose}
				sendImage={setCreatedCompanyPicture}
			/>
		</Flex>
	);
};
