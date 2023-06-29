import { Flex, Text } from '@chakra-ui/react';
import { CompanyCard } from 'components/Cards';
import { useCompanies, usePicasso } from 'hooks';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import { CreateCompanyCard } from '../app';

export const YourCompaniesMobile = () => {
	const theme = usePicasso();
	const { t: translateDashboard } = useTranslation('dashboard');
	const { allUserCompanies } = useCompanies();

	return (
		<Flex overflowX="hidden" direction="column" py="10">
			<Text fontSize="md" fontWeight="medium" color={theme.text.primary} pb="4">
				{translateDashboard('yourCompanies')}
			</Text>
			<Flex w="full" h="full" display="block">
				<Flex
					gap="4"
					overflowX="scroll"
					sx={{
						'&::-webkit-scrollbar': {
							display: 'none',
						},
					}}
				>
					{allUserCompanies && allUserCompanies.length > 0 ? (
						allUserCompanies.map((company, index) => (
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
		</Flex>
	);
};

export default YourCompaniesMobile;
