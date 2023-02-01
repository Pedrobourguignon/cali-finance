import { Flex, FlexProps } from '@chakra-ui/react';
import React from 'react';

interface IOffsetShadow extends FlexProps {
	children: JSX.Element | JSX.Element[];
	buttonText?: string;
}

export const OffsetShadow: React.FC<IOffsetShadow> = ({
	borderColor = 'black',
	width = 'max-content',
	height = 'max-content',
	bg = 'none',
	children,
	top,
	left,
	borderRadius = 'base',
	buttonText = '',
	display,
	px,
}) => (
	<Flex
		width={width}
		height={height}
		position="relative"
		borderRadius={borderRadius}
	>
		<Flex px={px} py="1" color="transparent">
			{buttonText}
		</Flex>
		<Flex
			bg={bg}
			boxSize="full"
			top={top}
			left={left}
			zIndex="0"
			position="absolute"
			border="1px solid"
			borderColor={borderColor}
			borderRadius="inherit"
			display={display}
		/>
		<Flex zIndex="1" position="absolute" boxSize="full">
			{children}
		</Flex>
	</Flex>
);

export default OffsetShadow;
