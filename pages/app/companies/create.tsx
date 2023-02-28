import { CreateCompany } from 'containers';
import { CompaniesProvider } from 'contexts';
import { usePicasso } from 'hooks';

export const Create = () => {
	const theme = usePicasso();
	return (
		<CompaniesProvider>
			<CreateCompany />
		</CompaniesProvider>
	);
};
export default Create;
