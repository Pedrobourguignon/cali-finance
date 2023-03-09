import { Flex, FormControl } from '@chakra-ui/react';
import {
	NavigationBack,
	EditCompanyComponent,
	EditCompanyLink,
} from 'components';
import { AppLayout, CompanyWhiteBackground } from 'layouts';
import { navigationPaths } from 'utils';
import { IEditCompany } from 'types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCompanies, useSchema } from 'hooks';
import useTranslation from 'next-translate/useTranslation';
import { useSession } from 'next-auth/react';
import router, { useRouter } from 'next/router';
import { CompaniesProvider } from 'contexts';
import { useQuery } from 'react-query';
import { ICompany } from 'types/interfaces/main-server/ICompany';

export const EditCompany = () => {
	const { query } = useRouter();
	const { selectedCompany, getCompanyById } = useCompanies();
	const { t: translate } = useTranslation('create-company');
	const { editCompanySchema } = useSchema();
	const {
		handleSubmit,
		register,
		control,
		formState: { errors },
	} = useForm<ICompany>({
		resolver: yupResolver(editCompanySchema),
	});
	const { data: session } = useSession({
		required: true,
		onUnauthenticated() {
			router.push('/app/companies');
		},
	});

	const { data, isLoading, error } = useQuery('created-company-overview', () =>
		getCompanyById(Number(query.id))
	);

	const handleEditCompany = (editedCompanyData: ICompany) => {
		console.log(editedCompanyData);
	};
	return (
		<CompaniesProvider>
			<form onSubmit={handleSubmit(handleEditCompany)}>
				<FormControl>
					<AppLayout right={<EditCompanyLink company={data} />}>
						<CompanyWhiteBackground />
						<Flex direction="column" gap="10" zIndex="docked" pt="6" w="100%">
							<Flex w="100%">
								<NavigationBack
									href={navigationPaths.dashboard.companies.overview('1')}
								>
									{translate('backToCompany')}
								</NavigationBack>
							</Flex>
							<EditCompanyComponent
								errors={errors}
								register={register}
								company={data}
							/>
						</Flex>
					</AppLayout>
				</FormControl>
			</form>
		</CompaniesProvider>
	);
};
