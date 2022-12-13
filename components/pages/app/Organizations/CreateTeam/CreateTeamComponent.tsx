import {
	Button,
	Flex,
	Icon,
	Input,
	Text,
	useDisclosure,
} from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import React, { useState } from 'react';
import { NoMembersSkeleton, NavigationBack, AddEmployee } from 'components';
import { navigationPaths } from 'utils';
import { BsCardImage } from 'react-icons/bs';

export const CreateTeamComponent = () => {
	const [teamName, setTeamName] = useState('');
	const theme = usePicasso();
	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<Flex direction="column" align="start">
			<AddEmployee isOpen={isOpen} onClose={onClose} company={teamName} />
			<NavigationBack
				href={navigationPaths.dashboard.organizations.home}
				fontSize="sm"
				padding="0"
			>
				Back to All Teams
			</NavigationBack>
			<Flex
				borderRadius="sm"
				borderColor="black"
				border="1px solid black"
				py="3"
				pl="3"
				w="full"
			>
				<Button
					bgImage="/images/addImageBg.png"
					bgSize="cover"
					bgRepeat="no-repeat"
					_hover={{ opacity: '80%' }}
					_active={{}}
					_focus={{}}
					borderRadius="full"
					boxSize="10"
				>
					<Icon as={BsCardImage} />
				</Button>
				<Input
					_focusVisible={{}}
					placeholder="Insert Team Name Here *"
					_placeholder={{ fontSize: 'md', color: 'gray.500' }}
					border="none"
					color={theme.text.primary}
					onChange={name => setTeamName(name.currentTarget.value)}
				/>
			</Flex>
			<Flex pt="4" w="full">
				<Input
					_focusVisible={{}}
					placeholder="You can insert team’s description here if you want to."
					_placeholder={{ fontSize: 'md', color: 'gray.500' }}
					border="none"
					color={theme.text.primary}
					p="0"
				/>
			</Flex>
			<Flex justify="space-between" w="full" align="center">
				<Text fontWeight="medium" color={theme.text.primary}>
					0 members
				</Text>
				<Button
					fontWeight="medium"
					color="white"
					bg={theme.bg.black}
					borderRadius="base"
					_hover={{ opacity: '80%' }}
					_active={{}}
					_focus={{}}
					gap="2.5"
					onClick={onOpen}
				>
					<Text>+</Text>
					Add Employee
				</Button>
			</Flex>
			<Flex w="full" pt="4" direction="column" pb="12" gap="2">
				<Flex justify="space-between">
					<Text fontSize="sm" color={theme.text.primary}>
						Name/Address
					</Text>
					<Text fontSize="sm" color={theme.text.primary}>
						Amount
					</Text>
				</Flex>
				<NoMembersSkeleton display="flex" />
			</Flex>
			<Button
				fontWeight="medium"
				color="white"
				bg={theme.bg.black}
				borderRadius="base"
				px="14"
				_hover={{ opacity: '80%' }}
				_active={{}}
				_focus={{}}
			>
				Create Team
			</Button>
		</Flex>
	);
};

export default CreateTeamComponent;
