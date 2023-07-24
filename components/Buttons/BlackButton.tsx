import { Button, ButtonProps } from '@chakra-ui/react';
import { useAuth, usePicasso } from 'hooks';
import React from 'react';

interface IBlackButton extends ButtonProps {
	children?: React.ReactNode | string;
}

export const BlackButton: React.FC<IBlackButton> = ({
	children,
	disabled,
	isDisabled,
	...rest
}) => {
	const theme = usePicasso();
	const { session } = useAuth();
	return (
		<Button
			bg={theme.bg.primary}
			color="white"
			h="max-content"
			_hover={{ opacity: '80%' }}
			disabled={!session || disabled}
			isDisabled={!session || isDisabled}
			_active={{}}
			_focus={{}}
			_disabled={{ opacity: '50%', cursor: 'not-allowed' }}
			{...rest}
		>
			{children}
		</Button>
	);
};

export default BlackButton;
