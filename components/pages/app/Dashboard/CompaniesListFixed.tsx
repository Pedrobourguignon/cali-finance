import {
	Button,
	Flex,
	Text,
	useDisclosure,
	useMediaQuery,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { CompanyCard, CreateCompanyCard } from 'components';
import { useCompanies, usePicasso } from 'hooks';
import useTranslation from 'next-translate/useTranslation';

export const CompaniesListFixed = () => {
	const theme = usePicasso();
	const [flexWidth, setFlexWidth] = useState<number>(
		useMediaQuery('(max-width: 1280px)') ? 3 : 4
	);
	const { isOpen: isFullList, onToggle: toggleListView } = useDisclosure();
	const { t: translate } = useTranslation('company-overall');
	const { t: translateDashboard } = useTranslation('dashboard');
	const { allUserCompanies } = useCompanies();

	const setInitialWidth = () => {
		if (window.innerWidth < 1281) {
			setFlexWidth(3);
		} else if (window.innerWidth > 1515 && window.innerWidth < 1768) {
			setFlexWidth(4);
		} else if (window.innerWidth > 1700) setFlexWidth(5);
	};

	useEffect(() => {
		setInitialWidth();
		window.onresize = () => {
			if (window.innerWidth < 1281) setFlexWidth(3);
			else if (window.innerWidth > 1515 && window.innerWidth < 1768)
				setFlexWidth(4);
			else if (window.innerWidth > 1700) setFlexWidth(5);
		};
	}, []);

	const showSeeAllOrLess = () => {
		if (allUserCompanies && allUserCompanies.length > flexWidth) {
			return (
				<Text fontSize="xs" color="gray.500" fontWeight="medium">
					{isFullList ? translate('seeLess') : translate('seeAll')}
				</Text>
			);
		}
		return <Flex />;
	};

	return (
		<Flex direction="column" pt="10" w="100%">
			<Flex justify="space-between" align="center">
				<Text
					fontSize="md"
					fontWeight="medium"
					color={theme.text.primary}
					pb="4"
				>
					{translateDashboard('yourCompanies')}
				</Text>
				<Button
					h="max-content"
					onClick={() => toggleListView()}
					p="0"
					isDisabled={
						(window.innerWidth < 1281 && allUserCompanies?.length === 3) ||
						(window.innerWidth > 1536 && allUserCompanies?.length === 4) ||
						(window.innerWidth > 1768 && allUserCompanies?.length === 5)
					}
				>
					{showSeeAllOrLess()}
				</Button>
			</Flex>
			<Flex justify="flex-start" wrap="wrap" gap={{ md: '4', '2xl': '6' }}>
				{allUserCompanies && allUserCompanies.length > 0 ? (
					allUserCompanies
						.slice(0, isFullList ? allUserCompanies?.length : flexWidth)
						.map((company, index) => (
							<Flex key={+index}>
								<CompanyCard
									company={company}
									userCompanies={allUserCompanies}
								/>
							</Flex>
						))
				) : (
					<CreateCompanyCard />
				)}
			</Flex>
		</Flex>
	);
};

export default CompaniesListFixed;
