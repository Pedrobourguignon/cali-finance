import {
	Button,
	Flex,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Text,
} from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';

interface IDeleteTeamModal {
	isOpen: boolean;
	onClose: () => void;
	teamName: string;
}

export const DeleteTeamModal: React.FC<IDeleteTeamModal> = ({
	isOpen,
	onClose,
	teamName,
}) => {
	const theme = usePicasso();
	const { t: translate } = useTranslation('dashboard');
	const [insertedTeam, setInsertedTeam] = useState('');

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<Flex
					borderRadius="base"
					borderWidth="0.1rem"
					borderColor={theme.bg.primary}
					direction="column"
					bg="white"
				>
					<ModalHeader
						color={theme.text.primary}
						fontSize="lg"
						fontWeight="semibold"
					>
						Delete Team
					</ModalHeader>
					<ModalCloseButton color="gray.400" />
					<ModalBody>
						<Text color="red.500" pb="6" fontSize="sm">
							Are you sure you want to
							<Text color="red.500" fontWeight="bold" as="span">
								&nbsp;delete the {teamName} team?
							</Text>
							<Text>Please note that this action cannot be undone.</Text>
						</Text>
						<Flex direction="column" gap="2">
							<Text
								color={theme.text.primary}
								fontSize="xs"
								fontWeight="medium"
							>
								Insert the team name to confirm
							</Text>
							<Input
								type="text"
								borderRadius="base"
								borderColor={theme.text.primary}
								_hover={{}}
								color={theme.text.primary}
								onChange={team => setInsertedTeam(team.target.value)}
							/>
						</Flex>
					</ModalBody>
					<Flex p="6">
						<Button
							disabled={insertedTeam !== teamName}
							color="white"
							bg="black"
							fontSize="md"
							borderRadius="sm"
							fontWeight="medium"
							w="full"
							_hover={{}}
							_active={{}}
							_focus={{}}
						>
							Delete Team
						</Button>
					</Flex>
				</Flex>
			</ModalContent>
		</Modal>
	);
};
export default DeleteTeamModal;
