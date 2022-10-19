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
import React from 'react';
import { IBasicModal } from 'types';

export const WaitingForConfirmation: React.FC<IBasicModal> = ({
	isOpen,
	onClose,
}) => {
	const theme = usePicasso();
	return (
		<Modal isOpen={isOpen} onClose={onClose} size="sm">
			<ModalOverlay />
			<ModalContent
				m="auto"
				zIndex="1"
				bg="white"
				borderWidth="1px"
				borderStyle="solid"
				borderColor="black"
			>
				<OffsetShadow width="full" height="56" top="2" left="2">
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
						<ModalBody
							display="flex"
							flexDirection="column"
							gap="6"
							alignItems="center"
						>
							<Text
								textAlign="center"
								fontWeight="semibold"
								fontSize="lg"
								color={theme.text.mono}
							>
								Waiting for confirmation...
							</Text>
							<Text fontSize="sm">
								Please confirm this transaction in your wallet
							</Text>
						</ModalBody>
					</Flex>
				</OffsetShadow>
			</ModalContent>
		</Modal>
	);
};

export default WaitingForConfirmation;
