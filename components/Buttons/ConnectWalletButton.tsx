import { Button, Flex, Text, useDisclosure } from '@chakra-ui/react';
import React, { useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import {
	LoadingWalletConnectModal,
	WalletsOptionsModal,
	OffsetShadow,
} from 'components';
import { useProfile } from 'hooks';

interface IWalletData {
	name: string;
	icon: string;
}

export const ConnectWalletButton = () => {
	const { t: translate } = useTranslation('sidebar');
	const { isConnected } = useProfile();
	const shouldDisplay = isConnected === true ? 'none' : 'flex';
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [walletData, setWalletData] = useState<IWalletData>({
		name: '',
		icon: '',
	});
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
			/>
			<LoadingWalletConnectModal
				walletIcon={walletData.icon}
				walletName={walletData.name}
				isOpen={isOpenLoading}
				onClose={onCloseLoading}
			/>
			<OffsetShadow
				px=""
				buttonText=""
				width="40"
				height="8"
				borderColor="white"
				top="0.5rem"
				left="0.375rem"
				display={shouldDisplay}
			>
				<Button
					h="max-content"
					py="2"
					fontSize="sm"
					color="black"
					borderRadius="base"
					bg="white"
					_hover={{ background: 'white' }}
					_focus={{ background: 'white' }}
					_active={{
						background: 'white',
						transform: 'translateY(0.5rem) translateX(0.375rem)',
					}}
					onClick={onOpen}
					display={shouldDisplay}
				>
					<Text px="8" display={shouldDisplay}>
						{translate('connectWallet')}
					</Text>
				</Button>
				{/* <Flex
					h="max-content"
					py="2"
					fontSize="sm"
					color="black"
					borderRadius="base"
					bg="white"
					_hover={{ background: 'white' }}
					_focus={{ background: 'white' }}
					display={shouldntDisplay}
				>
					<Flex align="center" gap="2" px="4">
						<Img
							src={profilePicture}
							borderRadius="full"
							boxSize="6"
							objectFit="cover"
						/>
						<Text fontWeight="500" fontSize="sm">
							{walletAddress}
						</Text>
					</Flex>
				</Flex> */}
			</OffsetShadow>
		</Flex>
	);
};

export default ConnectWalletButton;
