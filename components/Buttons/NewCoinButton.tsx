import { Button, Flex } from '@chakra-ui/react';
import React from 'react';

export const NewCoinButton = () => (
	<Flex my="6">
		<Flex
			p="4"
			w="28"
			position="absolute"
			display=" block"
			border=" 1px solid white"
			borderRadius="base"
		/>
		<Button
			w="28"
			h="8"
			fontSize="sm"
			color="black"
			borderRadius="base"
			display=" block"
			borderWidth="0 2.5"
			m="-5px 0px -10px -5px"
			bg="white"
			_hover={{ background: 'white' }}
			_focus={{ background: 'white' }}
			_active={{
				background: 'white',
				transform: 'translateY(6px) translateX(5px)',
			}}
			fontWeight="500"
			lineHeight="5"
		>
			+ New Coin
		</Button>
	</Flex>
);

export default NewCoinButton;
