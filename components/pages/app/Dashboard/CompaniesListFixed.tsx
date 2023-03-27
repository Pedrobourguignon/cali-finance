/* eslint-disable no-unused-expressions */
import { Button, Flex, Text, useDisclosure } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { CompanyCard } from 'components';
import { useCompanies, usePicasso } from 'hooks';
import useTranslation from 'next-translate/useTranslation';

export const CompaniesListFixed = () => {
	const theme = usePicasso();
	const [flexWidth, setFlexWidth] = useState<number>();
	const { isOpen: isFullList, onToggle: toggleListView } = useDisclosure();
	const { t: translate } = useTranslation('company-overall');
	const { companies } = useCompanies();

	useEffect(() => {
		window.onresize = (screen: any) => {
			if (screen.target.innerWidth < 1279) setFlexWidth(3);
			else if (
				screen.target.innerWidth > 1515 &&
				screen.target.innerWidth < 1768
			)
				setFlexWidth(4);
			else if (screen.target.innerWidth > 1700) setFlexWidth(5);
		};
	}, []);

	return (
		<Flex direction="column" pt="10">
			<Flex justify="space-between" align="center">
				<Text
					fontSize="md"
					fontWeight="medium"
					color={theme.text.primary}
					pb="4"
				>
					Your Companies
				</Text>
				<Button h="max-content" onClick={() => toggleListView()}>
					<Text fontSize="xs" color="gray.500" fontWeight="medium">
						{isFullList ? translate('seeLess') : translate('seeAll')}
					</Text>
				</Button>
			</Flex>
			<Flex
				justify={companies.length === 2 ? 'space-between' : 'flex-start'}
				wrap="wrap"
				gap={{ md: '4', '2xl': '6' }}
			>
				{companies
					.slice(0, isFullList ? companies.length : flexWidth)
					.map((team, index) => (
						<Flex key={+index}>
							<CompanyCard team={team} />
						</Flex>
					))}
			</Flex>
			{/* <Grid
				bg="red"
				gap={{ md: '24', lg: '4' }}
				justifyItems="space-between"
				w="full"
				templateColumns={{
					md: 'repeat(3, 1fr)',
					xl: 'repeat(3, 1fr)',
					'2xl': 'repeat(4, 1fr)',
				}}
			>
				{companies
					.slice(0, isFullList ? companies.length : 3)
					.map((team, index) => (
						<GridItem key={+index} pt="4" bg="blue" w="max-content">
							<CompanyCard team={team} />
						</GridItem>
					))}
			</Grid> */}
		</Flex>
	);
};

export default CompaniesListFixed;
