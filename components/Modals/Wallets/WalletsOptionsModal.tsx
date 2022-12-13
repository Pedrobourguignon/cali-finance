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
import { navigationPaths } from 'utils';
import useTranslation from 'next-translate/useTranslation';

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
		<Modal isOpen={isOpen} onClose={onClose} size="sm">
			<ModalOverlay />
			<ModalContent
				m="auto"
				bg="white"
				w="full"
				h="min-content"
				borderRadius="base"
			>
				<OffsetShadow
					width="full"
					height="410px"
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
								<Text>{translate('accept')}</Text>

								<Link href={navigationPaths.termsAndConditions}>
									<Text fontWeight="bold" cursor="pointer">
										<Text as="span" textDecor="underline">
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
