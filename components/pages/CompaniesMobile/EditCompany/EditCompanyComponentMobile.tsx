/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
	Button,
	Flex,
	Icon,
	Img,
	Input,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Text,
	Textarea,
	TextProps,
	Tooltip,
	useDisclosure,
} from '@chakra-ui/react';
import { useAuth, usePicasso } from 'hooks';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { BsQuestionCircle } from 'react-icons/bs';
import useTranslation from 'next-translate/useTranslation';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import {
	BlackButton,
	NetworkTooltip,
	EditCompanyLinkModal,
	ImageUploaderModalMobile,
	CompanyLogoMobile,
} from 'components';

import { ChevronDownIcon } from '@chakra-ui/icons';
import { ICompany } from 'types/interfaces/main-server/ICompany';
import { networkInfos } from 'utils';
import { ISociaLinksInputValue } from 'types';

interface IEditCompanyComponent {
	displayedEditedPicture: string | undefined;
	handleEditedPicture: (picture: string) => void;
	editedSocialLinksInputValue: ISociaLinksInputValue;
	setEditedInfo: Dispatch<SetStateAction<ICompany>>;
	setEditedSocialLinksInputValue: Dispatch<
		SetStateAction<ISociaLinksInputValue>
	>;
	editedCompanyPicture: string | undefined;
	register: UseFormRegister<ICompany>;
	errors: FieldErrors<ICompany>;
	setSelectedType: Dispatch<SetStateAction<string | undefined>>;
	selectedType: string | undefined;
	selectedNetwork: {
		name: string;
		icon: string;
		id: number | undefined;
	};
	setSelectedNetwork: Dispatch<
		SetStateAction<{
			name: string;
			icon: string;
			id: number | undefined;
		}>
	>;

	company: ICompany | undefined;
}
interface INetworkSelect {
	name: string;
	id: number;
	icon: string;
}

const networksType: INetworkSelect[] = [
	{ name: 'Ethereum', id: 1, icon: '/images/eth.png' },
	{ name: 'Polygon', id: 137, icon: '/images/polygon.png' },
	{ name: 'BNB Chain', id: 56, icon: '/images/bnbchain.png' },
];

const labelStyle: TextProps = {
	color: 'black',
	fontSize: 'sm',
	fontWeight: 'medium',
};

export const EditCompanyComponentMobile: React.FC<IEditCompanyComponent> = ({
	errors,
	company,
	displayedEditedPicture,
	register,
	setSelectedNetwork,
	selectedNetwork,
	selectedType,
	setSelectedType,
	editedCompanyPicture,
	editedSocialLinksInputValue,
	setEditedSocialLinksInputValue,
	handleEditedPicture,
}) => {
	const [editedInfo, setEditedInfo] = useState<ICompany>({} as ICompany);
	const theme = usePicasso();
	const { t: translate } = useTranslation('create-company');
	const { session } = useAuth();
	const {
		isOpen: isOpenUploader,
		onOpen: onOpenUploader,
		onClose: onCloseUploader,
	} = useDisclosure();
	const {
		isOpen: isOpenSocial,
		onOpen: onOpenSocial,
		onClose: onCloseSocial,
	} = useDisclosure();

	useEffect(() => {
		setEditedInfo(company!);
	}, [company]);

	const companiesType = [
		{ value: 'DAO' },
		{ value: 'E-commerce' },
		{ value: translate('financial') },
		{ value: 'SaaS' },
		{ value: translate('others') },
	];

	useEffect(() => {
		setSelectedType(company?.type);
		setSelectedNetwork({
			name: 'Polygon',
			icon: '/images/polygon.png',
			id: 137,
			// name: networkInfos(company?.network).name,
			// icon: networkInfos(company?.network).icon,
			// id: company?.network,
		});
		setEditedSocialLinksInputValue({
			websiteURL: company?.socialMedia![0].url,
			instagramURL: company?.socialMedia![1].url,
			twitterURL: company?.socialMedia![2].url,
			telegramURL: company?.socialMedia![3].url,
			mediumURL: company?.socialMedia![4].url,
		});
	}, [
		company,
		setEditedSocialLinksInputValue,
		setSelectedNetwork,
		setSelectedType,
	]);

	const disableSaveChangesButton = () => {
		if (
			(editedInfo?.logo === company?.logo &&
				editedInfo?.logo === editedCompanyPicture &&
				editedInfo?.name === company?.name &&
				editedInfo?.contactEmail === company?.contactEmail &&
				editedInfo?.description === company?.description &&
				editedInfo?.type === company?.type &&
				editedSocialLinksInputValue.websiteURL ===
					company?.socialMedia![0].url &&
				editedSocialLinksInputValue.instagramURL ===
					company?.socialMedia![1].url &&
				editedSocialLinksInputValue.twitterURL ===
					company?.socialMedia![2].url &&
				editedSocialLinksInputValue.telegramURL ===
					company?.socialMedia![3].url &&
				editedSocialLinksInputValue.mediumURL ===
					company?.socialMedia![4].url &&
				editedInfo?.network === selectedNetwork.id) ||
			!session
		)
			return true;
		return false;
	};

	return (
		<Flex direction="column">
			<EditCompanyLinkModal
				onClose={onCloseSocial}
				isOpen={isOpenSocial}
				displayedEditedPicture={displayedEditedPicture}
				editedCompanyPicture={editedCompanyPicture}
				logo={editedCompanyPicture}
				setEditedSocialLinksInputValue={setEditedSocialLinksInputValue}
				company={company}
				handleEditedPicture={handleEditedPicture}
			/>
			<ImageUploaderModalMobile
				isOpen={isOpenUploader}
				onClose={onCloseUploader}
				sendImage={handleEditedPicture}
			/>
			<Flex
				direction="column"
				gap={{ md: '2', lg: '6' }}
				mb={{ md: '8', lg: '10' }}
				position="relative"
			>
				<Text color="black" fontSize="xl" fontWeight="medium" pb="6">
					{translate('editCompany')}
				</Text>
				<Input
					{...register('name')}
					defaultValue={company?.name}
					color="black"
					placeholder={translate('companyName')}
					borderBottomWidth="0,125rem"
					borderBottomColor="black"
					borderRadius="none"
					disabled={!session}
					px="0"
					h="8"
					fontSize="2xl"
					_placeholder={{
						color: 'blackAlpha.500',
						fontSize: '2xl',
					}}
					_hover={{}}
					onChange={editedName =>
						setEditedInfo(prevState => ({
							...prevState,
							name: editedName.target.value,
						}))
					}
				/>
				<Text fontSize="xs" color="red" position="absolute" top="100%">
					{errors.name?.message}
				</Text>
			</Flex>
			<Flex py="16" w="100%" justify="space-between">
				<Flex direction="column" gap="8" w="100%" maxW={{ lg: '80' }}>
					<Flex direction="column" color="black" gap="6">
						<Flex justify="space-between" align="center" w="full">
							<Flex w="full" justify="space-between" align="center">
								<Flex gap="5">
									<CompanyLogoMobile
										company={company}
										logo={company?.logo}
										displayedEditedPicture={displayedEditedPicture}
									/>
									<Button
										h="max-content"
										px="3"
										py="1"
										onClick={onOpenUploader}
										fontSize="xs"
										border="1px solid black"
										borderColor="black"
										borderRadius="sm"
									>
										{translate('editLogoImage')}
									</Button>
								</Flex>
								<Button
									h="max-content"
									px="3"
									py="1"
									onClick={onOpenSocial}
									fontSize="xs"
									border="1px solid black"
									borderColor="black"
									borderRadius="sm"
								>
									{translate('socialMediaLinks')}
								</Button>
							</Flex>
						</Flex>
						<Flex
							direction="column"
							justify="space-between"
							w="100%"
							flexWrap={{ md: 'wrap', lg: 'nowrap' }}
							gap="8"
						>
							<Flex direction="column" w="100%">
								<Text {...labelStyle} mb="2">
									{translate('type')}
								</Text>
								<Menu>
									<MenuButton
										px="3"
										w={{ md: 'full', lg: '20rem' }}
										border="1px solid black"
										borderColor={errors.type ? 'red' : theme.bg.primary}
										fontWeight="normal"
										_hover={{}}
										_active={{}}
										_focus={{}}
										isDisabled={!session}
										h="8"
										as={Button}
										rightIcon={<ChevronDownIcon />}
										bg="white"
										fontSize="sm"
									>
										<Flex>{selectedType}</Flex>
									</MenuButton>
									<MenuList
										bg="white"
										boxShadow="none"
										borderColor="#121212"
										borderRadius="base"
										w={{ md: '33.75rem', lg: '20rem' }}
									>
										{companiesType.map((type, index) => (
											<MenuItem
												key={+index}
												bg="transparent"
												fontSize="sm"
												_hover={{ bg: 'gray.100' }}
												onClick={() => {
													setSelectedType(type.value);
													setEditedInfo(prevState => ({
														...prevState,
														type: type.value,
													}));
												}}
											>
												{type.value}
											</MenuItem>
										))}
									</MenuList>
								</Menu>
								<Text fontSize="xs" color="red" position="absolute" pt="16">
									{errors.type?.message}
								</Text>
							</Flex>
							<Flex
								direction="column"
								w="100%"
								color={theme.text.primary}
								display={{ md: 'flex', lg: 'none' }}
							>
								<Flex gap="2" mb="2" align="center">
									<Text {...labelStyle}>Network *</Text>
									{/* <Tooltip
										label={
											<NetworkTooltip>
												{translate('choseTheMostSuitableNetwork')}
											</NetworkTooltip>
										}
										placement="top"
										hasArrow
										arrowShadowColor={theme.branding.blue2}
										arrowPadding={10}
										gutter={12}
										bg="none"
										shadow="none"
									>
										<span>
											<Icon
												as={BsQuestionCircle}
												color="gray.400"
												mt="2"
												boxSize="0.813rem"
											/>
										</span>
									</Tooltip> */}
								</Flex>
								<Menu>
									<MenuButton
										w="full"
										border="1px solid black"
										borderColor={errors.network ? 'red' : theme.bg.primary}
										fontWeight="normal"
										_hover={{}}
										_active={{}}
										_focus={{}}
										// isDisabled={!session}
										isDisabled
										_disabled={{ color: 'black' }}
										cursor="not-allowed"
										h="8"
										as={Button}
										rightIcon={<ChevronDownIcon />}
										bg="white"
										fontSize="sm"
										color={
											selectedNetwork.name === translate('pleaseSelect')
												? 'blackAlpha.500'
												: theme.text.primary
										}
									>
										<Flex align="center" gap="2">
											<Img src={selectedNetwork.icon} boxSize="4" />
											{selectedNetwork.name}
										</Flex>
									</MenuButton>
									<MenuList
										bg="white"
										boxShadow="none"
										borderColor="#121212"
										borderRadius="base"
									>
										{networksType.map((network, index) => (
											<MenuItem
												key={+index}
												bg="transparent"
												fontSize="sm"
												_hover={{ bg: 'gray.100' }}
												onClick={() => {
													setSelectedNetwork({
														name: network.name,
														icon: network.icon,
														id: network.id,
													});
												}}
												gap="2"
											>
												<Img src={network.icon} boxSize="4" />
												{network.name}
											</MenuItem>
										))}
									</MenuList>
								</Menu>
								<Text fontSize="xs" color="red">
									{errors.type?.message}
								</Text>
							</Flex>
						</Flex>
						<Flex direction="column" position="relative">
							<Text {...labelStyle} mb="2">
								{translate('corporativeEmail')}
							</Text>
							<Input
								px="3"
								defaultValue={company?.contactEmail}
								disabled={!session}
								placeholder={translate('exampleEmail')}
								_placeholder={{
									color: 'blackAlpha.500',
									fontSize: 'sm',
								}}
								h="8"
								bgColor="white"
								borderRadius="base"
								_hover={{}}
								borderColor={theme.bg.primary}
								{...register('contactEmail')}
								onChange={editedEmail =>
									setEditedInfo(prevState => ({
										...prevState,
										contactEmail: editedEmail.target.value,
									}))
								}
							/>
							<Text fontSize="xs" color="red" position="absolute" top="100%">
								{errors.contactEmail?.message}
							</Text>
						</Flex>
						<Flex direction="column">
							<Text {...labelStyle} mb="2">
								{translate('description')}
							</Text>
							<Textarea
								defaultValue={company?.description}
								{...register('description')}
								px="3"
								disabled={!session}
								_placeholder={{
									color: 'blackAlpha.500',
									fontSize: 'sm',
									verticalAlign: 'baseline',
								}}
								_hover={{}}
								bgColor="white"
								placeholder={translate('exampleDescription')}
								minH="7.2rem"
								borderColor={theme.bg.primary}
								onChange={editedDescription =>
									setEditedInfo(prevState => ({
										...prevState,
										description: editedDescription.target.value,
									}))
								}
							/>
						</Flex>
					</Flex>
					<Flex w="full" pb="6">
						<BlackButton
							type="submit"
							lineHeight="6"
							w="full"
							fontSize="md"
							borderRadius="sm"
							py="2.5"
							display={{ md: 'none', lg: 'flex' }}
							isDisabled={disableSaveChangesButton()}
							_disabled={{ opacity: '50%', cursor: 'not-allowed' }}
						>
							{translate('saveChanges')}
						</BlackButton>
					</Flex>
				</Flex>
			</Flex>
		</Flex>
	);
};

export default EditCompanyComponentMobile;
