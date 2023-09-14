import { Flex, FormControl, useDisclosure, useToast } from '@chakra-ui/react';
import {
	NewCompanyLinks,
	NavigationBack,
	CreateCompanyComponent,
	AlertToast,
	WaitMetamaskFinishTransaction,
} from 'components';
import { AppLayout, CompanyWhiteBackground } from 'layouts';
import { mainClient, navigationPaths } from 'utils';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import useTranslation from 'next-translate/useTranslation';

import router from 'next/router';
import { useCompanies, useSchema } from 'hooks';
import { ICompany } from 'types/interfaces/main-server/ICompany';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { ISociaLinksInputValue } from 'types';
import { AxiosError } from 'axios';
import {
	useContractWrite,
	useNetwork,
	useSwitchNetwork,
	useWaitForTransaction,
} from 'wagmi';
import factoryAbi from 'utils/abi/factory.json';
import { MAIN_SERVICE_ROUTES } from 'helpers';
import { Hex } from 'viem';

interface ISelectedNetwork {
	name: string;
	icon: string;
	id: number;
}

export const CreateCompanyContainer = () => {
	const { createCompanySchema } = useSchema();
	const toast = useToast();
	const { onClose } = useDisclosure();
	const [newCompanyId, setNewCompanyId] = useState(0);
	const { t: translate } = useTranslation('create-company');
	const [newCompanyPicture, setNewCompanyPicture] = useState('');
	const [isLoadingButton, setIsLoadingButton] = useState<boolean>(false);
	const [socialLinksInputValue, setSocialLinksInputValue] =
		useState<ISociaLinksInputValue>({} as ISociaLinksInputValue);
	const [selectedType, setSelectedType] = useState<string>(
		translate('pleaseSelect')
	);
	const { sendCompanyTx } = useCompanies();

	const [selectedNetwork, setSelectedNetwork] = useState<ISelectedNetwork>({
		name: 'Polygon',
		icon: '/images/polygon.png',
		id: 137,
	});
	const {
		handleSubmit,
		register,
		formState: { errors, isValid },
	} = useForm<ICompany>({
		resolver: yupResolver(createCompanySchema),
	});

	const { chain } = useNetwork();
	const { chains, switchNetworkAsync } = useSwitchNetwork();

	const { write: createCompanyWrite, data: createCompanyData } =
		useContractWrite({
			address: (process.env.NEXT_PUBLIC_FACTORY_CONTRACT || '') as Hex,
			abi: factoryAbi,
			functionName: 'createNewCompany',
		});

	const createCompany = async (company: ICompany) => {
		try {
			setIsLoadingButton(true);
			if (chain?.id !== 137) await switchNetworkAsync?.(chains[3].id);
			const {
				data: { checksum, id },
			} = await mainClient.post(MAIN_SERVICE_ROUTES.createCompany, {
				company,
			});
			setNewCompanyId(id);
			createCompanyWrite?.({ args: [checksum] });
		} catch (error) {
			setIsLoadingButton(false);
			if (error instanceof AxiosError) {
				if (error.response?.data.message === 'Unique company name') {
					toast({
						position: 'top-right',
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
						position: 'top-right',
						render: () => (
							<AlertToast
								onClick={toast.closeAll}
								text="unauthorized"
								type="error"
							/>
						),
					});
				} else if (
					error.response?.data.message ===
					'You have 10 incomplete companies. Please deploy a contract before creating any new company.'
				) {
					toast({
						position: 'top-right',
						render: () => (
							<AlertToast
								onClick={toast.closeAll}
								text="maximumCompanyWithoutDeploy"
								type="error"
							/>
						),
					});
				} else {
					toast({
						position: 'top-right',
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
		}
	};

	const { isLoading } = useWaitForTransaction({
		hash: createCompanyData?.hash,
		confirmations: 3,
		onSuccess: async () => {
			await sendCompanyTx?.(newCompanyId, createCompanyData?.hash as string);
			toast({
				position: 'top-right',
				render: () => (
					<AlertToast
						onClick={toast.closeAll}
						text="companyCreatedWithSuccess"
						type="success"
					/>
				),
			});
			router.push(
				navigationPaths.dashboard.companies.overview(newCompanyId.toString())
			);
		},
		onError() {
			setIsLoadingButton(false);
			toast({
				position: 'top-right',
				render: () => (
					<AlertToast
						onClick={toast.closeAll}
						text="weAreWorkingToSolve"
						type="error"
					/>
				),
			});
		},
	});

	const { mutate } = useMutation(
		(createdCompanyData: ICompany) => createCompany(createdCompanyData),
		{
			onError: error => {
				if (error instanceof AxiosError) {
					if (error.response?.data.message === 'Unique company name') {
						toast({
							position: 'top-right',
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
							position: 'top-right',
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
							position: 'top-right',
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

	const handleNewPicture = (picture: string) => {
		setNewCompanyPicture(picture);
	};

	const handleCreateCompany = async (companyData: ICompany) => {
		const { websiteURL, instagramURL, twitterURL, telegramURL, mediumURL } =
			socialLinksInputValue;
		const { name, contactEmail, description } = companyData;
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
			isPublic: 0,
			color: '#121212',
			logo: newCompanyPicture || undefined,
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
			<FormControl>
				<AppLayout
					right={
						<NewCompanyLinks
							errors={errors}
							isValid={isValid}
							selectedNetwork={selectedNetwork}
							selectedType={selectedType}
							setSocialMediasInput={setSocialMediasInput}
							newCompanyPicture={newCompanyPicture}
							handleNewPicture={handleNewPicture}
						/>
					}
				>
					<WaitMetamaskFinishTransaction isOpen={isLoading} onClose={onClose} />
					<CompanyWhiteBackground />
					<Flex direction="column" gap="10" zIndex="docked" pt="6" w="100%">
						<Flex w="100%">
							<NavigationBack href={navigationPaths.dashboard.companies.home}>
								{translate('backToCompanies')}
							</NavigationBack>
						</Flex>
						<CreateCompanyComponent
							isLoadingButton={isLoadingButton}
							isValid={isValid}
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
	);
};
