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
import { usePicasso } from 'hooks';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

interface ILoadingWalletConnectModal {
	walletName: string;
	walletIcon: string;
	isOpen: boolean;
	onClose: () => void;
}

export const LoadingWalletConnectModal: React.FC<
	ILoadingWalletConnectModal
> = ({ walletIcon, walletName, isOpen, onClose }) => {
	const theme = usePicasso();
	const { t: translate } = useTranslation('sidebar');

	return (
		<Modal isOpen={isOpen} onClose={onClose} size="sm">
			<ModalOverlay />
			<ModalContent
				m="auto"
				zIndex="hide"
				bg="white"
				borderWidth="1px"
				borderStyle="solid"
				borderColor="black"
			>
				<OffsetShadow top="0.5rem" left="0.5rem" width="full">
					<Flex
						direction="column"
						w="full"
						bg={theme.bg.modal}
						borderRadius="base"
					>
						<ModalHeader display="flex" justifyContent="center" py="6">
							<Img src="/images/cali-logo.svg" w="16" h="10" />
							<ModalCloseButton color="gray.400" py="6" />
						</ModalHeader>
						<ModalBody display="flex" flexDirection="column" gap="6" pb="6">
							<Text
								textAlign="center"
								fontWeight="semibold"
								fontSize="lg"
								color={theme.text.mono}
							>
								{translate('initializing')}
							</Text>
							<Flex
								border="1px"
								borderColor="blackAlpha.200"
								borderStyle="solid"
								align="center"
								px="3"
								justify="space-between"
								color={theme.text.mono}
								fontWeight="medium"
								borderRadius="base"
							>
								<Text bg="transparent" fontSize="sm" py="2">
									{walletName}
								</Text>
								<Img src={walletIcon} boxSize="6" />
							</Flex>
						</ModalBody>
					</Flex>
				</OffsetShadow>
			</ModalContent>
		</Modal>
	);
};

export default LoadingWalletConnectModal;
