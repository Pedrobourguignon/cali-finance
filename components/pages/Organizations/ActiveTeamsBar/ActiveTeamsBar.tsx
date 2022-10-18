import {
	Flex,
	GridItem,
	Img,
	LinkBox,
	LinkOverlay,
	Text,
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { usePicasso } from 'hooks';
import NextLink from 'next/link';
import { LinearProgressBar } from 'components/LinearProgressBar';
import { SurplusTeams } from '../SurplusTeamsIcon';
import { TeamsData } from './TeamsData';

interface INewTeam {
	name: string;
	percent: number;
}
interface IMember {
	member: number;
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
		name: 'Dev',
		icon: '/images/team4.png',
		members: 80,
		color: 'gray',
	},
	{
		name: 'Dev',
		icon: '/images/team4.png',
		members: 70,
		color: 'purple',
	},
];
export const ActiveTeamsBar = () => {
	const theme = usePicasso();
	const [totalMembers, setTotalMembers] = useState();
	const [newTeam, setNewTeam] = useState<INewTeam[]>([]);

	useEffect(() => {
		// eslint-disable-next-line array-callback-return
		teams.map(item => {
			// setTotalMembers(item.members);
			// const percentage = (item.members * 100) / totalMembers;
			const newArray = {
				name: item.name,
				// percent: percentage,
			};
			// setNewTeam(prevState => [...prevState, newArray]);
		});
	}, []);
	console.log(totalMembers);
	console.log(newTeam);
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
						<Flex w="20%" bg="red" h="1.5" />
						<Flex w="35%" bg="blue" h="1.5" />
					</LinearProgressBar>
					<Flex flexWrap="wrap" gap="7">
						<TeamsData color="black" percentage={30} name="marketing" />
						<TeamsData color="blue" percentage={30} name="finance" />
					</Flex>
				</Flex>
			</Flex>
		</Flex>
	);
};
