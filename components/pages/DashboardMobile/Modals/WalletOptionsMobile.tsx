import {
	Button,
	Flex,
	Img,
	Link,
	ModalBody,
	ModalCloseButton,
	ModalHeader,
	Text,
	useToast,
} from '@chakra-ui/react';
import { useAuth, usePicasso } from 'hooks';
import useTranslation from 'next-translate/useTranslation';
import { IWalletOptionsModal } from 'types';
import { navigationPaths } from 'utils';
import {
	useConnect,
	Connector,
	useAccount,
	useNetwork,
	useSwitchNetwork,
} from 'wagmi';
import NextLink from 'next/link';
import { useEffect } from 'react';
import { MobileModalLayout } from 'layouts';
import { AlertToast } from 'components';

interface IWallet {
	name: string;
	icon: string;
	connector?: Connector;
}

export const WalletOptionsMobile: React.FC<IWalletOptionsModal> = ({
	isOpen,
	onClose,
	openLoadingWalletModal,
	setWalletData,
	onCloseLoading,
}) => {
	const { t: translate } = useTranslation('sidebar');
	const { handleSignIn } = useAuth();
	const { isConnected, address } = useAccount();
	const toast = useToast();
	const { chain } = useNetwork();
	const { chains, switchNetworkAsync, isLoading } = useSwitchNetwork();
	const { connectors, connectAsync, status } = useConnect({
		async onSuccess(data) {
			const account = data?.account;
			if (chain?.id !== 80001) await switchNetworkAsync?.(chains[2].id);

			await handleSignIn(account);
			onCloseLoading();
		},
	});

	const theme = usePicasso();
	const isMetaMaskInstalled = () =>
		typeof window.ethereum !== 'undefined' && window.ethereum.isMetaMask;

	const redirectToMetaMaskInstallation = () => {
		window.open('https://metamask.io/download.html');
	};

	const onTriggerLoadingModal = async (wallet: IWallet) => {
		const { connector, icon, name } = wallet;
		try {
			if (!isMetaMaskInstalled() && connector?.name === 'MetaMask') {
				redirectToMetaMaskInstallation();
			}
			if (status !== 'success') {
				setWalletData({ icon, name });
				onClose();

				if (!isConnected) {
					if (connector?.name.includes('WalletConnect')) {
						await connectAsync({ connector });
					} else {
						openLoadingWalletModal();
						await connectAsync({ connector });
						onCloseLoading();
					}
				}
				handleSignIn(address);
			} else {
				onClose();
				openLoadingWalletModal();
				await handleSignIn(address);
				onCloseLoading();
			}
		} catch (error: any) {
			onCloseLoading();
			toast({
				position: 'top-right',
				render: () => (
					<AlertToast
						onClick={toast.closeAll}
						text="requestRejected"
						type="error"
					/>
				),
			});
		}
	};
	useEffect(() => {
		if (status === 'loading') {
			openLoadingWalletModal();
		}
	}, [status]);

	const walletsOptions = [
		{
			name: 'MetaMask',
			icon: '/icons/metamask.svg',
			connector: connectors[0],
		},
		{
			name: 'Coinbase Wallet',
			icon: '/icons/coinbase.svg',
			connector: connectors[1],
		},
		{
			name: 'WalletConnect',
			icon: '/icons/walletConnect.svg',
			connector: connectors[2],
		},
	];
	return (
		<MobileModalLayout isOpen={isOpen} onClose={onClose}>
			<Flex
				direction="column"
				bg={theme.bg.modal}
				borderRadius="base"
				borderTopRadius="3xl"
			>
				<ModalHeader
					py="6"
					bg={theme.bg.modal}
					borderRadius="base"
					borderTopRadius="3xl"
					display="flex"
					w="full"
				>
					<Text fontSize="lg" fontStyle="semi-bold" color={theme.text.mono}>
						{translate('connectWalletModal')}
					</Text>
					<ModalCloseButton color="gray.400" py="7" />
				</ModalHeader>
				<ModalBody display="flex" flexDirection="column" gap="2" py="0">
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
							onClick={() => onTriggerLoadingModal(wallet)}
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
						pt="4"
						pb="14"
					>
						<Text fontSize="sm" whiteSpace="nowrap">
							{translate('accept')}
						</Text>
						<Link as={NextLink} href={navigationPaths.termsAndConditions}>
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
		</MobileModalLayout>
	);
};

export default WalletOptionsMobile;
