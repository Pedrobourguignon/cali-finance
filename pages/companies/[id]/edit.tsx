import { useMediaQuery } from '@chakra-ui/react';
import { EditCompany, EditCompanyMobile } from 'containers';
import { CompaniesProvider } from 'contexts';

export const Edit = () => {
	const [isLargerThan767] = useMediaQuery('(min-width: 767px)', {
		fallback: true,
	});

	return (
		<CompaniesProvider>
			{isLargerThan767 ? <EditCompany /> : <EditCompanyMobile />}
		</CompaniesProvider>
	);
};
export default Edit;
