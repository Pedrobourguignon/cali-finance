/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Flex, FormControl, useDisclosure, useToast } from '@chakra-ui/react';
import {
	NavigationBack,
	AlertToast,
	CreateCompanyMobile,
	WaitConfirmationModalMobile,
} from 'components';
import {
	useContractWrite,
	useNetwork,
	useSwitchNetwork,
	useWaitForTransaction,
} from 'wagmi';
import { MobileLayout } from 'layouts';
import { mainClient, navigationPaths } from 'utils';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CompaniesProvider } from 'contexts';
import { useSchema } from 'hooks';
import { ICompany } from 'types/interfaces/main-server/ICompany';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { ISociaLinksInputValue } from 'types';
import { Hex } from 'viem';
import { MAIN_SERVICE_ROUTES } from 'helpers';
import { AxiosError } from 'axios';
import useTranslation from 'next-translate/useTranslation';
import router from 'next/router';
import factoryAbi from 'utils/abi/factory.json';

interface ISelectedNetwork {
	name: string;
	icon: string;
	id: number;
}

export const CreateCompanyMobileContainer = () => {
	const { createCompanySchema } = useSchema();
	const { onClose } = useDisclosure();
	const [newCompanyId, setNewCompanyId] = useState(0);
	const toast = useToast();
	const { t: translate } = useTranslation('create-company');
	const [selectedType, setSelectedType] = useState<string>(
		translate('pleaseSelect')
	);
	const [newCompanyPicture, setNewCompanyPicture] = useState('');
	const [isLoadingButton, setIsLoadingButton] = useState<boolean>(false);
	const [socialLinksInputValue, setSocialLinksInputValue] =
		useState<ISociaLinksInputValue>({} as ISociaLinksInputValue);

	const [selectedNetwork, setSelectedNetwork] = useState<ISelectedNetwork>({
		name: 'Polygon',
		icon: '/images/polygon.png',
		id: 137,
	});
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<ICompany>({
		resolver: yupResolver(createCompanySchema),
	});

	const { chain } = useNetwork();
	const {
		chains,
		switchNetworkAsync,
		isLoading: isLoadingSwitchNetwork,
	} = useSwitchNetwork();

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
			createCompanyWrite?.({
				args: [checksum, process.env.NEXT_PUBLIC_CALI_TOKEN],
			});
		} catch (error) {
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
		}
	};

	const { isLoading } = useWaitForTransaction({
		hash: createCompanyData?.hash,
		confirmations: 3,
		onSuccess() {
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
				<MobileLayout>
					<WaitConfirmationModalMobile isOpen={isLoading} onClose={onClose} />
					<Flex direction="column" w="full">
						<Flex
							borderTopRadius="3xl"
							top="79"
							w="100%"
							bg="white"
							position="absolute"
							h="12.6rem"
							left="0"
						/>
						<Flex w="100%">
							<NavigationBack href={navigationPaths.dashboard.companies.home}>
								{translate('backToCompanies')}
							</NavigationBack>
						</Flex>
						<CreateCompanyMobile
							isLoadingButton={isLoadingButton}
							setSocialMediasInput={setSocialMediasInput}
							newCompanyPicture={newCompanyPicture}
							handleNewPicture={handleNewPicture}
							errors={errors}
							register={register}
							setSelectedNetwork={setSelectedNetwork}
							setSelectedType={setSelectedType}
							selectedNetwork={selectedNetwork}
							selectedType={selectedType}
						/>
					</Flex>
				</MobileLayout>
			</FormControl>
		</form>
	);
};
