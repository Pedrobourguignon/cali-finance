/* eslint-disable no-shadow */
import { Box, Flex, IconButton } from '@chakra-ui/react';
import Slider from 'react-slick';
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
import React from 'react';
import { usePicasso } from 'hooks';
import { TeamCard } from './Cards';

const settings = {
	dots: true,
	infinite: true,
	speed: 500,
	slidesToShow: 3,
	slidesToScroll: 1,
};

const teamList = [
	{
		teamName: 'Bar do Zé',
		funds: '$2,234.05',
		members: 2,
	},
	{
		teamName: 'Cabeleleila Leia',
		funds: '$92,234,11',
		members: 170,
	},
	{
		teamName: 'Sobrancheila Design',
		funds: '$5,234.1',
		members: 13,
	},
];

export const TeamsList = () => {
	const theme = usePicasso();
	const [slider, setSlider] = React.useState<Slider | null>(null);

	return (
		<Box
			overflow="hidden"
			bg="green.200"
			position="relative"
			w="full"
			h="600px"
		>
			<IconButton
				_hover={{ bg: theme.branding.blue, color: 'white' }}
				bg="white"
				aria-label="left-arrow"
				border="1px"
				zIndex={2}
				onClick={() => slider?.slickPrev()}
			>
				<BiLeftArrowAlt />
			</IconButton>
			<IconButton
				bg="white"
				_hover={{ bg: theme.branding.blue, color: 'white' }}
				aria-label="right-arrow"
				border="1px"
				zIndex={2}
				onClick={() => slider?.slickNext()}
			>
				<BiRightArrowAlt />
			</IconButton>
			<Flex w="96">
				<Slider {...settings} ref={slider => setSlider(slider)} arrows={false}>
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
	);
};

export default TeamsList;
