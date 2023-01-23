import { Box, Flex, Text } from '@chakra-ui/react';
import Slider from 'react-slick';
import React, { useState, useRef } from 'react';
import { OrganizationCard, Paginator } from 'components';
import { ITeamsList } from 'types';
import { useOrganizations } from 'hooks';

const teamList: ITeamsList[] = [
	{
		name: 'Kylie Cosmetics',
		funds: '$2,234.05',
		members: 2,
	},
	{
		name: 'Kylie Skin',
		funds: '$92,234,11',
		members: 170,
	},
	{
		name: 'Kylie Baby',
		funds: '$5,234.1',
		members: 13,
	},
	{
		name: 'Sapo Cugugu',
		funds: '$5,234.1',
		members: 13,
	},
	{
		name: '5',
		funds: '$2,234.05',
		members: 2,
	},
	{
		name: '6',
		funds: '$2,234.05',
		members: 2,
	},
];

export const OrganizationsList = () => {
	const ref = useRef<HTMLDivElement>(null);
	const [slider, setSlider] = React.useState<Slider | null>(null);
	const { organizations } = useOrganizations();
	const [actualPage, setActualPage] = useState(1);
	const maxPage = teamList.length - 2;

	const previousPage = () => {
		setActualPage(actualPage - 1);
		slider?.slickPrev();
	};

	const nextPage = () => {
		setActualPage(actualPage + 1);
		slider?.slickNext();
	};

	const settings = {
		// responsive: [
		// 	{
		// 		breakpoint: 1024,
		// 		settings: {
		// 			slidesToShow: 4,
		// 			slidesToScroll: 3,
		// 			infinite: true,
		// 			dots: true,
		// 		},
		// 	},
		// ],
		infinite: false,
		speed: 500,
		slidesToShow: ref.current?.clientWidth === 1008 ? 4 : 3,
		slidesToScroll: 1,
	};

	console.log(ref.current?.clientWidth);

	return (
		<Flex direction="column" gap={{ md: '2', xl: '3' }}>
			<Flex justify="space-between" align="center" pt={{ xl: '4' }}>
				<Text
					fontSize={{ md: 'sm', xl: 'md' }}
					fontWeight="medium"
					color="#121212"
				>
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
				<Flex
					w={{ lg: '35.4rem', xl: '43.5rem', '2xl': '63rem' }}
					display="block"
					bg="transparent"
					ref={ref}
				>
					<Slider
						{...settings}
						ref={sliderRef => setSlider(sliderRef)}
						arrows={false}
						className="slider"
					>
						{organizations.map((team, index) => (
							<OrganizationCard key={+index} team={team} />
						))}
					</Slider>
				</Flex>
			</Box>
		</Flex>
	);
};

export default OrganizationsList;
