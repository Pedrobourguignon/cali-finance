import { Box, Flex, Text } from '@chakra-ui/react';
import Slider from 'react-slick';
import React, { useState, useRef, useEffect } from 'react';
import { CompanyCard, CompanyCardSkeleton, Paginator } from 'components';
import { useCompanies, usePicasso } from 'hooks';
import useTranslation from 'next-translate/useTranslation';
import { useQuery } from 'react-query';
import { ICompany } from 'types/interfaces/main-server/ICompany';

export const CompaniesList = () => {
	const ref = useRef<HTMLDivElement>(null);
	const { t: translate } = useTranslation('dashboard');
	const [slider, setSlider] = React.useState<Slider | null>(null);
	const [actualPage, setActualPage] = useState(1);
	const [fetchCompanies, setFetchCompanies] = useState<ICompany[]>([]);

	const theme = usePicasso();

	const { getAllUserCompanies } = useCompanies();

	const {
		data: companies,
		isLoading: isLoadingCompanies,
		error,
	} = useQuery('all-companies', getAllUserCompanies);

	useEffect(() => {
		setFetchCompanies(companies!);
	}, [companies]);

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

	return (
		<Flex direction="column" gap="4" pt="10">
			<Flex justify="space-between" align="center">
				<Text fontSize="md" fontWeight="medium" color={theme.text.primary}>
					{translate('yourCompanies')}
				</Text>
				<Paginator
					actualPage={actualPage}
					maxPage={companies ? companies!.length - 2 : 0}
					previous={previousPage}
					next={nextPage}
				/>
			</Flex>
			<Box position="relative">
				<Flex w="43.5rem" display="block" bg="transparent">
					<Slider
						{...settings}
						ref={sliderRef => setSlider(sliderRef)}
						arrows={false}
						className="slider"
					>
						{isLoadingCompanies && <CompanyCardSkeleton />}
						{companies?.map((companie, index) => (
							<CompanyCard
								key={+index}
								companie={companie}
								members={17}
								userCompanies={fetchCompanies}
							/>
						))}
					</Slider>
				</Flex>
			</Box>
		</Flex>
	);
};

export default CompaniesList;
