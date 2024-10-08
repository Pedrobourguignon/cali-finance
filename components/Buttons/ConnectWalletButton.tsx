import { Button, Flex, Text, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import {
	LoadingWalletConnectModal,
	WalletsOptionsModal,
	OffsetShadow,
} from 'components';
import { useAuth, useProfile } from 'hooks';
import { useRouter } from 'next/router';

export const ConnectWalletButton = () => {
	const { t: translate } = useTranslation('sidebar');
	const { session } = useAuth();
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
			<OffsetShadow
				px={{ lg: '3', xl: '6' }}
				width="max-content"
				height="8"
				borderColor="white"
				top="0.44rem"
				left="0.30rem"
				display={shouldDisplay}
			>
				<Button
					w={{ md: '8.5rem', xl: '40', '2xl': '52' }}
					h="max-content"
					py={{ md: locale === 'pt-BR' ? '2.5' : '2', xl: '2' }}
					fontSize={{ md: locale === 'pt-BR' ? 'xs' : 'sm', xl: 'sm' }}
					color="black"
					borderRadius="base"
					bg="white"
					_hover={{ background: 'white' }}
					_focus={{ background: 'white' }}
					_active={{
						background: 'white',
						transform: 'translateY(0.435rem) translateX(0.32rem)',
					}}
					onClick={onOpen}
					display={shouldDisplay}
				>
					<Text px="8" display={shouldDisplay}>
						{translate('connectWallet')}
					</Text>
				</Button>
			</OffsetShadow>
		</Flex>
	);
};

export default ConnectWalletButton;
