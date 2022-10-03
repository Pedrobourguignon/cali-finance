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
} from '@chakra-ui/react';

import { IWalletOptionsModal } from 'types';
import Link from 'next/link';
import { OffsetShadow } from 'components';

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

export const WalletsOptionsModal: React.FC<IWalletOptionsModal> = ({
	isOpen,
	onClose,
	openSecondModal,
	setWalletData,
}) => {
	const triggerLoadingModal = (icon: string, name: string) => {
		setWalletData({
			icon,
			name,
		});
		openSecondModal();
		onClose();
	};
	return (
		<Flex>
			<Modal isOpen={isOpen} onClose={onClose} size="sm">
				<OffsetShadow width="1000px" height="full" borderColor="white">
					<Flex>
						<ModalOverlay />
						<ModalContent m="auto">
							<ModalHeader>
								<Text fontSize="lg" fontStyle="semi-bold">
									Connect to a Wallet
								</Text>
								<ModalCloseButton />
							</ModalHeader>
							<ModalBody display="flex" flexDirection="column" gap="2" mb="4">
								{walletsOptions.map((wallet, index) => (
									<Flex
										key={+index}
										justify="space-between"
										border="2px"
										borderColor="blackAlpha.200"
										align="center"
										cursor="pointer"
										_hover={{
											color: 'white',
											bg: 'black',
										}}
										onClick={() =>
											triggerLoadingModal(wallet.icon, wallet.name)
										}
									>
										<Button bg="transparent">{wallet.name}</Button>
										<Img src={wallet.icon} boxSize="6" mr="3" />
									</Flex>
								))}
								<Flex direction="column" align="center">
									<Text>By connecting your wallet you accept the</Text>
									<Link href="/app/dashboard">
										<Text as="u" fontWeight="bold" cursor="pointer">
											Terms and Conditions.
										</Text>
									</Link>
								</Flex>
							</ModalBody>
						</ModalContent>
					</Flex>
				</OffsetShadow>
			</Modal>
		</Flex>
	);
};

export default WalletsOptionsModal;
