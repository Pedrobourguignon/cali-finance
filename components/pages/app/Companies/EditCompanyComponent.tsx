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
} from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { BsQuestionCircle } from 'react-icons/bs';
import useTranslation from 'next-translate/useTranslation';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { BlackButton, NetworkTooltip } from 'components';
import { useSession } from 'next-auth/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { ICompany } from 'types/interfaces/main-server/ICompany';
import { networkInfos } from 'utils';
import { ISociaLinksInputValue } from 'types';

interface IEditCompanyComponent {
	editedSocialLinksInputValue: ISociaLinksInputValue;
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

export const EditCompanyComponent: React.FC<IEditCompanyComponent> = ({
	errors,
	company,
	register,
	setSelectedNetwork,
	selectedNetwork,
	selectedType,
	setSelectedType,
	editedCompanyPicture,
	editedSocialLinksInputValue,
	setEditedSocialLinksInputValue,
}) => {
	const [editedInfo, setEditedInfo] = useState<ICompany>({} as ICompany);
	const theme = usePicasso();
	const { t: translate } = useTranslation('create-company');
	const { data: session } = useSession();

	useEffect(() => {
		setEditedInfo(company!);
	}, [company]);

	const companiesType = [
		{ value: 'DAO' },
		{ value: translate('financial') },
		{ value: 'E-commerce' },
	];

	useEffect(() => {
		setSelectedType(company?.type);
		setSelectedNetwork({
			name: networkInfos(company?.network).name,
			icon: networkInfos(company?.network).icon,
			id: company?.network,
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
		<Flex direction="column" minW="24.2rem">
			<Flex
				direction="column"
				gap={{ md: '2', lg: '6' }}
				mb={{ md: '8', lg: '10' }}
				position="relative"
			>
				<Text color="black" fontSize="xl" fontWeight="medium">
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
					px="1"
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
			<Flex py="6" w="100%" justify="space-between">
				<Flex direction="column" gap="8" w="100%" maxW={{ lg: '80' }}>
					<Flex direction="column" color="black" gap="6">
						<Flex
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
									<Text {...labelStyle}>{translate('network')}</Text>
									<Tooltip
										label={
											<NetworkTooltip>
												{translate('choseTheMostSuitableNetwork')}
											</NetworkTooltip>
										}
										placement="top"
										hasArrow
										arrowShadowColor={theme.branding.blue}
										arrowPadding={10}
										gutter={12}
										bg="none"
										shadow="none"
									>
										<span>
											<Icon as={BsQuestionCircle} color="gray.400" />
										</span>
									</Tooltip>
								</Flex>

								<Menu>
									<MenuButton
										w={{ md: 'full', lg: '11.438rem' }}
										border="1px solid black"
										borderColor={errors.network ? 'red' : theme.bg.primary}
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
										minW="33.75rem"
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
								{...register('contactEmail')}
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
								defaultValue={company?.contactEmail}
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
					<BlackButton
						type="submit"
						lineHeight="6"
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
				<Flex
					direction="column"
					maxW="48"
					color={theme.text.primary}
					display={{ md: 'none', lg: 'flex' }}
				>
					<Flex gap="2" mb="2" align="center">
						<Text {...labelStyle}>{translate('network')}</Text>

						<Tooltip
							label={
								<NetworkTooltip>
									{translate('choseTheMostSuitableNetwork')}
								</NetworkTooltip>
							}
							placement="top"
							hasArrow
							arrowShadowColor={theme.branding.blue}
							arrowPadding={10}
							gutter={12}
							bg="none"
							shadow="none"
						>
							<span>
								<Icon as={BsQuestionCircle} color="gray.400" />
							</span>
						</Tooltip>
					</Flex>
					<Menu>
						<MenuButton
							pl="3"
							w={{ md: '11.438rem' }}
							border="1px solid black"
							borderColor={errors.network ? 'red' : theme.bg.primary}
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
							minW="11.438rem"
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
		</Flex>
	);
};

export default EditCompanyComponent;
