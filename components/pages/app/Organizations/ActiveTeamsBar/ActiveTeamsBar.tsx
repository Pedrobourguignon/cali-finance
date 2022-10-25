import { Flex, Img, LinkBox, LinkOverlay, Text } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { usePicasso } from 'hooks';
import NextLink from 'next/link';
import { LinearProgressBar } from 'components/ProgressBar';
import { SurplusTeams } from '../SurplusTeamsIcon';
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
export const ActiveTeamsBar = () => {
	const theme = usePicasso();
	const [totalMembers, setTotalMembers] = useState(0);
	const [newTeam, setNewTeam] = useState<INewTeam[]>([]);

	useEffect(() => {
		let total = 0;
		// eslint-disable-next-line array-callback-return
		teams.map(item => {
			total += item.members;
			setTotalMembers(total);
		});
	}, [teams]);

	useEffect(() => {
		const groupOfTeams: INewTeam[] = [];
		// eslint-disable-next-line array-callback-return
		teams.map(item => {
			const percentage = (item.members * 100) / totalMembers;
			const team: INewTeam = {
				name: item.name,
				percent: `${percentage.toFixed(0)}%`,
				color: item.color,
			};
			groupOfTeams.push(team);
		});
		setNewTeam(groupOfTeams);
	}, [totalMembers]);

	return (
		<Flex
			direction="column"
			w="100%"
			px="4"
			py="2.5"
			bg="white"
			borderRadius="base"
			gap="3"
		>
			<Flex justify="space-between">
				<Text color="black" fontSize="md" fontWeight="medium">
					Active Teams
				</Text>
				<LinkBox>
					<NextLink href="/">
						<LinkOverlay
							fontSize="xs"
							color={theme.branding.blue}
							fontWeight="medium"
						>
							See All
						</LinkOverlay>
					</NextLink>
				</LinkBox>
			</Flex>
			<Flex direction="column" gap="9">
				<Flex>
					{teams.slice(0, 4).map((item, index) => (
						<Img src={item.icon} key={index} boxSize="6" />
					))}
					{teams.length > 4 ? <SurplusTeams quantity={teams.length - 4} /> : ''}
				</Flex>
				<Flex direction="column" maxW="60" px="3" gap="3">
					<LinearProgressBar>
						{newTeam.map((item, index) => (
							<Flex
								_first={{ borderLeftRadius: 'xl' }}
								_last={{ borderRightRadius: 'xl' }}
								key={index}
								w={item.percent}
								bg={item.color}
								h="1.5"
							/>
						))}
					</LinearProgressBar>
					<Flex flexWrap="wrap" gap="7">
						{newTeam.map((item, index) => (
							<TeamsData
								key={index}
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
