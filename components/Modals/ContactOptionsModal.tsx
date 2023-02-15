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
			<ModalContent>
				<OffsetShadow top="0.5rem" left="0.5rem">
					<Flex
						direction="column"
						bg={theme.bg.modal}
						borderRadius="base"
						w="full"
						borderWidth="1px"
						borderColor={theme.bg.primary}
					>
						<ModalHeader
							bgImage="/images/Rectangle-40475.png"
							bgRepeat="no-repeat"
							bgSize="cover"
							py="5"
							px="6"
							position="relative"
						>
							<Img
								src="/images/cali-background-texture.png"
								position="absolute"
								top="0"
								left="0"
								w="100%"
								h="100%"
							/>
							<Text fontSize="xl" fontWeight="medium" position="relative">
								{translate('chooseTheBetter')}
							</Text>
							<Text fontSize="xl" fontWeight="medium" position="relative">
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
									<Text
										fontSize="sm"
										fontWeight="medium"
										color={theme.text.black2}
										py="4"
									>
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
									<Text
										fontSize="sm"
										fontWeight="medium"
										color={theme.text.black2}
										py="4"
									>
										{translate('scheduleAMeeting')}
									</Text>
								</Flex>
							</Flex>
						</ModalBody>

						<Flex justifyContent="center" pb="6">
							<Text color={theme.text.black2} fontSize="sm">
								{translate('orYouCan')}
								&nbsp;
							</Text>
							<Text
								color={theme.text.black2}
								as="u"
								fontSize="sm"
								fontWeight="semibold"
							>
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
