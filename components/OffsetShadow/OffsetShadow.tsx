import { Flex, FlexProps } from '@chakra-ui/react';
import React from 'react';

interface IOffsetShadow extends FlexProps {
	children: JSX.Element | JSX.Element[];
}

export const OffsetShadow: React.FC<IOffsetShadow> = ({
	borderColor = 'black',
	width = 'max-content',
	height = 'max-content',
	bg = 'none',
	children,
	top = '0rem',
	left = '0rem',
	borderRadius = 'base',
	display,
}) => (
	<Flex
		position="relative"
		borderRadius={borderRadius}
		width={width}
		height={height}
	>
		<Flex
			position="absolute"
			left={left}
			bg={bg}
			top={`calc(${top} - 1px)`}
			zIndex="0"
			border="1px solid"
			borderColor={borderColor}
			borderRadius="inherit"
			display={display}
			w="full"
			px="0"
			py="0"
		>
			<Flex opacity="0">{children}</Flex>
		</Flex>
		<Flex
			bg={bg}
			zIndex="0"
			borderRadius="inherit"
			display={display}
			w="full"
			px="0"
			py="0"
		>
			{children}
		</Flex>
	</Flex>
);

export default OffsetShadow;
