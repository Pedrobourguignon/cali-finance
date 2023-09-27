import {
	Flex,
	Icon,
	Img,
	Link,
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
import { navigationPaths, socialMediaLinks } from 'utils';
import NextLink from 'next/link';

export const ContactOptionsModal: React.FC<IBasicModal> = ({
	isOpen,
	onClose,
}) => {
	const { t: translate } = useTranslation('have-a-problem');
	const theme = usePicasso();

	return (
		<Modal isOpen={isOpen} onClose={onClose} size="sm" isCentered>
			<ModalOverlay />
			<ModalContent w="max-content">
				<OffsetShadow top="0.5rem" left="0.5rem" width="22.2rem">
					<Flex
						direction="column"
						bg={theme.bg.modal}
						borderRadius="base"
						w="full"
						borderWidth="1px"
						borderColor={theme.bg.primary}
					>
						<ModalHeader
							bgImage="/images/haveproblem.png"
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
								<Link
									display="flex"
									href={socialMediaLinks.discord}
									alignItems="center"
									gap="4"
									pl="4"
									target="_blank"
									as={NextLink}
								>
									<Icon
										as={FaDiscord}
										color={theme.branding.discordIcon}
										boxSize="6"
									/>
									<Text
										fontSize="sm"
										fontWeight="medium"
										color={theme.text.black2}
										py="4"
									>
										{translate('openAService')}
									</Text>
								</Link>
							</Flex>
							<Flex
								gap="4"
								borderRadius="base"
								border="1px solid"
								borderColor="blackAlpha.200"
							>
								<Link
									display="flex"
									href={socialMediaLinks.discord}
									alignItems="center"
									gap="4"
									pl="4"
									target="_blank"
									as={NextLink}
								>
									<Img src="/images/schedule.png" boxSize="6" />
									<Text
										fontSize="sm"
										fontWeight="medium"
										color={theme.text.black2}
										py="4"
									>
										{translate('scheduleAMeeting')}
									</Text>
								</Link>
							</Flex>
						</ModalBody>

						<Flex justifyContent="center" pb="6">
							<Text color={theme.text.black2} fontSize="sm">
								{translate('orYouCan')}
								&nbsp;
							</Text>
							<Link
								as={NextLink}
								href={socialMediaLinks.email}
								color={theme.text.black2}
								textDecoration="underline"
								fontSize="sm"
								fontWeight="semibold"
							>
								{translate('sendUsAEmail')}
							</Link>
						</Flex>
					</Flex>
				</OffsetShadow>
			</ModalContent>
		</Modal>
	);
};

export default ContactOptionsModal;
