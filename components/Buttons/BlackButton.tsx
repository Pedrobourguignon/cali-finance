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
	display,
	fontWeight,
	type,
	borderRadius,
	mb,
	minW,
	onClick,
	whiteSpace,
}) => {
	const theme = usePicasso();
	const { isConnected } = useProfile();
	return (
		<Button
			minW={minW}
			onClick={onClick}
			color="white"
			type={type}
			h="max-content"
			bg={theme.bg.primary}
			borderRadius={borderRadius}
			fontWeight={fontWeight}
			fontSize={fontSize}
			display={display}
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
