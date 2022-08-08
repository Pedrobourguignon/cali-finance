import { Flex } from '@chakra-ui/react'

interface IBall {
	background: string
	left: string
	bottom: string
	right: string
	top: string
}

export const Ball: React.FC<IBall> = ({
	background,
	left,
	bottom,
	right,
	top,
}) => (
	<Flex
		id="ball1"
		background={background}
		filter="blur(300px)"
		position="absolute"
		zIndex="hide"
		w="3xl"
		h="3xl"
		left={left}
		right={right}
		bottom={bottom}
		top={top}
	/>
)
