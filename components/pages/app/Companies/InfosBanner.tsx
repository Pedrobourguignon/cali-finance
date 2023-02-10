import { Flex, FlexProps, Img } from '@chakra-ui/react';
import { usePicasso } from 'hooks';

interface IInfos extends FlexProps {
	children: React.ReactNode;
	ondulatedImg: string;
	ilustrationImg: string;
}

export const InfosBanner: React.FC<IInfos> = ({
	children,
	ondulatedImg,
	ilustrationImg,
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
			<Flex h="100%" w="100%" />
			<Flex position="absolute" bottom="0" w="full" zIndex="docked">
				<Img src={ilustrationImg} w="full" />
			</Flex>

			<Flex w="full">
				<Img src={ondulatedImg} w="full" />
			</Flex>
		</Flex>
	);
};
