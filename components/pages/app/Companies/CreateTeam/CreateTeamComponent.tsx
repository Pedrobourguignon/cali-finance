import {
	Button,
	Flex,
	FormControl,
	Icon,
	Input,
	Text,
	useDisclosure,
} from '@chakra-ui/react';
import { useCompanies, usePicasso, useTeams } from 'hooks';
import React, { useState } from 'react';
import { BackToTeams, EmployeePanel, ImageUploaderModal } from 'components';
import { BsCardImage } from 'react-icons/bs';
import useTranslation from 'next-translate/useTranslation';
import { useForm } from 'react-hook-form';
import { createTeamSchema } from 'utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { IEmployee } from 'types';

interface ICreateTeamComponent {
	display: string;
	changeToCreateTeamTab: () => void;
}

interface INewTeam {
	name: string;
	picture?: string;
	description?: string;
}

export const CreateTeamComponent: React.FC<ICreateTeamComponent> = ({
	display,
	changeToCreateTeamTab,
}) => {
	const [employees, setEmployees] = useState<IEmployee[]>([]);
	const [newTeamPicture, setNewTeamPicture] = useState('');
	const theme = usePicasso();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm<INewTeam>({
		resolver: yupResolver(createTeamSchema),
	});
	const { setNewTeam, newTeam } = useTeams();
	const { t: translate } = useTranslation('create-team');

	const handleCreateTeam = (team: INewTeam) => {
		setNewTeam({
			name: team.name,
			picture: newTeamPicture,
			description: team.description,
		});
		console.log(newTeam);
	};
	return (
		<Flex direction="column" align="start" display={display} w="100%">
			<BackToTeams onClick={changeToCreateTeamTab} />
			<form onSubmit={handleSubmit(handleCreateTeam)}>
				<FormControl>
					<Flex direction="column" w="100%">
						<Flex
							borderRadius="base"
							borderColor="black"
							border="1px solid black"
							py="3"
							pl="3"
							w="100%"
							gap="20"
						>
							<Flex>
								<Button
									bgImage={
										!newTeamPicture ? '/images/addImageBg.png' : newTeamPicture
									}
									bgSize="cover"
									bgRepeat="no-repeat"
									_hover={{ opacity: '80%' }}
									_active={{}}
									_focus={{}}
									borderRadius="full"
									boxSize="10"
									onClick={onOpen}
								>
									{!newTeamPicture && <Icon as={BsCardImage} />}
								</Button>
								<Input
									_focusVisible={{}}
									placeholder={translate('insertTeamName')}
									_placeholder={{ fontSize: 'md', color: 'gray.500' }}
									border="none"
									color={theme.text.primary}
									w="max-content"
									{...register('name')}
								/>
								<Text
									fontSize="xs"
									color="red"
									position="absolute"
									top="12"
									left="16"
								>
									{errors.name?.message}
								</Text>
							</Flex>

							<Flex direction="column">
								<Text color="gray.500" fontSize="xs">
									{translate('funds')}
								</Text>
								<Text color={theme.text.primary} fontSize="sm">
									$0
								</Text>
							</Flex>
							<Flex direction="column">
								<Text color="gray.500" fontSize="xs">
									{translate('members')}
								</Text>
								<Text color={theme.text.primary} fontSize="sm">
									0
								</Text>
							</Flex>
							<Flex direction="column" pr="8">
								<Text color="gray.500" fontSize="xs">
									{translate('withdrawalsThisMonth')}
								</Text>
								<Text color={theme.text.primary} fontSize="sm">
									$0
								</Text>
							</Flex>
						</Flex>
						<Flex pt="4" w="full">
							<Input
								_focusVisible={{}}
								placeholder={translate('descriptionPlaceholder')}
								_placeholder={{ fontSize: 'md', color: 'gray.500' }}
								border="none"
								color={theme.text.primary}
								p="0"
								{...register('description')}
							/>
						</Flex>
						<EmployeePanel setEmployees={setEmployees} employees={employees} />
						<Button
							fontWeight="medium"
							color="white"
							bg={theme.bg.black}
							borderRadius="base"
							px="14"
							_hover={{ opacity: '80%' }}
							_active={{}}
							_focus={{}}
							h="max-content"
							py="1.5"
							disabled={!isValid}
							type="submit"
						>
							{translate('createTeam')}
						</Button>
					</Flex>
				</FormControl>
			</form>
		</Flex>
	);
};

export default CreateTeamComponent;
