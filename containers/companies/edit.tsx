import { Flex, FormControl, useToast } from '@chakra-ui/react';
import {
	NavigationBack,
	EditCompanyComponent,
	EditCompanyLink,
	SaveChangesToast,
} from 'components';
import { AppLayout, CompanyWhiteBackground } from 'layouts';
import { navigationPaths } from 'utils';
import { ISociaLinksInputValue } from 'types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCompanies, useSchema, useToasty } from 'hooks';
import useTranslation from 'next-translate/useTranslation';
import { useSession } from 'next-auth/react';
import router, { useRouter } from 'next/router';
import { CompaniesProvider } from 'contexts';
import { useMutation, useQuery } from 'react-query';
import { ICompany } from 'types/interfaces/main-server/ICompany';
import { useState } from 'react';

interface ISelectedNetwork {
	name: string;
	icon: string;
	id: number | undefined;
}

export const EditCompany = () => {
	const { t: translate } = useTranslation('create-company');
	const toast = useToast();
	const { query } = useRouter();
	const { editCompanySchema } = useSchema();
	const { getCompanyById, updateCompany } = useCompanies();
	const [selectedType, setSelectedType] = useState<string | undefined>('');
	const [editedSocialLinksInputValue, setEditedSocialLinksInputValue] =
		useState<ISociaLinksInputValue>({} as ISociaLinksInputValue);

	const { data: companyToBeEdited } = useQuery('created-company-overview', () =>
		getCompanyById(Number(query.id))
	);

	const {
		handleSubmit,
		register,
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

	const [selectedNetwork, setSelectedNetwork] = useState<ISelectedNetwork>({
		name: companyToBeEdited?.name,
		icon: '',
		id: 0,
	} as ISelectedNetwork);

	const { mutate } = useMutation(
		(editedCompanyData: ICompany) => updateCompany(editedCompanyData),
		{
			onSuccess: () => console.log('done'),
		}
	);

	const [editedCompanyPicture, setEditedCompanyPicture] = useState(
		companyToBeEdited?.logo
	);

	const handleEditedPicture = (picture: string) => {
		setEditedCompanyPicture(picture);
	};

	const handleEditCompany = (editedCompanyData: ICompany) => {
		toast({
			position: 'top-right',
			render: () => <SaveChangesToast onClick={toast.closeAll} />,
		});
		const { name, contactEmail, description } = editedCompanyData;
		const { websiteURL, instagramURL, twitterURL, telegramURL, mediumURL } =
			editedSocialLinksInputValue;
		mutate({
			name,
			contactEmail,
			description,
			network: selectedNetwork.id,
			type: selectedType,
			socialMedia: [
				{
					name: 'website',
					url: websiteURL,
				},
				{
					name: 'instagram',
					url: instagramURL,
				},
				{
					name: 'twitter',
					url: twitterURL,
				},
				{
					name: 'telegram',
					url: telegramURL,
				},
				{
					name: 'medium',
					url: mediumURL,
				},
			],
			isPublic: false,
			color: '#121212',
			logo: editedCompanyPicture,
		});

	};

	return (
		<CompaniesProvider>
			<form onSubmit={handleSubmit(handleEditCompany)}>
				<FormControl>
					<AppLayout
						right={
							<EditCompanyLink
								logo={editedCompanyPicture}
								setEditedSocialLinksInputValue={setEditedSocialLinksInputValue}
								company={companyToBeEdited}
								handleEditedPicture={handleEditedPicture}
							/>
						}
					>
						<CompanyWhiteBackground />
						<Flex direction="column" gap="10" zIndex="docked" pt="6" w="100%">
							<Flex w="100%">
								<NavigationBack
									href={navigationPaths.dashboard.companies.overview(query.id)}
								>
									{translate('backToCompany')}
								</NavigationBack>
							</Flex>
							<EditCompanyComponent
								editedCompanyPicture={editedCompanyPicture}
								setSelectedNetwork={setSelectedNetwork}
								setSelectedType={setSelectedType}
								selectedNetwork={selectedNetwork}
								selectedType={selectedType}
								errors={errors}
								register={register}
								company={companyToBeEdited}
							/>
						</Flex>
					</AppLayout>
				</FormControl>
			</form>
		</CompaniesProvider>
	);
};
