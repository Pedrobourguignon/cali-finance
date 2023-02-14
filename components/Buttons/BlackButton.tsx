import { Button, ButtonProps } from '@chakra-ui/react';
import { usePicasso, useProfile } from 'hooks';
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
	const { isConnected } = useProfile();
	return (
		<Button
			bg={theme.bg.primary}
			color="white"
			h="max-content"
			_hover={{ opacity: '80%' }}
			disabled={!isConnected || disabled}
			_active={{}}
			_focus={{}}
			{...rest}
		>
			{children}
		</Button>
	);
};

export default BlackButton;
