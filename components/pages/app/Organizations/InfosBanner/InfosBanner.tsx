import { Flex, Img, FlexProps } from '@chakra-ui/react';
import { usePicasso } from 'hooks';

interface IInfos extends FlexProps {
	children: React.ReactNode;
	height?: string;
	justify?: string;
}

export const InfosBanner: React.FC<IInfos> = ({
	children,
	height,
	justify,
}) => {
	const theme = usePicasso();
	return (
		<Flex>
			<Flex
				bg={theme.bg.black}
				direction="column"
				position="relative"
				borderRadius="base"
				height={height}
				justify={justify}
			>
				{children}
				<Flex position="absolute" bottom="0">
					<Img src="/images/illustration.png" />
				</Flex>
				<Img src="/images/ondulate-background.png" />
			</Flex>
		</Flex>
	);
};
