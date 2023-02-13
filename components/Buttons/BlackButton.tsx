import { Button, ButtonProps } from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import { useSession } from 'next-auth/react';
import React from 'react';

interface IBlackButton extends ButtonProps {
	children?: React.ReactNode | string;
}

export const BlackButton: React.FC<IBlackButton> = ({
	children,
	disabled,
	...rest
}) => {
	const theme = usePicasso();
	const { data: session } = useSession();
	return (
		<Button
			bg={theme.bg.primary}
			color="white"
			h="max-content"
			_hover={{ opacity: '80%' }}
			disabled={!session || disabled}
			_active={{}}
			_focus={{}}
			{...rest}
		>
			{children}
		</Button>
	);
};

export default BlackButton;
