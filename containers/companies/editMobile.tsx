/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Flex, FormControl, useToast } from '@chakra-ui/react';
import {
	NavigationBack,
	AlertToast,
	EditCompanyComponentMobile,
} from 'components';
import { MobileLayout } from 'layouts';
import { navigationPaths } from 'utils';
import { ISociaLinksInputValue } from 'types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCompanies, useSchema } from 'hooks';
import useTranslation from 'next-translate/useTranslation';
import { useSession } from 'next-auth/react';
import router, { useRouter } from 'next/router';
import { CompaniesProvider } from 'contexts';
import { useMutation, useQuery } from 'react-query';
import { ICompany } from 'types/interfaces/main-server/ICompany';
import { useState } from 'react';
import { AxiosError } from 'axios';

interface ISelectedNetwork {
	name: string;
	icon: string;
	id: number | undefined;
}

export const EditCompanyMobile = () => {
	const toast = useToast();
	const { t: translate } = useTranslation('create-company');
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
			router.push(navigationPaths.dashboard.companies.home);
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
			onSuccess: () => {
				toast({
					position: 'top-right',
					render: () => (
						<AlertToast
							onClick={toast.closeAll}
							text="changesMadeWithSuccessfully"
							type="success"
						/>
					),
				});
			},
			onError: error => {
				if (error instanceof AxiosError) {
					if (error.response?.data.message === 'Unauthorized') {
						toast({
							position: 'top',
							render: () => (
								<AlertToast
									onClick={toast.closeAll}
									text="unauthorized"
									type="error"
								/>
							),
						});
					} else {
						toast({
							position: 'top',
							render: () => (
								<AlertToast
									onClick={toast.closeAll}
									text="weAreWorkingToSolve"
									type="error"
								/>
							),
						});
					}
				}
			},
		}
	);

	const [displayedEditedPicture, setDisplayedEditedPicture] = useState(
		companyToBeEdited?.logo
	);

	const handleEditedPicture = (picture: string) => {
		setDisplayedEditedPicture(picture);
	};

	const handleEditCompany = (editedCompanyData: ICompany) => {
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
					url: websiteURL!,
				},
				{
					name: 'instagram',
					url: instagramURL!,
				},
				{
					name: 'twitter',
					url: twitterURL!,
				},
				{
					name: 'telegram',
					url: telegramURL!,
				},
				{
					name: 'medium',
					url: mediumURL!,
				},
			],
			isPublic: false,
			color: '#121212',
			logo: displayedEditedPicture,
		});
	};

	return (
		<CompaniesProvider>
			<form onSubmit={handleSubmit(handleEditCompany)}>
				<FormControl>
					<MobileLayout>
						<Flex direction="column" w="100%">
							<Flex
								borderTopRadius="3xl"
								top="79"
								w="100%"
								bg="white"
								position="absolute"
								h="12.6rem"
								left="0"
							/>
							<Flex w="100%" pb="8">
								<NavigationBack
									href={navigationPaths.dashboard.companies.overview(query.id)}
								>
									{translate('backToCompany')}
								</NavigationBack>
							</Flex>
							<EditCompanyComponentMobile
								handleEditedPicture={handleEditedPicture}
								displayedEditedPicture={displayedEditedPicture}
								setEditedSocialLinksInputValue={setEditedSocialLinksInputValue}
								editedSocialLinksInputValue={editedSocialLinksInputValue}
								editedCompanyPicture={displayedEditedPicture}
								setSelectedNetwork={setSelectedNetwork}
								setSelectedType={setSelectedType}
								selectedNetwork={selectedNetwork}
								selectedType={selectedType}
								errors={errors}
								register={register}
								company={companyToBeEdited}
							/>
						</Flex>
					</MobileLayout>
				</FormControl>
			</form>
		</CompaniesProvider>
	);
};