import {
	Flex,
	Icon,
	Img,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Text,
} from '@chakra-ui/react';
import { OffsetShadow } from 'components';
import { usePicasso } from 'hooks';
import useTranslation from 'next-translate/useTranslation';
import { FaDiscord } from 'react-icons/fa';
import { IBasicModal } from 'types';

export const ContactOptionsModal: React.FC<IBasicModal> = ({
	isOpen,
	onClose,
}) => {
	const { t: translate } = useTranslation('have-a-problem');
	const theme = usePicasso();

	return (
		<Modal isOpen={isOpen} onClose={onClose} size="sm">
			<ModalOverlay />
			<ModalContent bg="white" flexDirection="column">
				<OffsetShadow
					width="full"
					height="19rem"
					buttonText="Connect to a Wallet"
					top="2"
					left="2"
				>
					<Flex
						direction="column"
						bg={theme.bg.modal}
						borderRadius="base"
						w="full"
					>
						<ModalHeader
							bgImage="/images/Rectangle-40475.png"
							bgRepeat="no-repeat"
							bgSize="cover"
							p="5"
						>
							<Text fontSize="xl" fontWeight="500">
								{translate('chooseTheBetter')}
							</Text>
							<Text fontSize="xl" fontWeight="500">
								{translate('wayTo')}
							</Text>
						</ModalHeader>
						<ModalCloseButton pt="2" />
						<ModalBody display="flex" flexDirection="column" gap="2" pt="6">
							<Flex
								gap="4"
								borderRadius="base"
								border="1px solid"
								borderColor="blackAlpha.200"
							>
								<Flex align="center" gap="4" pl="4">
									<Icon as={FaDiscord} color="#5A69EA" boxSize="6" />
									<Text fontSize="sm" fontWeight="500" color="black" py="4">
										{translate('openAService')}
									</Text>
								</Flex>
							</Flex>
							<Flex
								gap="4"
								borderRadius="base"
								border="1px solid"
								borderColor="blackAlpha.200"
							>
								<Flex align="center" gap="4" pl="4">
									<Img src="/images/schedule.png" boxSize="6" />
									<Text fontSize="sm" fontWeight="500" color="black" py="4">
										{translate('scheduleAMeeting')}
									</Text>
								</Flex>
							</Flex>
						</ModalBody>

						<Flex justifyContent="center" pb="6">
							<Text color="black" fontSize="sm">
								{translate('orYouCan')}
								&nbsp;
							</Text>
							<Text color="black" as="u" fontSize="sm">
								{translate('sendUsAEmail')}
							</Text>
						</Flex>
					</Flex>
				</OffsetShadow>
			</ModalContent>
		</Modal>
	);
};

export default ContactOptionsModal;
