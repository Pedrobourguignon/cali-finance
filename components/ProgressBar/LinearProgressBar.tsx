import { Flex } from '@chakra-ui/react';

interface IBar {
	children: React.ReactNode;
}

export const LinearProgressBar: React.FC<IBar> = ({ children }) => (
	<Flex w="100%" h="1.5" bg="teal.200" rounded="xl">
		{children}
	</Flex>
);

export default LinearProgressBar;
