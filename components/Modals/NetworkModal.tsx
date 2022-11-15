import React from 'react';
import {
	Flex,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
	Text,
	Button,
	Img,
} from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import { INetworkModal } from 'types';
import useTranslation from 'next-translate/useTranslation';

export const NetworkModal: React.FC<INetworkModal> = ({
	isOpen,
	onClose,
	networks,
	setNetworkData,
}) => {
	const theme = usePicasso();
	const { t: translate } = useTranslation('sidebar');

	const handleSetNetworkData = (icon: string, name: string) => {
		setNetworkData({ name, icon });
		onClose();
	};
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent
				m="auto"
				zIndex="1"
				bg="white"
				borderWidth="1px"
				borderStyle="solid"
				borderColor="black"
				w="64"
				pb="4"
			>
				<Flex
					direction="column"
					w="full"
					bg={theme.bg.modal}
					borderRadius="base"
				>
					<ModalHeader
						display="flex"
						justifyContent="space-between"
						alignItems="center"
					>
						<Text color="black" fontSize="md" fontWeight="500">
							{translate('changeNetwork')}
						</Text>
						<ModalCloseButton
							color="gray.400"
							p="5"
							_hover={{ bg: 'transparent' }}
						/>
					</ModalHeader>
					<ModalBody display="flex" flexDirection="column" gap="2">
						{networks.map((network, index) => (
							<Flex
								key={+index}
								border="1px"
								borderColor="blackAlpha.200"
								borderStyle="solid"
								color={theme.text.mono}
								fontWeight="medium"
								borderRadius="base"
								py="3"
								bg="white"
								align="center"
							>
								<Button
									onClick={() =>
										handleSetNetworkData(network.icon, network.name)
									}
									gap="2"
									boxSize="full"
									justifyContent="left"
									bg="transparent"
								>
									<Img src={network.icon} boxSize="4" color="black" />
									<Text bg="transparent" fontSize="sm">
										{network.name}
									</Text>
								</Button>
							</Flex>
						))}
					</ModalBody>
				</Flex>
			</ModalContent>
		</Modal>
	);
};

export default NetworkModal;
