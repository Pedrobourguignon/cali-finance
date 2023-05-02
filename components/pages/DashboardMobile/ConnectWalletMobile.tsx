import { Button, Flex, Text, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import { LoadingWalletConnectModal, WalletsOptionsModal } from 'components';
import { useProfile } from 'hooks';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

export const ConnectWalletMobile = () => {
	const { t: translate } = useTranslation('sidebar');
	const { data: session } = useSession();
	const { locale } = useRouter();
	const shouldDisplay = session ? 'none' : 'flex';
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { walletData, setWalletData } = useProfile();

	const { icon, name } = walletData;

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
				onCloseLoading={onCloseLoading}
			/>
			<LoadingWalletConnectModal
				walletIcon={icon}
				walletName={name}
				isOpen={isOpenLoading}
				onClose={onCloseLoading}
			/>
			<Button
				w={{ base: '8.5rem', xl: '40', '2xl': '52' }}
				h="max-content"
				py={{ base: locale === 'pt-BR' ? '2.5' : '2', xl: '2' }}
				fontSize={{ base: locale === 'pt-BR' ? 'xs' : 'sm', xl: 'sm' }}
				color="black"
				borderRadius="base"
				bg="white"
				_hover={{ background: 'white' }}
				_focus={{ background: 'white' }}
				onClick={onOpen}
				display={shouldDisplay}
			>
				<Text px="8" display={shouldDisplay}>
					{translate('connectWallet')}
				</Text>
			</Button>
		</Flex>
	);
};

export default ConnectWalletMobile;
