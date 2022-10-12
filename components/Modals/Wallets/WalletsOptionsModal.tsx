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
import { usePicasso } from 'hooks';
import { MoreIcon } from 'components/Icons';

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
	openLoadingWalletModal,
	setWalletData,
}) => {
	const theme = usePicasso();
	const onTriggerLoadingModal = (icon: string, name: string) => {
		setWalletData({
			icon,
			name,
		});
		openLoadingWalletModal();
		onClose();
	};
	return (
		<Flex>
			<Modal isOpen={isOpen} onClose={onClose} size="sm">
				<Flex>
					<ModalOverlay />
					<ModalContent m="auto" bgColor={theme.bg.modal}>
						<ModalHeader py="6">
							<Text fontSize="lg" fontStyle="semi-bold" color={theme.text.mono}>
								Connect to a Wallet
							</Text>
							<ModalCloseButton color="gray.400" py="6" />
						</ModalHeader>
						<ModalBody
							display="flex"
							flexDirection="column"
							gap="2"
							py="0"
							px="6"
						>
							{walletsOptions.map((wallet, index) => (
								<Flex
									key={+index}
									justify="space-between"
									border="1px"
									boxSizing="border-box"
									borderColor="blackAlpha.200"
									align="center"
									cursor="pointer"
									_hover={{
										color: 'white',
										bg: 'black',
									}}
									onClick={() =>
										onTriggerLoadingModal(wallet.icon, wallet.name)
									}
									color={theme.text.mono}
									transition="all 0.1s ease-in-out"
									borderRadius="base"
								>
									<Button bg="transparent" fontWeight="medium" _hover={{}}>
										{wallet.name}
									</Button>
									<Img src={wallet.icon} boxSize="6" mr="3" />
								</Flex>
							))}
							<Flex
								direction="column"
								align="center"
								color={theme.text.mono}
								py="6"
							>
								<Text>By connecting your wallet you accept the</Text>

								<Link href="/app/dashboard">
									<Text fontWeight="bold" cursor="pointer">
										<Text as="span" textDecor="underline">
											Terms and Conditions
										</Text>
										<Text as="span" textDecor="none">
											.
										</Text>
									</Text>
								</Link>
							</Flex>
						</ModalBody>
					</ModalContent>
				</Flex>
			</Modal>
		</Flex>
	);
};

export default WalletsOptionsModal;
