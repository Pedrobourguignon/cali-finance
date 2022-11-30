import { ModalBody, Text } from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import { MobileModalLayout } from 'layouts';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import { IBasicModal } from 'types';

export const ModalTest: React.FC<IBasicModal> = ({ isOpen, onClose }) => {
	const theme = usePicasso();
	const { t: translate } = useTranslation('swap-token');
	return (
		<MobileModalLayout isOpen={isOpen} onClose={onClose} modalName="Teste">
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
				<Text fontSize="sm" color="black">
					{translate('pleaseConfirmTransaction')}
				</Text>
			</ModalBody>
		</MobileModalLayout>
	);
};

export default ModalTest;
