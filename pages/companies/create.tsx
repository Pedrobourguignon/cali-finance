import { useMediaQuery } from '@chakra-ui/react';
import {
	CreateCompanyContainer,
	CreateCompanyMobileContainer,
} from 'containers';
import { CompaniesProvider } from 'contexts';

export const CreateCompany = () => {
	const [isLargerThan767] = useMediaQuery('(min-width: 767px)');

	return (
		<CompaniesProvider>
			{isLargerThan767 ? (
				<CreateCompanyContainer />
			) : (
				<CreateCompanyMobileContainer />
			)}
		</CompaniesProvider>
	);
};
export default CreateCompany;
