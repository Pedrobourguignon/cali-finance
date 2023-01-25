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
		icon: '/icons/treedots.svg',
	},
];

export const WalletsOptionsModal: React.FC<IWalletOptionsModal> = ({
	isOpen,
	onClose,
	openLoadingWalletModal,
	setWalletData,
}) => {
	const { t: translate } = useTranslation('sidebar');
	const { setIsConnected } = useProfile();
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
	return (
		<Modal isOpen={isOpen} onClose={onClose} size="sm">
			<ModalOverlay />
			<ModalContent
				m="auto"
				bg="white"
				w={{ lg: '16.9rem', xl: '21.125rem' }}
				h="min-content"
				borderRadius="base"
			>
				<OffsetShadow
					width={{ lg: '16.9rem', xl: '21.125rem' }}
					height={{ lg: '21.6rem', xl: '27rem' }}
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
							py={{ lg: '4', xl: '6' }}
							bg={theme.bg.modal}
							borderRadius="base"
							display="flex"
							w="full"
						>
							<Text
								fontSize={{ lg: 'md', xl: 'lg' }}
								fontStyle="semi-bold"
								color={theme.text.mono}
							>
								{translate('connectWalletModal')}
							</Text>
							<ModalCloseButton color="gray.400" py={{ lg: '5', xl: '7' }} />
						</ModalHeader>
						<ModalBody
							display="flex"
							flexDirection="column"
							gap="2"
							py="0"
							px="6"
							w={{ lg: '16.9rem', xl: '21.125rem' }}
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
										py={{ lg: '2.5', xl: '4' }}
										h="max-content"
										bg="transparent"
										fontWeight="medium"
										_hover={{}}
										fontSize={{ lg: 'xs', xl: 'sm' }}
									>
										{wallet.name}
									</Button>
									<Img src={wallet.icon} boxSize={{ lg: '4', xl: '6' }} />
								</Flex>
							))}
							<Flex
								direction="column"
								align="center"
								color={theme.text.mono}
								py={{ lg: '2' }}
							>
								<Text fontSize={{ lg: 'xs', xl: 'sm' }}>
									{translate('accept')}
								</Text>

								<Link href={navigationPaths.termsAndConditions}>
									<Text
										fontWeight="bold"
										cursor="pointer"
										fontSize={{ lg: 'xs', xl: 'sm' }}
									>
										<Text
											as="span"
											textDecor="underline"
											fontSize={{ lg: 'xs', xl: 'sm' }}
										>
											{translate('terms')}
										</Text>
										<Text as="span" textDecor="none">
											.
										</Text>
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
