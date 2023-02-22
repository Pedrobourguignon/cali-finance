import {
	Button,
	Flex,
	Img,
	Link,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Text,
} from '@chakra-ui/react';
import { OffsetShadow } from 'components';
import { usePicasso, useProfile } from 'hooks';
import useTranslation from 'next-translate/useTranslation';
import { IWalletOptionsModal } from 'types';
import { navigationPaths } from 'utils';
import { useConnect } from 'wagmi';

export const WalletsOptionsModal: React.FC<IWalletOptionsModal> = ({
	isOpen,
	onClose,
	openLoadingWalletModal,
	setWalletData,
}) => {
	const { t: translate } = useTranslation('sidebar');
	const { setIsConnected } = useProfile();
	const { connectors } = useConnect();
	const theme = usePicasso();
	const onTriggerLoadingModal = (icon: string, name: string) => {
		setWalletData({
			icon,
			name,
		});
		setIsConnected(true);
		openLoadingWalletModal();
		onClose();
	};

	const walletsOptions = [
		{
			name: 'MetaMask',
			icon: '/icons/metamask.svg',
			connector: connectors[0],
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
			icon: '/icons/treedots.svg',
		},
	];

	return (
		<Modal isOpen={isOpen} onClose={onClose} size="sm">
			<ModalOverlay />
			<ModalContent
				m="auto"
				bg="white"
				w="21.125rem"
				h="min-content"
				borderRadius="base"
			>
				<OffsetShadow
					width="21.125rem"
					height="27rem"
					buttonText="Connect to a Wallet"
					top="2"
					left="2"
				>
					<Flex
						direction="column"
						bg={theme.bg.modal}
						borderRadius="base"
						w="full"
					>
						<ModalHeader
							py="6"
							bg={theme.bg.modal}
							borderRadius="base"
							display="flex"
							w="full"
						>
							<Text fontSize="lg" fontStyle="semi-bold" color={theme.text.mono}>
								{translate('connectWalletModal')}
							</Text>
							<ModalCloseButton color="gray.400" py="7" />
						</ModalHeader>
						<ModalBody
							display="flex"
							flexDirection="column"
							gap="2"
							py="0"
							px="6"
							w="21.125rem"
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
									px="4"
									w="full"
								>
									<Button
										p="0"
										py="4"
										h="max-content"
										bg="transparent"
										fontWeight="medium"
										_hover={{}}
										fontSize="sm"
									>
										{wallet.name}
									</Button>
									<Img src={wallet.icon} boxSize="6" />
								</Flex>
							))}
							<Flex
								direction="column"
								align="center"
								color={theme.text.mono}
								py="2"
							>
								<Text fontSize="sm" whiteSpace="nowrap">
									{translate('accept')}
								</Text>
								<Link href={navigationPaths.termsAndConditions}>
									<Text
										as="span"
										textDecor="underline"
										fontSize="sm"
										fontWeight="bold"
									>
										{translate('terms')}
									</Text>
								</Link>
							</Flex>
						</ModalBody>
					</Flex>
				</OffsetShadow>
			</ModalContent>
		</Modal>
	);
};

export default WalletsOptionsModal;
