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
			{...props}
			w="100%"
		>
			{children}
			<Flex position="absolute" bottom="0" w="full" zIndex="docked">
				<Img src="/images/illustration.png" w="full" />
			</Flex>

			<Flex bottom={bottom} position={position} w="full">
				<Img src={imgLink} w="full" />
			</Flex>
		</Flex>
	);
};
