import { Flex, FlexProps, Img } from '@chakra-ui/react';
import { usePicasso } from 'hooks';

interface IInfos extends FlexProps {
	children: React.ReactNode;
	imgLink: string;
}

export const InfosBanner: React.FC<IInfos> = ({
	children,
	imgLink,
	bottom,
	position,
	...props
}) => {
	const theme = usePicasso();
	return (
		<Flex
			bg={theme.bg.black}
			direction="column"
			position="relative"
			borderRadius="base"
			h="max-content"
			{...props}
			w="100%"
		>
			{children}

			<Img
				position="absolute"
				bottom="0"
				src="/images/illustration.png"
				w="full"
				zIndex="docked"
			/>
			<Flex bottom={bottom} position={position} w="full">
				<Img src={imgLink} w="full" />
			</Flex>
		</Flex>
	);
};
