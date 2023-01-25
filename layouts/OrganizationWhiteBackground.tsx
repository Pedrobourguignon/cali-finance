import { Flex } from '@chakra-ui/react';
import React from 'react';

export const OrganizationWhiteBackground: React.FC = () => (
	<Flex
		w="full"
		bg="white"
		h={{ md: '48', lg: '64' }}
		position="absolute"
		left="0"
	/>
);

export default OrganizationWhiteBackground;
