import { Flex, FlexProps } from '@chakra-ui/react';
import React from 'react';

interface IOffsetShadow extends FlexProps {
	children: JSX.Element;
}

export const OffsetShadow: React.FC<IOffsetShadow> = ({
	width,
	height,
	borderColor = 'black',
	children,
	top,
	left,
	borderRadius = 'base',
}) => (
	<Flex
		w={width}
		height={height}
		position="relative"
		borderRadius={borderRadius}
	>
		<Flex
			boxSize="full"
			top={top}
			left={left}
			zIndex="0"
			position="absolute"
			border="1px solid"
			borderColor={borderColor}
			borderRadius="inherit"
		/>
		<Flex zIndex="1" position="absolute" boxSize="full">
			{children}
		</Flex>
	</Flex>
);

export default OffsetShadow;
