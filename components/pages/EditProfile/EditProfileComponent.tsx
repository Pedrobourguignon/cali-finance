import { Avatar, Button, Flex, Text, useDisclosure } from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import React from 'react';

import useTranslation from 'next-translate/useTranslation';
import { ImageUploaderModal } from 'components';
import { EditProfileForm } from './EditProfileForm';

export const EditProfileComponent = () => {
	const theme = usePicasso();
	const { t: translate } = useTranslation('edit-profile');
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<>
			<ImageUploaderModal isOpen={isOpen} onClose={onClose} />
			<Flex bg="white">
				<Text
					fontSize="xl"
					color={theme.text.primary}
					lineHeight="tall"
					fontWeight="medium"
					pl="7"
					pt="6"
				>
					{translate('editProfile')}
				</Text>
			</Flex>
			<Flex
				justify="center"
				pt="7"
				direction="column"
				align="center"
				gap="5"
				bg="white"
				pb="3"
			>
				<Avatar src="https://bit.ly/broken-link" boxSize="24" />
				<Button
					fontSize="sm"
					bg={theme.text.primary}
					borderRadius="sm"
					px="2"
					h="max-content"
					py="1"
					_hover={{}}
					_focus={{ bg: theme.text.primary }}
					onClick={onOpen}
				>
					{translate('editProfileImage')}
				</Button>
			</Flex>
			<Flex h="full" direction="column" align="center">
				<EditProfileForm />
			</Flex>
		</>
	);
};

export default EditProfileComponent;
