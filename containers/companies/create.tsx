import { Flex, FormControl, useDisclosure, useToast } from '@chakra-ui/react';
import {
	NewCompanyLinks,
	NavigationBack,
	CreateCompanyComponent,
	AlertToast,
	WaitMetamaskFinishTransaction,
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
import { AxiosError } from 'axios';
import {
	useContractWrite,
	usePrepareContractWrite,
	useWaitForTransaction,
} from 'wagmi';
import factoryAbi from 'utils/abi/factory.json';

interface ISelectedNetwork {
	name: string;
	icon: string;
	id: number;
}

export const CreateCompanyContainer = () => {
	const [newCompanyData, setNewCompanyData] = useState<ICompany>({});
	const { createCompanySchema } = useSchema();
	const toast = useToast();
	const { onClose } = useDisclosure();
	const { createCompany } = useCompanies();
	const { t: translate } = useTranslation('create-company');
	const [newCompanyPicture, setNewCompanyPicture] = useState('');
	const [socialLinksInputValue, setSocialLinksInputValue] =
		useState<ISociaLinksInputValue>({} as ISociaLinksInputValue);
	let companyContractName: string | undefined = '';
	const [selectedType, setSelectedType] = useState<string>(
		translate('pleaseSelect')
	);

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

	const { config: setupCreateCompanyContract } = usePrepareContractWrite({
		address: '0x6d5E353794b11a778F34b5c73ec20E4FfcC44e61',
		abi: factoryAbi,
		functionName: 'createNewCompany',
		args: [companyContractName],
	});

	const { data, writeAsync: createCompanyContract } = useContractWrite(
		setupCreateCompanyContract
	);

	// function to create the company and send to the backend API
	const { mutate } = useMutation(
		(createdCompanyData: ICompany) => createCompany(createdCompanyData),
		{
			onSuccess: () => {
				toast({
					position: 'top',
					render: () => (
						<AlertToast
							onClick={toast.closeAll}
							text="companyCreatedWithSuccess"
							type="success"
						/>
					),
				});
			},
			onError: error => {
				if (error instanceof AxiosError) {
					if (error.response?.data.message === 'Unique company name') {
						toast({
							position: 'top',
							render: () => (
								<AlertToast
									onClick={toast.closeAll}
									text="companyNameAlreadyExists"
									type="error"
								/>
							),
						});
					} else if (error.response?.status === 401) {
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

	// inside this hook, the contract of the new company is created
	// inside the onSuccess, the mutate const is called to create the company in the backend
	const { isLoading } = useWaitForTransaction({
		hash: data?.hash,
		confirmations: 3,
		onSuccess() {
			const { websiteURL, instagramURL, twitterURL, telegramURL, mediumURL } =
				socialLinksInputValue;
			const { name, contactEmail, description } = newCompanyData;
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
				logo: newCompanyPicture === '' ? undefined : newCompanyPicture,
			});
		},
	});

	const handleNewPicture = (picture: string) => {
		setNewCompanyPicture(picture);
	};

	// function to call the factory contract write method
	const handleCreateCompany = async (companyData: ICompany) => {
		const { name } = companyData;
		setNewCompanyData(companyData);
		companyContractName = name;
		await createCompanyContract?.();
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
						<WaitMetamaskFinishTransaction isOpen onClose={onClose} />
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
