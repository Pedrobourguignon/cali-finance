/* eslint-disable no-shadow */
import { Box, Flex, IconButton, useBreakpointValue } from '@chakra-ui/react';
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
	{
		teamName: 'Sobrancheila Design',
		funds: '$5,234.1',
		members: 13,
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
	const top = useBreakpointValue({ base: '90%', md: '50%' });
	const side = useBreakpointValue({ base: '30%', md: '1px' });

	return (
		<Box position="relative" w="full">
			{/* CSS files for react-slick */}
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
			{/* Left Icon */}
			<IconButton
				aria-label="left-arrow"
				colorScheme="messenger"
				borderRadius="full"
				position="absolute"
				left={side}
				top={top}
				transform="translate(0%, -50%)"
				zIndex={2}
				onClick={() => slider?.slickPrev()}
			>
				<BiLeftArrowAlt />
			</IconButton>
			{/* Right Icon */}
			<IconButton
				aria-label="right-arrow"
				colorScheme="messenger"
				borderRadius="full"
				position="absolute"
				right={side}
				top={top}
				transform="translate(0%, -50%)"
				zIndex={2}
				onClick={() => slider?.slickNext()}
			>
				<BiRightArrowAlt />
			</IconButton>
			{/* Slider */}
			<Flex w="xl" justify="center" display="block">
				<Slider {...settings} ref={slider => setSlider(slider)}>
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
