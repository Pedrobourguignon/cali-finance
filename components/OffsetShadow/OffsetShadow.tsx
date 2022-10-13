import { Flex } from '@chakra-ui/react';
import React from 'react';

interface IOffsetShadow {
	width: string;
	height: string;
	top: string;
	left: string;
	borderColor: string;
	children: JSX.Element;
}

export const OffsetShadow: React.FC<IOffsetShadow> = ({
	width,
	height,
	borderColor,
	children,
	top,
	left,
}) => (
	<Flex w={width} height={height} position="relative" borderRadius="base">
		<Flex
			boxSize="full"
			top={top}
			left={left}
			zIndex="0"
			position="absolute"
			border="2px solid"
			borderColor={borderColor}
			borderRadius="inherit"
		/>
		<Flex zIndex="1" position="absolute" boxSize="full">
			{children}
		</Flex>
	</Flex>
);

export default OffsetShadow;
