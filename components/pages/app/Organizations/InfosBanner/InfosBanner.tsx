import { Flex, Img } from '@chakra-ui/react';
import { usePicasso } from 'hooks';

interface IInfos {
	children: React.ReactNode;
}

export const InfosBanner: React.FC<IInfos> = ({ children }) => {
	const theme = usePicasso();
	return (
		<Flex>
			<Flex
				bg={theme.bg.black}
				direction="column"
				position="relative"
				borderRadius="base"
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
