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
import { useAuth, usePicasso, useProfile } from 'hooks';
import { signIn } from 'next-auth/react';
import useTranslation from 'next-translate/useTranslation';
import { IWalletOptionsModal } from 'types';
import { navigationPaths } from 'utils';
import { useConnect, Connector } from 'wagmi';
import NextLink from 'next/link';
import { useEffect } from 'react';

interface IWallet {
	name: string;
	icon: string;
	connector?: Connector<any, any, any>;
}

export const WalletsOptionsModal: React.FC<IWalletOptionsModal> = ({
	isOpen,
	onClose,
	openLoadingWalletModal,
	setWalletData,
}) => {
	const { t: translate } = useTranslation('sidebar');
	const { getNonce, getSignature } = useAuth();
	const { connectors, connectAsync, status } = useConnect({
		async onSuccess(data) {
			const account = data?.account;
			try {
				const { nonce } = await getNonce(account);
				const signature = await getSignature(nonce);
				signIn('credentials', {
					redirect: false,
					wallet: account,
					message: signature,
				});
			} catch (error: any) {
				throw new Error(error);
			}
		},
	});
	const theme = usePicasso();

	const onTriggerLoadingModal = async (wallet: IWallet) => {
		const { connector, icon, name } = wallet;
		if (status !== 'success') {
			setWalletData({ icon, name });
			onClose();
			await connectAsync({ connector });
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
		{
			name: 'Binance Wallet',
			icon: '/icons/binance.svg',
			connector: connectors[4],
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
					top="0.625rem"
					left="0.625rem"
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
								py="2"
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
				</OffsetShadow>
			</ModalContent>
		</Modal>
	);
};

export default WalletsOptionsModal;
