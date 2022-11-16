import { Flex } from '@chakra-ui/react';
import { Sidebar, EditProfileComponent } from 'components';
import { usePicasso } from 'hooks';
import React from 'react';

export const EditProfileContainer = () => {
	const theme = usePicasso();
	return (
		<Flex bg={theme.bg.primary}>
			<Sidebar />
			<EditProfileComponent />
		</Flex>
	);
};

export default EditProfileContainer;
