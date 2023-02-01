import { Box, Flex, Text } from '@chakra-ui/react';
import Slider from 'react-slick';
import React, { useState, useRef } from 'react';
import { CompanyCard, Paginator } from 'components';
import { ITeamsList } from 'types';
import { useCompanies, usePicasso } from 'hooks';
import useTranslation from 'next-translate/useTranslation';

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
	const ref = useRef<HTMLDivElement>(null);
	const [slider, setSlider] = React.useState<Slider | null>(null);
	const { companies } = useCompanies();
	const [actualPage, setActualPage] = useState(1);
	const maxPage = teamList.length - 2;
	const theme = usePicasso();

	const previousPage = () => {
		setActualPage(actualPage - 1);
		slider?.slickPrev();
	};

	const nextPage = () => {
		setActualPage(actualPage + 1);
		slider?.slickNext();
	};

	const settings = {
		infinite: false,
		speed: 500,
		slidesToShow: ref.current?.clientWidth === 1008 ? 4 : 3,
		slidesToScroll: 1,
	};

	console.log(ref.current?.clientWidth);

	return (
		<Flex direction="column" gap={{ md: '2', xl: '3' }}>
			<Flex justify="space-between" align="center" pt="4">
				<Text
					fontSize={{ md: 'sm', xl: 'md' }}
					fontWeight="medium"
					color={theme.text.primary}
				>
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
