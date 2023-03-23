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

interface ISelectedNetwork {
	name: string;
	icon: string;
	id: number;
}

export const CreateCompanyContainer = () => {
	const { createCompanySchema } = useSchema();
	const { createCompany } = useCompanies();
	const { t: translate } = useTranslation('create-company');
	const [selectedType, setSelectedType] = useState<string>(
		translate('pleaseSelect')
	);
	const [newCompanyPicture, setNewCompanyPicture] = useState('');
	const [socialLinksInputValue, setSocialLinksInputValue] =
		useState<ISociaLinksInputValue>({} as ISociaLinksInputValue);

	const [selectedNetwork, setSelectedNetwork] = useState<ISelectedNetwork>({
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
			router.push(navigationPaths.dashboard.companies.home);
		},
	});

	const { mutate } = useMutation(
		(createdCompanyData: ICompany) => createCompany(createdCompanyData),
		{
			onSuccess: () => console.log('done'),
		}
	);

	const handleNewPicture = (picture: string) => {
		setNewCompanyPicture(picture);
	};

	const handleCreateCompany = (companyData: ICompany) => {
		const { name, contactEmail, description } = companyData;
		const { websiteURL, instagramURL, twitterURL, telegramURL, mediumURL } =
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
			logo: newCompanyPicture,
		});
	};

	const setSocialMediasInput = (name: string[], url: string) => {
		setSocialLinksInputValue(prevState => ({
			...prevState,
			[`${name}`]: url,
		}));
	};

	return (
		<form onSubmit={handleSubmit(handleCreateCompany)}>
			<CompaniesProvider>
				<FormControl>
					<AppLayout
						right={
							<NewCompanyLinks
								setSocialMediasInput={setSocialMediasInput}
								newCompanyPicture={newCompanyPicture}
								handleNewPicture={handleNewPicture}
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
