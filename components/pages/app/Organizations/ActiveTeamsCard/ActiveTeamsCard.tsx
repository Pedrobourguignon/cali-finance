import { Flex, Img, Link, LinkBox, LinkOverlay, Text } from '@chakra-ui/react';
import React from 'react';
import { usePicasso } from 'hooks';
import { LinearProgressBar } from 'components/ProgressBar';
import useTranslation from 'next-translate/useTranslation';
import { SurplusTeams } from '../SurplusTeams';
import { TeamsData } from './TeamsData';

interface INewTeam {
	name: string;
	percent: string;
	color: string;
}
const teams = [
	{
		name: 'Finance',
		icon: '/images/team1.png',
		members: 30,
		color: 'red',
	},
	{
		name: 'Sales',
		icon: '/images/team2.png',
		members: 10,
		color: 'blue',
	},
	{
		name: 'UI Design',
		icon: '/images/team3.png',
		members: 50,
		color: 'green',
	},
	{
		name: 'Dev',
		icon: '/images/team4.png',
		members: 90,
		color: 'pink',
	},
	{
		name: 'Project',
		icon: '/images/team3.png',
		members: 120,
		color: 'purple',
	},
	{
		name: 'Cleaning',
		icon: '/images/team4.png',
		members: 150,
		color: 'black',
	},
];
export const ActiveTeamsCard = () => {
	const theme = usePicasso();
	const { t: translate } = useTranslation('organization-overall');
	const totalMembers = teams.reduce((acc, team) => acc + team.members, 0);
	const newTeam = teams.map(
		item =>
			({
				name: item.name,
				percent: `${((item.members * 100) / totalMembers).toFixed(0)}%`,
				color: item.color,
			} as INewTeam)
	);

	return (
		<Flex
			direction="column"
			px="4"
			py="2.5"
			w="64"
			h="max-content"
			bg="white"
			borderRadius="base"
			gap="3"
		>
			<Flex justify="space-between">
				<Text color="black" fontSize="md" fontWeight="medium">
					{translate('activeTeams')}
				</Text>
				<Text fontSize="xs" color={theme.branding.blue} fontWeight="medium">
					{translate('seeAll')}
				</Text>
			</Flex>
			<Flex direction="column" gap="9">
				<Flex>
					{teams.slice(0, 4).map((item, index) => (
						<Img src={item.icon} key={+index} boxSize="6" />
					))}
					{teams.length > 4 ? <SurplusTeams quantity={teams.length - 4} /> : ''}
				</Flex>
				<Flex direction="column" maxW="60" px="3" gap="3">
					<LinearProgressBar>
						{newTeam.map((item, index) => (
							<Flex
								_first={{ borderLeftRadius: 'xl' }}
								_last={{ borderRightRadius: 'xl' }}
								key={+index}
								w={item.percent}
								bg={item.color}
								h="1.5"
							/>
						))}
					</LinearProgressBar>
					<Flex flexWrap="wrap" gap="7">
						{newTeam.map((item, index) => (
							<TeamsData
								key={+index}
								color={item.color}
								percentage={item.percent}
								name={item.name}
							/>
						))}
					</Flex>
				</Flex>
			</Flex>
		</Flex>
	);
};
