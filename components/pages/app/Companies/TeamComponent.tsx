/* eslint-disable no-nested-ternary */
import {
	Button,
	CircularProgress,
	Flex,
	FormControl,
	Icon,
	Img,
	Input,
	Text,
	useDisclosure,
} from '@chakra-ui/react';
import { useCompanies, usePicasso, useTeams } from 'hooks';
import { AppLayout, CompanyWhiteBackground } from 'layouts';
import {
	ActiveTeamsBar,
	BackToTeams,
	DeleteTeamModal,
	EmployeesDashboard,
	ImageUploaderModal,
	CompaniesHeader,
} from 'components';
import router from 'next/router';
import { navigationPaths } from 'utils';
import { BsCardImage, BsCheck } from 'react-icons/bs';
import { AiOutlineEdit } from 'react-icons/ai';
import { useCallback, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';

interface ITeamEdit {
	name?: string;
	picture?: string;
	description?: string;
}

export const TeamComponent = () => {
	const theme = usePicasso();
	const { register, handleSubmit } = useForm();
	const { teamPicture, setTeamPicture, teamData } = useTeams();
	const { selectedCompany } = useCompanies();
	const [editable, setEditable] = useState(false);
	const [editedTeamData, setEditedTeamData] = useState<ITeamEdit>({
		picture: teamData.photo,
		description: teamData.description,
		name: teamData.name,
	} as ITeamEdit);
	const [showSaved, setShowSaved] = useState(false);
	const [showSaving, setShowSaving] = useState(false);
	const editableComponents = useRef(null);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const {
		isOpen: isOpenDeleteTeam,
		onOpen: onOpenDeleteTeam,
		onClose: onCloseDeleteTeam,
	} = useDisclosure();

	const handleEditTeam = useCallback(
		(team: ITeamEdit) => {
			setShowSaved(false);
			setShowSaving(true);
			setEditedTeamData({
				name: team.name,
				description: team.description,
				picture: teamPicture,
			});
			setTimeout(() => {
				setShowSaving(false);
				setShowSaved(true);
			}, 15000);
		},
		[teamPicture]
	);
	const handleFinishEdit = () => {
		setEditable(false);
		setShowSaving(false);
		setShowSaved(false);
	};

	return (
		<AppLayout right={<ActiveTeamsBar />}>
			<CompanyWhiteBackground />
			<Flex pt="6" zIndex="docked" direction="column" align="start">
				<CompaniesHeader />
			</Flex>
			<form onChange={handleSubmit(handleEditTeam)}>
				<FormControl>
					<Flex direction="column" px="6" gap="2">
						<Flex
							align="start"
							color={theme.text.primary}
							py="10"
							direction="column"
							gap="4"
						>
							<Flex direction="column" w="100%" align="start" gap="4">
								<Flex justify="space-between" w="100%">
									<BackToTeams
										onClick={() =>
											router.push(
												navigationPaths.dashboard.companies.teams('1')
											)
										}
									/>
									{showSaving && (
										<Flex align="center" color={theme.branding.blue} gap="1.5">
											<CircularProgress
												isIndeterminate
												color={theme.branding.blue}
												size="4"
											/>
											<Text fontSize="xs">Saving...</Text>
										</Flex>
									)}
									{showSaved && (
										<Flex align="center" color={theme.branding.blue}>
											<Icon as={BsCheck} boxSize="6" />
											<Text fontSize="xs">Saved</Text>
										</Flex>
									)}
								</Flex>
								<ImageUploaderModal
									isOpen={isOpen}
									onClose={onClose}
									sendImage={setTeamPicture}
								/>
								<Flex
									borderRadius="base"
									borderColor="black"
									border="1px solid black"
									py="3"
									pl="3"
									w="full"
									justify="space-between"
									ref={editableComponents}
								>
									<Flex align="center" w="48">
										{!editable ? (
											<Img src={teamPicture} boxSize="10" rounded="full" />
										) : (
											<Button
												bgImage={teamPicture}
												bgSize="cover"
												bgRepeat="no-repeat"
												_hover={{ opacity: '80%' }}
												_active={{}}
												_focus={{}}
												borderRadius="full"
												boxSize="10"
												onClick={onOpen}
											>
												<Icon as={BsCardImage} color="white" />
											</Button>
										)}
										{editable ? (
											<Input
												_focusVisible={{}}
												placeholder="Insert Team Name Here *"
												defaultValue={teamData.name && teamData.name}
												_placeholder={{ fontSize: 'md', color: 'gray.500' }}
												border="none"
												color={theme.text.primary}
												{...register('name')}
												onBlur={handleFinishEdit}
											/>
										) : (
											<Text alignSelf="center" fontWeight="medium" pl="3">
												{teamData.name}
											</Text>
										)}
										{!editable && (
											<Button p="0" onClick={() => setEditable(true)}>
												<Icon as={AiOutlineEdit} color="gray.500" />
											</Button>
										)}
									</Flex>

									<Flex direction="column">
										<Text color="gray.500" fontSize="xs">
											Funds
										</Text>
										<Text color={theme.text.primary} fontSize="sm">
											${teamData.funds?.toLocaleString('en-US')}
										</Text>
									</Flex>
									<Flex direction="column">
										<Text color="gray.500" fontSize="xs">
											Members
										</Text>
										<Text color={theme.text.primary} fontSize="sm">
											{teamData.members}
										</Text>
									</Flex>
									<Flex direction="column" pr="8">
										<Text color="gray.500" fontSize="xs">
											Withdrawals this month
										</Text>
										<Text color={theme.text.primary} fontSize="sm">
											${teamData.withdrawals?.toLocaleString('en-US')}
										</Text>
									</Flex>
								</Flex>
							</Flex>
							<Flex w="full">
								{editable ? (
									<Input
										_focusVisible={{}}
										placeholder="You can insert team’s description here if you want to."
										defaultValue={teamData.description && teamData.description}
										_placeholder={{ fontSize: 'md', color: 'gray.500' }}
										border="none"
										color={theme.text.primary}
										p="0"
										{...register('description')}
										onBlur={handleFinishEdit}
									/>
								) : teamData.description ? (
									<Text fontSize="sm">{teamData.description}</Text>
								) : (
									<Text fontSize="md" color="gray.500">
										You can insert team’s description here if you want to.
									</Text>
								)}
							</Flex>
						</Flex>
						<Flex direction="column" gap="12">
							<EmployeesDashboard isGeneral={false} />

							<Button
								color={theme.text.primary}
								borderWidth="1px"
								borderColor={theme.bg.primary}
								borderRadius="base"
								px="6"
								py="1"
								w="max-content"
								h="max-content"
								fontWeight="medium"
								fontSize="xs"
								onClick={onOpenDeleteTeam}
							>
								Delete Team
							</Button>
						</Flex>
					</Flex>
				</FormControl>
			</form>
			<DeleteTeamModal
				isOpen={isOpenDeleteTeam}
				onClose={onCloseDeleteTeam}
				teamName={teamData.name}
			/>
		</AppLayout>
	);
};
