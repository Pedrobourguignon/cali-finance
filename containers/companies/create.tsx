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
import { ICompany } from 'types/interfaces/main-server/ICompany';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { ISociaLinksInputValue } from 'types';

export const CreateCompany = () => {
	const { createCompanySchema } = useSchema();
	const { createCompany, newCreatedCompanyId } = useCompanies();
	const { t: translate } = useTranslation('create-company');
	const [selectedType, setSelectedType] = useState<string>(
		translate('pleaseSelect')
	);
	const [newCompanyPicture, setNewCompanyPicture] = useState({
		picture: '',
	});

	const [selectedNetwork, setSelectedNetwork] = useState({
		name: translate('pleaseSelect'),
		icon: '',
		id: 0,
	});
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<ICompany>({
		resolver: yupResolver(createCompanySchema),
	});

	const { data: session } = useSession({
		required: true,
		onUnauthenticated() {
			router.push('/app/companies');
		},
	});

	const { mutate } = useMutation(
		(createdCompanyData: ICompany) => createCompany(createdCompanyData),
		{ onSuccess: () => console.log('Done') }
	);

	const [socialLinksInputValue, setSocialLinksInputValue] =
		useState<ISociaLinksInputValue>({} as ISociaLinksInputValue);

	const handleCreateCompany = (companyData: ICompany) => {
		const { name, contactEmail, description } = companyData;
		const { website, instagram, twitter, telegram, medium } =
			socialLinksInputValue;
		mutate({
			name,
			contactEmail,
			description,
			network: selectedNetwork.id,
			type: selectedType,
			socialMedia: [
				{
					name: 'website',
					url: website,
				},
				{
					name: 'instagram',
					url: instagram,
				},
				{
					name: 'twitter',
					url: twitter,
				},
				{
					name: 'telegram',
					url: telegram,
				},
				{
					name: 'medium',
					url: medium,
				},
			],
			isPublic: false,
			color: '#121212',
			logo: newCompanyPicture.picture,
		});
		router.push(
			navigationPaths.dashboard.companies.overview(
				newCreatedCompanyId.toString()
			)
		);
	};

	return (
		<form onSubmit={handleSubmit(handleCreateCompany)}>
			<CompaniesProvider>
				<FormControl>
					<AppLayout
						right={
							<NewCompanyLinks
								newCompanyPicture={newCompanyPicture}
								setNewCompanyPicture={setNewCompanyPicture}
								setSocialLinksInputValue={setSocialLinksInputValue}
							/>
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
			</CompaniesProvider>
		</form>
	);
};
