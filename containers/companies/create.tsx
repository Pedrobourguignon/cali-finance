import { Flex, FormControl } from '@chakra-ui/react';
import {
	NewCompanyLinks,
	NavigationBack,
	CreateCompanyComponent,
} from 'components';
import { AppLayout, CompanyWhiteBackground } from 'layouts';
import { navigationPaths } from 'utils';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CompaniesProvider } from 'contexts';
import useTranslation from 'next-translate/useTranslation';
import { useSession } from 'next-auth/react';
import router from 'next/router';
import { useCompanies, useSchema } from 'hooks';
import { ICompany, ISocialMedia } from 'types/interfaces/main-server/ICompany';
import { useState } from 'react';

export const CreateCompany = () => {
	const { createCompanySchema } = useSchema();
	const { t: translate } = useTranslation('create-company');
	const [selectedType, setSelectedType] = useState<string>(
		translate('pleaseSelect')
	);
	const [selectedNetwork, setSelectedNetwork] = useState({
		name: translate('pleaseSelect'),
		icon: '',
		id: 0,
	});
	const [socialMediasData, setSocialMediasData] = useState<ISocialMedia[]>([]);
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<ICompany>({
		resolver: yupResolver(createCompanySchema),
	});
	const { setCreatedCompanyData, createdCompanyData } = useCompanies();
	const { data: session } = useSession({
		required: true,
		onUnauthenticated() {
			router.push('/app/companies');
		},
	});

	const handleCreateCompany = (companyData: ICompany) => {
		setCreatedCompanyData({
			name: companyData.name,
			email: companyData.contactEmail,
			description: companyData.description,
			network: selectedNetwork.id,
			type: selectedType,
			socialMedias: socialMediasData,
		});
		console.log(createdCompanyData);
	};

	return (
		<CompaniesProvider>
			<form onSubmit={handleSubmit(handleCreateCompany)}>
				<FormControl>
					<AppLayout
						right={
							<NewCompanyLinks setSocialMediasData={setSocialMediasData} />
						}
					>
						<CompanyWhiteBackground />
						<Flex direction="column" gap="10" zIndex="docked" pt="6" w="100%">
							<Flex w="100%">
								<NavigationBack href={navigationPaths.dashboard.companies.home}>
									{translate('backToCompanies')}
								</NavigationBack>
							</Flex>
							<CreateCompanyComponent
								errors={errors}
								register={register}
								setSelectedNetwork={setSelectedNetwork}
								setSelectedType={setSelectedType}
								selectedNetwork={selectedNetwork}
								selectedType={selectedType}
							/>
						</Flex>
					</AppLayout>
				</FormControl>
			</form>
		</CompaniesProvider>
	);
};
