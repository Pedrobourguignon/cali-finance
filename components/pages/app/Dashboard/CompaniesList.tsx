import { Box, Flex, Text } from '@chakra-ui/react';
import Slider from 'react-slick';
import React, { useState } from 'react';
import { CompanyCard, Paginator } from 'components';
import { ITeamsList } from 'types';
import { useCompanies } from 'hooks';

const settings = {
	infinite: false,
	speed: 500,
	slidesToShow: 3,
	slidesToScroll: 1,
};

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

export const CompaniesList = () => {
	const [slider, setSlider] = React.useState<Slider | null>(null);
	const { companies } = useCompanies();
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

	return (
		<Flex direction="column" gap="3">
			<Flex justify="space-between" align="center" pt="4">
				<Text fontSize="16" fontWeight="medium" color="#121212">
					Your Companies
				</Text>
				<Paginator
					actualPage={actualPage}
					maxPage={maxPage}
					previous={previousPage}
					next={nextPage}
				/>
			</Flex>
			<Box position="relative">
				<Flex w="46rem" display="block" bg="transparent">
					<Slider
						{...settings}
						ref={sliderRef => setSlider(sliderRef)}
						arrows={false}
						className="slider"
					>
						{companies.map((team, index) => (
							<CompanyCard key={+index} team={team} />
						))}
					</Slider>
				</Flex>
			</Box>
		</Flex>
	);
};

export default CompaniesList;
