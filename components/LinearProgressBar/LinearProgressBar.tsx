import { Flex } from '@chakra-ui/react';
import { usePicasso } from 'hooks';

interface IBar {
	children: React.ReactNode;
}

export const LinearProgressBar: React.FC<IBar> = ({ children }) => {
	const theme = usePicasso();
	return (
		<Flex w="100%" h="1.5" bg="teal.200" rounded="xl">
			{children}
		</Flex>
	);
};
