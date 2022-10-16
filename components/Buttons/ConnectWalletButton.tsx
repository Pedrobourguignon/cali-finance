import { Button, Flex, Text, useDisclosure } from '@chakra-ui/react';
import React, { useState } from 'react';
import {
	LoadingWalletConnectModal,
	WalletsOptionsModal,
	OffsetShadow,
} from 'components';

interface IWalletData {
	name: string;
	icon: string;
}

export const ConnectWalletButton = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [walletData, setWalletData] = useState<IWalletData>({
		name: '',
		icon: '',
	});
	const {
		isOpen: isOpenLoading,
		onClose: onCloseLoading,
		onOpen: onOpenLoading,
	} = useDisclosure();
	return (
		<Flex>
			<WalletsOptionsModal
				setWalletData={setWalletData}
				isOpen={isOpen}
				onClose={onClose}
				openLoadingWalletModal={onOpenLoading}
			/>
			<LoadingWalletConnectModal
				walletIcon={walletData.icon}
				walletName={walletData.name}
				isOpen={isOpenLoading}
				onClose={onCloseLoading}
			/>
			<OffsetShadow
				borderRadius="base"
				width="40"
				height="8"
				borderColor="white"
				position="absolute"
			>
				<Button
					position="relative"
					py="2"
					fontSize="sm"
					color="black"
					borderRadius="base"
					bg="white"
					w="40"
					h="8"
					_hover={{ background: 'white' }}
					_focus={{ background: 'white' }}
					bottom="0.5rem"
					right="0.5rem"
					_active={{
						background: 'white',
						transform: 'translateY(0.5rem) translateX(0.5rem)',
					}}
					onClick={onOpen}
				>
					<Text px="8">Connect Wallet</Text>
				</Button>
			</OffsetShadow>
		</Flex>
	);
};

export default ConnectWalletButton;
