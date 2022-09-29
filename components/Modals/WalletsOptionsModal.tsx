import {
	Flex,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
	Button,
	Img,
	Text,
	useDisclosure,
} from '@chakra-ui/react';
import React, { useState } from 'react';

import { IModal } from 'types';
import { LoadingWalletConnectModal } from 'components';
import Link from 'next/link';

const walletsOptions = [
	{
		name: 'MetaMask',
		icon: '/icons/metamask.svg',
	},
	{
		name: 'Coinbase Wallet',
		icon: '/icons/coinbase.svg',
	},
	{
		name: 'WalletConnect',
		icon: '/icons/walletConnect.svg',
	},
	{
		name: 'Binance Wallet',
		icon: '/icons/binance.svg',
	},
	{
		name: 'More',
		icon: '/icons/3dots.svg',
	},
];

export const WalletsOptionsModal: React.FC<IModal> = ({ isOpen, onClose }) => {
	const {
		isOpen: isOpenLoading,
		onClose: onCloseLoading,
		onOpen: onOpenLoading,
	} = useDisclosure();

	const [walletData, setWalletData] = useState({ name: '', icon: '' });

	return (
		<Flex>
			<Modal isOpen={isOpen} onClose={onClose} size="sm">
				<LoadingWalletConnectModal
					walletIcon={walletData.icon}
					walletName={walletData.name}
					isOpen={isOpenLoading}
					onClose={onCloseLoading}
				/>
				<ModalOverlay />
				<ModalContent m="auto">
					<ModalHeader>
						<Text fontSize="lg" fontStyle="semi-bold">
							Connect to a Wallet
						</Text>
						<ModalCloseButton />
					</ModalHeader>
					<ModalBody
						display="flex"
						flexDirection="column"
						gap="2"
						mx="auto"
						mb="4"
					>
						{walletsOptions.map((wallet, index) => (
							<Flex
								key={+index}
								w="80"
								h="12"
								justify="space-between"
								border="2px"
								borderColor="blackAlpha.200"
								align="center"
								cursor="pointer"
								_hover={{
									color: 'white',
									bg: 'black',
								}}
								_after={{
									content: '""',
									position: 'absolute',
									width: '100%',
									height: '100%',
									border: '1px solid white',
									borderRadius: 'md',
									left: '2',
									top: '2',
									zIndex: '-1',
								}}
								onClick={() => {
									setWalletData({
										icon: wallet.icon,
										name: wallet.name,
									});
									onOpenLoading();
									onClose();
								}}
							>
								<Button bg="transparent">{wallet.name}</Button>
								<Img src={wallet.icon} boxSize="6" mr="3" />
							</Flex>
						))}
						<Flex direction="column" align="center" mt="2">
							<Text>By connecting your wallet you accept the</Text>
							<Link href="/app/dashboard">
								<Text as="u" fontWeight="bold" cursor="pointer">
									Terms and Conditions.
								</Text>
							</Link>
						</Flex>
					</ModalBody>
				</ModalContent>
			</Modal>
		</Flex>
	);
};

export default WalletsOptionsModal;
