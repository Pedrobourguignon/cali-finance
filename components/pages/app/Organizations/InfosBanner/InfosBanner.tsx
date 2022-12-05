import { Flex, Img, FlexProps } from '@chakra-ui/react';
import { usePicasso } from 'hooks';

interface IInfos extends FlexProps {
	children: React.ReactNode;
}

export const InfosBanner: React.FC<IInfos> = ({ children, ...props }) => {
	const theme = usePicasso();
	return (
		<Flex>
			<Flex
				bg={theme.bg.black}
				direction="column"
				position="relative"
				borderRadius="base"
				{...props}
			>
				{children}
				<Flex position="absolute" top="0">
					<Img src="/images/ondulated.png" />
				</Flex>
				<Flex position="absolute" top="0">
					<Img src="/images/sparkles.png" />
				</Flex>
				<Flex position="absolute" bottom="0">
					<Img src="/images/illustration.png" />
				</Flex>
				<Flex position="absolute" bottom="0">
					<Img src="/images/ondulate-background.png" />
				</Flex>
			</Flex>
		</Flex>
	);
};
