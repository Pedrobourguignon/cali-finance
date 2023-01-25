import { Flex, FlexProps, Img } from '@chakra-ui/react';
import { usePicasso } from 'hooks';

interface IInfos extends FlexProps {
	children: React.ReactNode;
}

export const InfosBanner: React.FC<IInfos> = ({
	children,
	position,
	...props
}) => {
	const theme = usePicasso();
	return (
		<Flex>
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

				<Flex bottom="0" position={position} w="full">
					<Img src="/images/ondulate-background.png" w="full" />
				</Flex>
				<Flex position="absolute" bottom="0" w="full">
					<Img src="/images/illustration.png" w={{ xl: '90%' }} />
				</Flex>
			</Flex>
		</Flex>
	);
};
