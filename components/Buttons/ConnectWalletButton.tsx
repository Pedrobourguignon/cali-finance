import { Button, Flex, useDisclosure } from '@chakra-ui/react';
import { WalletsOptionsModal } from 'components/Modals';
import React from 'react';

export const ConnectWalletButton = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<Flex>
			<WalletsOptionsModal isOpen={isOpen} onClose={onClose} />
			<Button
				w="40"
				h="8"
				fontSize="sm"
				color="black"
				borderRadius="base"
				bg="white"
				_hover={{ background: 'white' }}
				_focus={{ background: 'white' }}
				_active={{
					background: 'white',
					transform: 'translateY(6px) translateX(5px)',
				}}
				_after={{
					content: '""',
					position: 'fixed',
					width: '100%',
					height: '100%',
					border: '1px solid white',
					borderRadius: 'sm',
					left: '2',
					top: '2',
					zIndex: '-1',
				}}
				onClick={onOpen}
			>
				Connect Wallet
			</Button>
		</Flex>
	);
};

export default ConnectWalletButton;
