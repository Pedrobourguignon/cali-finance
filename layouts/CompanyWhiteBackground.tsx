import { Flex } from '@chakra-ui/react';
import React from 'react';

export const CompanyWhiteBackground: React.FC = () => (
	<Flex
		w="100%"
		bg="white"
		position="absolute"
		h={{ md: '48', lg: '14.4rem' }}
		left="0"
	/>
);

export default CompanyWhiteBackground;
