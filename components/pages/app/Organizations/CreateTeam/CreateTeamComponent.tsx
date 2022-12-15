import { Button, Flex, Icon, Input, Text } from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import React, { useState } from 'react';
import { NavigationBack, EmployeePanel } from 'components';
import { navigationPaths } from 'utils';
import { BsCardImage } from 'react-icons/bs';

export const CreateTeamComponent = () => {
	const [teamName, setTeamName] = useState('');
	const theme = usePicasso();
	return (
		<Flex direction="column" align="start">
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
				justify="space-between"
			>
				<Flex>
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
						w="max-content"
					/>
				</Flex>

				<Flex direction="column">
					<Text color="gray.500" fontSize="xs">
						Funds
					</Text>
					<Text color={theme.text.primary}>$0</Text>
				</Flex>
				<Flex direction="column">
					<Text color="gray.500" fontSize="xs">
						Members
					</Text>
					<Text color={theme.text.primary}>0</Text>
				</Flex>
				<Flex direction="column" pr="8">
					<Text color="gray.500" fontSize="xs">
						Withdrawals this month
					</Text>
					<Text color={theme.text.primary}>$0</Text>
				</Flex>
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
			<EmployeePanel teamName={teamName} />
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
				disabled={teamName === ''}
			>
				Create Team
			</Button>
		</Flex>
	);
};

export default CreateTeamComponent;
