import { Flex } from '@chakra-ui/react';
import { IBackground } from 'types';

export const MarginTopContainer: React.FC<IBackground> = ({ children }) => (
	<Flex mt="36" flexDirection="row">
		{children}
	</Flex>
);
