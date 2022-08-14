import { usePicasso } from 'hooks';
import { Button, ButtonProps } from '@chakra-ui/react';
import React from 'react';

interface IPrimaryButton extends ButtonProps {
	children: React.ReactNode;
}

export const PrimaryButton: React.FC<IPrimaryButton> = ({
	children,
	...props
}) => {
	const theme = usePicasso();
	return (
		<Button
			borderRadius="none"
			w="2xs"
			h="16"
			variant="outline"
			borderColor={theme.branding.red}
			fontSize="3xl"
			boxShadow={theme.shadow.red}
			_hover={{
				opacity: 0.6,
			}}
			_active={{
				opacity: 0.4,
			}}
			_focus={{
				opacity: 0.4,
			}}
			{...props}
		>
			{children}
		</Button>
	);
};

export default PrimaryButton;
