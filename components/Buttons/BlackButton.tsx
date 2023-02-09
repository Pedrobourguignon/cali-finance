import { Button, ButtonProps } from '@chakra-ui/react';
import { usePicasso, useProfile } from 'hooks';
import React from 'react';

interface IBlackButton extends ButtonProps {
	children?: React.ReactNode | string;
}

export const BlackButton: React.FC<IBlackButton> = ({
	children,
	disabled,
	fontSize,
	gap,
	py,
	px,
	width,
	fontWeight,
	type,
	borderRadius,
	mb,
	onClick,
	whiteSpace,
}) => {
	const theme = usePicasso();
	const { isConnected } = useProfile();
	return (
		<Button
			onClick={onClick}
			color="white"
			type={type}
			h="max-content"
			bg={theme.bg.primary}
			borderRadius={borderRadius}
			fontWeight={fontWeight}
			fontSize={fontSize}
			gap={gap}
			width={width}
			py={py}
			px={px}
			mb={mb}
			whiteSpace={whiteSpace}
			disabled={!isConnected || disabled}
			_hover={{ opacity: '80%' }}
			_active={{}}
			_focus={{}}
		>
			{children}
		</Button>
	);
};

export default BlackButton;
