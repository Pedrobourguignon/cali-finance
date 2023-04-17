/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Button, Flex, Text, useDisclosure } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { CompanyCard } from 'components';
import { useCompanies, usePicasso } from 'hooks';
import useTranslation from 'next-translate/useTranslation';
import { useQuery } from 'react-query';
import { useAccount } from 'wagmi';

export const CompaniesListFixed = () => {
	const theme = usePicasso();
	const [flexWidth, setFlexWidth] = useState<number>();
	const { isOpen: isFullList, onToggle: toggleListView } = useDisclosure();
	const { t: translate } = useTranslation('company-overall');
	const { t: translateDashboard } = useTranslation('dashboard');
	const { getAllUserCompanies } = useCompanies();
	const { isConnected } = useAccount();

	useEffect(() => {
		window.onresize = () => {
			if (window.innerWidth < 1281) setFlexWidth(3);
			else if (window.innerWidth > 1515 && window.innerWidth < 1768)
				setFlexWidth(4);
			else if (window.innerWidth > 1700) setFlexWidth(5);
		};
	}, []);

	const { data: companies } = useQuery('all-companies', getAllUserCompanies, {
		enabled: !!isConnected,
	});

	return (
		<Flex direction="column" pt="10">
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
						(window.innerWidth < 1281 && companies?.length === 3) ||
						(window.innerWidth > 1536 && companies?.length === 4) ||
						(window.innerWidth > 1768 && companies?.length === 5)
					}
				>
					<Text fontSize="xs" color="gray.500" fontWeight="medium">
						{isFullList ? translate('seeLess') : translate('seeAll')}
					</Text>
				</Button>
			</Flex>
			<Flex
				justify={companies?.length === 2 ? 'space-between' : 'flex-start'}
				wrap="wrap"
				gap={{ md: '4', '2xl': '6' }}
			>
				{companies!
					.slice(0, isFullList ? companies?.length : flexWidth)
					.map((company, index) => (
						<Flex key={+index}>
							<CompanyCard
								company={company}
								companyMembers={1}
								userCompanies={companies!}
							/>
						</Flex>
					))}
			</Flex>
		</Flex>
	);
};

export default CompaniesListFixed;
