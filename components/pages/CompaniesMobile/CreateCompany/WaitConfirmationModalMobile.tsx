import {
	Flex,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
	Text,
} from '@chakra-ui/react';
import { CaliLogoLoadingAnimation } from 'components';
import { usePicasso } from 'hooks';
import { MobileModalLayout } from 'layouts';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import { IBasicModal } from 'types';

export const WaitConfirmationModalMobile: React.FC<IBasicModal> = ({
	isOpen,
	onClose,
}) => {
	const theme = usePicasso();
	const { t: translate } = useTranslation('swap-token');
	return (
		<MobileModalLayout isOpen={isOpen} onClose={onClose}>
			<Flex direction="column" w="full" bg={theme.bg.modal} borderRadius="2xl">
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
					<Text fontSize="sm" color="black" textAlign="center" pb="4">
						{translate('pleaseConfirmTransaction')}
					</Text>
				</ModalBody>
			</Flex>
		</MobileModalLayout>
	);
};

export default WaitConfirmationModalMobile;
