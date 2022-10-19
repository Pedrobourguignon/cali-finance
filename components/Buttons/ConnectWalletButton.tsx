import { Button, Flex, Img, Text, useDisclosure } from '@chakra-ui/react';
import React, { useState } from 'react';
import {
	LoadingWalletConnectModal,
	WalletsOptionsModal,
	OffsetShadow,
} from 'components';

interface IWalletData {
	name: string;
	icon: string;
}

export const ConnectWalletButton = () => {
	const profilePicture =
		'http://t0.gstatic.com/licensed-image?q=tbn:ANd9GcRIJYVo526c4XTP0V4CyE2XbTLsdYcxSilLYaSDYC4XDtXArbTNxmX63MnX3gP6d2cI';
	const walletAddress = '0x6856...BF99';
	const isLogged = true;
	const shouldDisplay = isLogged ? 'none' : 'flex';
	const shouldntDisplay = isLogged ? 'flex' : 'none';
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
				width="36"
				height="8"
				borderColor="white"
				top="2"
				left="1.5"
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
						transform: 'translateY(6px) translateX(5px)',
					}}
					onClick={onOpen}
					display={shouldDisplay}
				>
					<Text px="8" display={shouldDisplay}>
						Connect Wallet
					</Text>
				</Button>
				<Flex
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
					<Flex display={shouldntDisplay} align="center" gap="2" px="4">
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
				</Flex>
			</OffsetShadow>
		</Flex>
	);
};

export default ConnectWalletButton;
