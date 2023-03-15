import { Box, Button, Flex, Text, Icon } from '@chakra-ui/react';
import Slider from 'react-slick';
import React, { useState, useRef, useEffect } from 'react';
import { CompanyCard, Paginator } from 'components';
import { ITeamsList } from 'types';
import { useCompanies, usePicasso } from 'hooks';
import useTranslation from 'next-translate/useTranslation';
import AliceCarousel from 'react-alice-carousel';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import 'react-alice-carousel/lib/alice-carousel.css';
import styles from '../../../../styles/companiesList.module.css';

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

const responsive = {
	0: { items: 1, itemsFit: 'fill' },
	768: { items: 2, itemsFit: 'fill' },
	1024: { items: 3, itemsFit: 'fill' },
	1280: { items: 3, itemsFit: 'fill' },
	1536: { items: 6, itemsFit: 'fill' },
};

export const CompaniesList = () => {
	// const ref = useRef<HTMLDivElement>(null);
	const carousel = useRef<AliceCarousel>(null);

	const [slider, setSlider] = React.useState<Slider | null>(null);
	const { companies } = useCompanies();
	const [actualPage, setActualPage] = useState(1);
	const maxPage = teamList.length - 2;
	const theme = usePicasso();

	const previousPage = () => {
		carousel?.current?.slidePrev();
		setActualPage(actualPage - 1);
		slider?.slickPrev();
	};

	const nextPage = () => {
		carousel?.current?.slideNext();
		setActualPage(actualPage + 1);
		slider?.slickNext();
	};

	const settings = {
		infinite: false,
		speed: 500,
		// slidesToShow: ref.current?.clientWidth === 1008 ? 4 : 3,
		slidesToShow: 4,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 3,
					infinite: true,
					dots: true,
				},
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					initialSlide: 2,
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	};
	const items = companies.map((team, index) => (
		<CompanyCard team={team} key={+index} />
	));

	return (
		<Flex direction="column" gap="4" pt="10">
			<Flex justify="space-between" align="center">
				<Text fontSize="md" fontWeight="medium" color={theme.text.primary}>
					Your Companies
				</Text>
				{/* <Paginator
					actualPage={actualPage}
					maxPage={maxPage}
					previous={previousPage}
					next={nextPage}
				/> */}
				<Flex align="center" gap="2">
					<Button
						onClick={event => carousel?.current?.slidePrev(event)}
						border="1px solid"
						bg="white"
						color={theme.text.primary}
						size="xs"
						boxSize="6"
					>
						<Icon as={AiOutlineLeft} />
					</Button>
					<Text
						w="max-content"
						h="max-content"
						fontWeight="medium"
						color={theme.text.primary}
						fontSize="xs"
					>
						1 of 3
					</Text>
					<Button
						onClick={event => carousel?.current?.slideNext(event)}
						border="1px solid"
						bg="white"
						color={theme.text.primary}
						size="xs"
						boxSize="6"
					>
						<Icon as={AiOutlineRight} />
					</Button>
				</Flex>
			</Flex>
			<Flex w={{ md: '540px', xl: '686px', '2xl': '911.2px' }}>
				<AliceCarousel
					// autoWidth
					key="carousel"
					responsive={responsive}
					controlsStrategy="alternate"
					ref={carousel}
					disableDotsControls
					disableButtonsControls
					// items={items}
					// infinite
					// renderPrevButton={() => <Button bg="blue.200">Previous Item</Button>}
					// renderNextButton={() => <Button bg="blue.200">Next Item</Button>}
				>
					{companies.map((team, index) => (
						<CompanyCard team={team} key={+index} />
					))}
				</AliceCarousel>
			</Flex>

			{/* <Box position="relative">
				<Flex w="1280px" display="block" bg="transparent">
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
			</Box> */}
		</Flex>
	);
};

export default CompaniesList;
