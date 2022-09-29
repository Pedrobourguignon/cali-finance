import {
	Flex,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
	Text,
	Img,
} from '@chakra-ui/react';
import React from 'react';

interface ILoadingWalletConnectModal {
	walletName: string;
	walletIcon: string;
	isOpen: boolean;
	onClose: () => void;
}

export const LoadingWalletConnectModal: React.FC<
	ILoadingWalletConnectModal
> = ({ walletIcon, walletName, isOpen, onClose }) => (
	<Flex>
		<Modal isOpen={isOpen} onClose={onClose} size="sm">
			<ModalOverlay />
			<ModalContent m="auto">
				<ModalHeader display="flex" justifyContent="center">
					<Img src="/images/cali-logo.svg" w="16" h="10" />
					<ModalCloseButton />
				</ModalHeader>
				<ModalBody
					display="flex"
					flexDirection="column"
					gap="2"
					mx="auto"
					mb="4"
				>
					<Text textAlign="center" fontWeight="semi-bold" fontSize="lg">
						Initializing...
					</Text>
					<Flex
						w="80"
						h="12"
						justify="space-between"
						border="2px"
						borderColor="blackAlpha.200"
						align="center"
						_after={{
							content: '""',
							position: 'absolute',
							width: '100%',
							height: '100%',
							border: '1px solid white',
							borderRadius: 'md',
							left: '2',
							top: '2',
							zIndex: '-1',
						}}
					>
						<Text bg="transparent" ml="3" fontSize="sm">
							{walletName}
						</Text>
						<Img src={walletIcon} boxSize="6" mr="3" />
					</Flex>
				</ModalBody>
			</ModalContent>
		</Modal>
	</Flex>
);

export default LoadingWalletConnectModal;
