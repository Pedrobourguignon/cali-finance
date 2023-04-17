import { Flex, Text } from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import { GetUserCompaniesRes } from 'types/interfaces/main-server/ICompany';
import { CreateCompanyCard, CompanyCard } from 'components';

interface IYourCompaniesMobile {
	companies: GetUserCompaniesRes[] | undefined;
}

export const YourCompaniesMobile: React.FC<IYourCompaniesMobile> = ({
	companies,
}) => {
	const theme = usePicasso();
	const { t: translateDashboard } = useTranslation('dashboard');

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
					{/* {companies && companies.length > 0 ? (
						companies.map((company, index) => (
							<Flex key={+index}>
								<CreateCompanyCard />
							</Flex>
						))
					) : (
						<CreateCompanyCard />
					)} */}
					{companies && companies.length > 0 ? (
						companies.map((company, index) => (
							<Flex key={+index}>
								<CompanyCard
									company={company}
									companyMembers={1}
									userCompanies={companies}
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
