import {
	Flex,
	Icon,
	Img,
	Link,
	ModalBody,
	ModalCloseButton,
	ModalHeader,
	Text,
} from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import useTranslation from 'next-translate/useTranslation';
import { FaDiscord } from 'react-icons/fa';
import { IBasicModal } from 'types';
import { navigationPaths, socialMediaLinks } from 'utils';
import NextLink from 'next/link';
import { MobileModalLayout } from 'layouts';

export const ContactOptionsModalMobile: React.FC<IBasicModal> = ({
	isOpen,
	onClose,
}) => {
	const { t: translate } = useTranslation('have-a-problem');
	const theme = usePicasso();

	return (
		<MobileModalLayout isOpen={isOpen} onClose={onClose}>
			<Flex
				direction="column"
				bg={theme.bg.modal}
				borderTopRadius="2xl"
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
					borderTopRadius="inherit"
				>
					<Img
						borderTopRadius="inherit"
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
						onClick={() => window.open(socialMediaLinks.discord)}
						gap="4"
						borderRadius="base"
						border="1px solid"
						borderColor="blackAlpha.200"
					>
						<Flex align="center" gap="4" pl="4">
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
						</Flex>
					</Flex>
					<Flex
						gap="4"
						borderRadius="base"
						border="1px solid"
						borderColor="blackAlpha.200"
						onClick={() => window.open(socialMediaLinks.discord)}
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
				<Flex justifyContent="center" pt="4" pb="10">
					<Text color={theme.text.black2} fontSize="sm">
						{translate('orYouCan')}
						&nbsp;
					</Text>
					<Link
						as={NextLink}
						href={navigationPaths.docs}
						color={theme.text.black2}
						textDecoration="underline"
						fontSize="sm"
						fontWeight="semibold"
					>
						{translate('sendUsAEmail')}
					</Link>
				</Flex>
			</Flex>
		</MobileModalLayout>
	);
};

export default ContactOptionsModalMobile;
