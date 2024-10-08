import { Button, Flex, Text, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import { LoadingWalletMobile, WalletOptionsMobile } from 'components';
import { useAuth, useProfile } from 'hooks';

export const ConnectWalletMobile = () => {
	const { t: translate } = useTranslation('sidebar');
	const { session } = useAuth();
	const shouldDisplay = session ? 'none' : 'flex';
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { walletData, setWalletData } = useProfile();

	const {
		isOpen: isOpenLoading,
		onClose: onCloseLoading,
		onOpen: onOpenLoading,
	} = useDisclosure();
	const { icon, name } = walletData;

	return (
		<Flex>
			<WalletOptionsMobile
				setWalletData={setWalletData}
				isOpen={isOpen}
				onClose={onClose}
				openLoadingWalletModal={onOpenLoading}
				onCloseLoading={onCloseLoading}
			/>

			<LoadingWalletMobile
				walletIcon={icon}
				walletName={name}
				isOpen={isOpenLoading}
				onClose={onCloseLoading}
			/>
			<Button
				w={{ base: '8.5rem', xl: '40', '2xl': '52' }}
				h="max-content"
				py="2"
				fontSize={{ base: 'xs', xl: 'sm' }}
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
