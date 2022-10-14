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
				width="36"
				height="8"
				borderColor="white"
				top="2"
				left="1.5"
			>
				<Button
					h="max-content"
					py="2"
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
					onClick={onOpen}
				>
					<Text px="8">Connect Wallet</Text>
				</Button>
			</OffsetShadow>
		</Flex>
	);
};

export default ConnectWalletButton;
