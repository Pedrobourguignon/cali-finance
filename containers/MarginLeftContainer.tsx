import { Flex } from '@chakra-ui/react';
import { IBackground } from 'types';

export const MarginLeftContainer: React.FC<IBackground> = ({ children }) => (
	<Flex ml="40">{children}</Flex>
);
