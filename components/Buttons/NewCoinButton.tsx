import { Button, Flex } from '@chakra-ui/react';
import React from 'react';
import { OffsetShadow } from 'components';

export const NewCoinButton = () => (
	<Flex my="6">
		<OffsetShadow width="28" height="8" borderColor="white" top="1.5" left="1">
			<Button
				w="28"
				h="full"
				fontSize="sm"
				color="black"
				borderRadius="base"
				borderWidth="0 2.5"
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
		</OffsetShadow>
	</Flex>
);

export default NewCoinButton;
