import {
	Flex,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
	Text,
} from '@chakra-ui/react';
import { OffsetShadow, CaliLogoLoadingAnimation } from 'components';
import { usePicasso } from 'hooks';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import { IBasicModal } from 'types';

export const WaitMetamaskFinishTransaction: React.FC<IBasicModal> = ({
	isOpen,
	onClose,
}) => {
	const theme = usePicasso();
	const { t: translate } = useTranslation('swap-token');

	return (
		<Modal isOpen={isOpen} onClose={onClose} size="sm">
			<ModalOverlay />
			<ModalContent
				m="auto"
				h="11.313rem"
				w="21.5rem"
				zIndex="1"
				bg="white"
				borderWidth="1px"
				borderStyle="solid"
				borderColor="black"
			>
				<OffsetShadow top="0.5rem" left="0.5rem" width="21.5rem">
					<Flex
						direction="column"
						w="full"
						bg={theme.bg.modal}
						borderRadius="base"
					>
						<ModalHeader display="flex" justifyContent="center" py="6">
							<Flex>
								<CaliLogoLoadingAnimation />
							</Flex>
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
								{translate('waitingForConfirmation')}
							</Text>
							<Text
								fontSize="sm"
								h="12"
								color="black"
								textAlign="center"
								pb="4"
							>
								{translate('pleaseConfirmTransaction')}
							</Text>
						</ModalBody>
					</Flex>
				</OffsetShadow>
			</ModalContent>
		</Modal>
	);
};

export default WaitMetamaskFinishTransaction;
