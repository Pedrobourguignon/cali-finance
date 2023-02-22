import { Button } from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import { signOut } from 'next-auth/react';

export const LogoutButton = () => {
	const theme = usePicasso();
	const { t: translate } = useTranslation('dashboard');
	return (
		<Button
			bg="white"
			fontSize="sm"
			color={theme.text.primary}
			boxSize="max-content"
			borderTopRadius="none"
			borderTop="1px solid black"
			py="3"
			w="full"
			_hover={{ opacity: '80%' }}
			_active={{}}
			_focus={{}}
			onClick={() => signOut()}
		>
			{translate('logOut')}
		</Button>
	);
};

export default LogoutButton;
