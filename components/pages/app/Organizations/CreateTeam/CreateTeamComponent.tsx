import { Button, Flex, Icon, Input, Text } from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import React, { useState } from 'react';
import { EmployeePanel } from 'components';
import { BsCardImage } from 'react-icons/bs';
import { IoIosArrowBack } from 'react-icons/io';
import useTranslation from 'next-translate/useTranslation';

interface ICreateTeamComponent {
	display: string;
	changeToCreateTeamTab: () => void;
}

export const CreateTeamComponent: React.FC<ICreateTeamComponent> = ({
	display,
	changeToCreateTeamTab,
}) => {
	const [teamName, setTeamName] = useState('');
	const theme = usePicasso();
	const { t: translate } = useTranslation('create-team');
	return (
		<Flex direction="column" align="start" display={display} w="100%">
			<Button
				px="0"
				color="gray.500"
				leftIcon={<IoIosArrowBack />}
				onClick={changeToCreateTeamTab}
				fontSize="sm"
				lineHeight="6"
				fontWeight="medium"
				p="0"
			>
				{translate('backToAllTeams')}
			</Button>
			<Flex
				borderRadius="base"
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
						placeholder={translate('insertTeamName')}
						_placeholder={{ fontSize: 'md', color: 'gray.500' }}
						border="none"
						color={theme.text.primary}
						onChange={name => setTeamName(name.currentTarget.value)}
						w="max-content"
					/>
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
				{translate('createTeam')}
			</Button>
		</Flex>
	);
};

export default CreateTeamComponent;
