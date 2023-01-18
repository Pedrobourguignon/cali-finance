import { Button, Flex, useDisclosure } from '@chakra-ui/react';
import { ImageUploaderModal } from 'components';
import { useOrganizations, usePicasso } from 'hooks';

export const ImageUploader = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const theme = usePicasso();
	const { setSelectedOrganizationLogo } = useOrganizations();

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
				Edit logo image
			</Button>
			<ImageUploaderModal
				isOpen={isOpen}
				onClose={onClose}
				sendImage={setSelectedOrganizationLogo}
			/>
		</Flex>
	);
};
