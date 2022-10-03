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
import { OffsetShadow } from 'components';
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
			<OffsetShadow width="full" borderColor="red" height="full">
				<Flex>
					<ModalOverlay />
					<ModalContent m="auto" zIndex="1" bg="white">
						<ModalHeader display="flex" justifyContent="center">
							<Img src="/images/cali-logo.svg" w="16" h="10" />
							<ModalCloseButton />
						</ModalHeader>
						<ModalBody display="flex" flexDirection="column" gap="2" mb="4">
							<Text textAlign="center" fontWeight="semi-bold" fontSize="lg">
								Initializing...
							</Text>
							<Flex
								border="2px"
								borderColor="blackAlpha.200"
								align="center"
								px="3"
								justify="center"
							>
								<Text bg="transparent" fontSize="sm" py="2" pr="52">
									{walletName}
								</Text>
								<Img src={walletIcon} boxSize="6" />
							</Flex>
						</ModalBody>
					</ModalContent>
				</Flex>
			</OffsetShadow>
		</Modal>
	</Flex>
);

export default LoadingWalletConnectModal;
