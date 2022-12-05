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
		<Flex
			bg="white"
			w="full"
			h="95vh"
			m="auto"
			borderLeft="0.25rem solid"
			borderColor={theme.branding.blue}
			borderLeftRadius="sm"
			gap="4"
			direction="column"
		>
			<ImageUploaderModal isOpen={isOpen} onClose={onClose} />
			<Flex>
				<Text
					fontSize="xl"
					color={theme.text.primary}
					lineHeight="tall"
					fontWeight="500"
					pl="7"
					pt="6"
				>
					{translate('editProfile')}
				</Text>
			</Flex>
			<Flex justify="center" pt="7" direction="column" align="center" gap="5">
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
			<Flex
				bg={theme.bg.dashboard}
				h="full"
				direction="column"
				align="center"
				bgImage="/images/calipattern.png"
				bgRepeat="no-repeat"
				bgPosition="right bottom"
			>
				<EditProfileForm />
			</Flex>
		</Flex>
	);
};

export default EditProfileComponent;
