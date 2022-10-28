/* eslint-disable no-shadow */
import { Box, Flex, Text } from '@chakra-ui/react';
import Slider from 'react-slick';
import React, { useState, useCallback } from 'react';
import { Paginator, TeamCard } from 'components';
import { ITeamsList } from 'types';

const settings = {
	infinite: false,
	speed: 500,
	slidesToShow: 3,
	slidesToScroll: 1,
};

const teamList: ITeamsList[] = [
	{
		teamName: 'Kylie Cosmetics',
		funds: '$2,234.05',
		members: 2,
	},
	{
		teamName: 'Kylie Skin',
		funds: '$92,234,11',
		members: 170,
	},
	{
		teamName: 'Kylie Baby',
		funds: '$5,234.1',
		members: 13,
	},
	{
		teamName: 'Sapo Cugugu',
		funds: '$5,234.1',
		members: 13,
	},
	{
		teamName: '5',
		funds: '$2,234.05',
		members: 2,
	},
	{
		teamName: '6',
		funds: '$2,234.05',
		members: 2,
	},
];

export const TeamsList = () => {
	const [slider, setSlider] = React.useState<Slider | null>(null);
	const [actualPage, setActualPage] = useState(1);
	const [maxPage, setMaxPage] = useState(teamList.length - 2);

	const previousPage = useCallback(() => {
		setActualPage(actualPage - 1);
		slider?.slickPrev();
	}, [slider, actualPage]);

	const nextPage = useCallback(() => {
		setActualPage(actualPage + 1);
		slider?.slickNext();
	}, [slider, actualPage]);

	return (
		<Flex direction="column" gap="3">
			<Flex justify="space-between" align="center" pt="4">
				<Text fontSize="16" fontWeight="500">
					Your Organizations
				</Text>
				<Paginator
					actualPage={actualPage}
					maxPage={maxPage}
					previous={previousPage}
					next={nextPage}
				/>
			</Flex>
			<Box position="relative">
				<Flex w="43.4rem" display="block" bg="transparent">
					<Slider
						{...settings}
						ref={slider => setSlider(slider)}
						arrows={false}
						className="slider"
					>
						{teamList.map((team, index) => (
							<TeamCard
								key={+index}
								teamName={team.teamName}
								funds={team.funds}
								members={team.members}
							/>
						))}
					</Slider>
				</Flex>
			</Box>
		</Flex>
	);
};

export default TeamsList;
