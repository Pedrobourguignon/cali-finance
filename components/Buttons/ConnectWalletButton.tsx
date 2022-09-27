import { Button, Flex } from '@chakra-ui/react';
import React from 'react';

export const ConnectWalletButton = () => (
	<Flex>
		<Flex
			position="absolute"
			display=" block"
			p="4"
			border=" 1px solid white"
			borderRadius="base"
			w="40"
		/>
		<Button
			w="40"
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
		>
			Connect Wallet
		</Button>
	</Flex>
);

export default ConnectWalletButton;
