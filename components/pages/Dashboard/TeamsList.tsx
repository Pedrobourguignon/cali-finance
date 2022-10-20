/* eslint-disable no-shadow */
import { Box, Flex, IconButton, useBreakpointValue } from '@chakra-ui/react';
import Slider from 'react-slick';
import React from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { TeamCard } from './Cards';

const settings = {
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
		teamName: 'Sobrancheila ',
		funds: '$5,234.1',
		members: 13,
	},
	{
		teamName: 'Aucelora ',
		funds: '$5,234.1',
		members: 13,
	},
];

export const TeamsList = () => {
	const [slider, setSlider] = React.useState<Slider | null>(null);
	const top = useBreakpointValue({ base: '90%', md: '50%' });
	const side = useBreakpointValue({ base: '30%', md: '-10px' });
	const sideLeft = useBreakpointValue({ base: '30%', md: '-27px' });

	return (
		<Box position="relative">
			<link
				rel="stylesheet"
				type="text/css"
				charSet="UTF-8"
				href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
			/>
			<link
				rel="stylesheet"
				type="text/css"
				href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
			/>
			<IconButton
				w="8"
				border="1px solid"
				bg="white"
				aria-label="left-arrow"
				position="absolute"
				left={side}
				top={top}
				transform="translate(0%, -50%)"
				zIndex={1}
				onClick={() => slider?.slickPrev()}
			>
				<BsChevronCompactLeft />
			</IconButton>
			<IconButton
				border="1px solid"
				aria-label="right-arrow"
				position="absolute"
				bg="white"
				right={side}
				top={top}
				transform="translate(0%, -50%)"
				zIndex={2}
				_focus={{ bg: 'white' }}
				onClick={() => slider?.slickNext()}
			>
				<BsChevronCompactRight />
			</IconButton>
			{/* Slider */}
			<Flex w="720px" display="block" bg="white">
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
	);
};

export default TeamsList;
