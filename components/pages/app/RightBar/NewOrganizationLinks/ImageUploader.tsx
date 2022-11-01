import { Button, Flex, useDisclosure } from '@chakra-ui/react';
import { ImageUploaderModal } from 'components';

export const ImageUploader = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<Flex>
			<Button
				onClick={onOpen}
				borderRadius="base"
				bg="black"
				fontSize="xs"
				fontWeight="medium"
				px="3"
				h="6"
			>
				Edit logo image
			</Button>
			<ImageUploaderModal isOpen={isOpen} onClose={onClose} />
		</Flex>
	);
};
