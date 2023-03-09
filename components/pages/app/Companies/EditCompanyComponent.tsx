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
import { useCompanies, usePicasso } from 'hooks';
import {
	Control,
	FieldErrors,
	Controller,
	UseFormRegister,
} from 'react-hook-form';
import { ICreateCompany, IMockCompany } from 'types';
import { Select } from 'chakra-react-select';
import { BsQuestionCircle } from 'react-icons/bs';
import useTranslation from 'next-translate/useTranslation';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { BlackButton, NetworkTooltip } from 'components';
import { useSession } from 'next-auth/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { ICompany } from 'types/interfaces/main-server/ICompany';
import { networkInfos } from 'utils';
// eslint-disable-next-line import/no-unresolved
// import { FieldErrors, UseFormRegister } from 'react-hook-form/dist/types';

interface IEditCompanyComponent {
	register: UseFormRegister<ICompany>;
	errors: FieldErrors<ICompany>;
	// errors: Partial<
	// 	FieldErrorsImpl<{
	// 		name: string;
	// 		type: {
	// 			label: string;
	// 			value: string;
	// 		};
	// 		email: string;
	// 		network: {
	// 			label: string;
	// 			value: string;
	// 			icon: string;
	// 		};
	// 		description: string;
	// 		logo: string;
	// 		socialMedias: {
	// 			website: string;
	// 			instagram: string;
	// 			twitter: string;
	// 			telegram: string;
	// 			medium: string;
	// 		};
	// 	}>
	// >;
	company: ICompany | undefined;
}

interface INetworkSelect {
	name: string;
	id: number;
	icon: string;
}

interface ISelectedNetwork {
	name: string;
	icon: string;
	id: number | undefined;
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
}) => {
	// const {
	// 	name,
	// 	email,
	// 	description,
	// 	type,
	// 	selectedNetwork,
	// 	picture,
	// 	socialMedias,
	// } = company;
	const theme = usePicasso();
	const { t: translate } = useTranslation('create-company');
	const { selectedCompany } = useCompanies();
	const [editedInfo, setEditedInfo] = useState<ICompany>({} as ICompany);

	const { data: session } = useSession();

	console.log(company);

	useEffect(() => {
		setEditedInfo({
			name: company?.name,
			contactEmail: company?.contactEmail,
			type: company?.type,
			network: company?.network,
			description: company?.description,
			logo: company?.logo,
		});
	}, [company]);

	// console.log(editedInfo);

	const companiesType = [
		{ value: 'DAO' },
		{ value: translate('financial') },
		{ value: 'e-commerce' },
	];

	// const indexOfCompanyType = companiesType.findIndex(
	// 	index => index.value === company?.type
	// );
	// const indexOfCompanyNetwork = networksType.findIndex(
	// 	index => index.id === company?.network
	// );

	const [selectedType, setSelectedType] = useState<string | undefined>(
		company?.type
	);

	const [selectedNetwork, setSelectedNetwork] = useState<ISelectedNetwork>({
		name: networkInfos(company?.network).name,
		icon: networkInfos(company?.network).icon,
		id: company?.network,
	});

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
				{/* <Controller
					render={({ field }) => (
						<Input
							{...field}
							color="black"
							defaultValue={name}
							placeholder="Company Name *"
							borderBottomWidth="0,125rem"
							borderBottomColor="black"
							borderRadius="none"
							h="8"
							px="1"
							fontSize="2xl"
							isDisabled={!session}
							_placeholder={{
								color: 'blackAlpha.500',
								fontSize: { md: 'xl', xl: '2xl' },
							}}
							_hover={{}}
							onChange={editedName =>
								setEditedInfo(prevState => ({
									...prevState,
									name: editedName.target.value,
								}))
							}
						/>
					)}
					name="name"
					control={control}
				/> */}
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
								{/* <Controller
									name="type"
									control={control}
									render={({ field }) => (
										<Select
											{...field}
											placeholder={translate('pleaseSelect')}
											size="sm"
											onChange={editedType =>
												setEditedInfo(prevState => ({
													...prevState,
													type: editedType!.label,
												}))
											}
											chakraStyles={{
												placeholder: base => ({
													...base,
													color: 'blackAlpha.500',
													fontSize: 'sm',
												}),
												control: group => ({
													...group,
													bg: 'white',
													minWidth: '48',
													borderRadius: 'base',
													borderColor: errors.network
														? 'red'
														: theme.bg.primary,
													cursor: 'pointer',
													_hover: {},
												}),
												menuList: group => ({
													...group,
													bg: 'white',
													borderColor: '#121212',
													borderRadius: 'base',
												}),
												option: (item, state) => ({
													...item,
													bg: state.isFocused ? 'gray.50' : 'none',
												}),
											}}
											options={companiesType}
											defaultValue={companiesType[indexOfCompanyType]}
											isDisabled={!session}
										/>
									)}
								/> */}
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
										// color={
										// 	selectedType === translate('pleaseSelect')
										// 		? 'blackAlpha.500'
										// 		: theme.text.primary
										// }
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
										{companiesType.map((typee, index) => (
											<MenuItem
												key={+index}
												bg="transparent"
												fontSize="sm"
												_hover={{ bg: 'gray.50' }}
												// onClick={() => {
												// 	setEditedInfo(prevState => ({
												// 		...prevState,
												// 		type: typee!.label,
												// 	}));
												// }}
												onClick={() => {
													setSelectedType(typee.value);
													setEditedInfo(prevState => ({
														...prevState,
														type: typee.value,
													}));
												}}
											>
												{typee.value}
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

									<Tooltip
										label={
											<NetworkTooltip>
												Choose the most suitable network for paying your staff
												efficiently.
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

								{/* <Controller
									name="network"
									control={control}
									render={({ field }) => (
										<Select
											{...field}
											placeholder="Please select"
											size="sm"
											onChange={editedNetwork =>
												setEditedInfo(prevState => ({
													...prevState,
													network: editedNetwork!.value,
												}))
											}
											chakraStyles={{
												placeholder: base => ({
													...base,
													color: 'blackAlpha.500',
													fontSize: 'sm',
												}),
												control: group => ({
													...group,
													bg: 'white',
													minWidth: '48',
													borderRadius: 'base',
													borderColor: errors.network
														? 'red'
														: theme.bg.primary,
													cursor: 'pointer',
													_hover: {},
												}),
												menuList: group => ({
													...group,
													bg: 'white',
													borderColor: '#121212',
													borderRadius: 'base',
												}),
												option: (item, state) => ({
													...item,
													bg: state.isSelected ? 'gray.50' : 'none',
												}),
											}}
											options={networksType}
											defaultValue={networksType[indexOfCompanyNetwork]}
											isDisabled={!session}
											// eslint-disable-next-line react/no-unstable-nested-components
											formatOptionLabel={network => (
												<Flex gap="2" align="center">
													<Img src={network.icon} boxSize="5" />
													<Text>{network.label}</Text>
												</Flex>
											)}
										/>
									)}
								/> */}
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
										<Flex
											display={
												selectedNetwork.icon.length > 1 ? 'none' : 'flex'
											}
										>
											{selectedNetwork.name}
										</Flex>
										<Flex
											align="center"
											gap="2"
											display={
												selectedNetwork.icon.length > 1 ? 'flex' : 'none'
											}
										>
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
												_hover={{ bg: 'gray.50' }}
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
							{/* <Controller
								render={({ field }) => (
									<Input
										{...field}
										placeholder={translate('exampleEmail')}
										_placeholder={{
											color: 'blackAlpha.500',
											fontSize: 'sm',
										}}
										h="8"
										fontSize="sm"
										bgColor="white"
										borderRadius="base"
										_hover={{}}
										borderColor={theme.bg.primary}
										defaultValue={email}
										disabled={!session}
										onChange={editedEmail =>
											setEditedInfo(prevState => ({
												...prevState,
												email: editedEmail.target.value,
											}))
										}
									/>
								)}
								name="email"
								control={control}
							/> */}
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
							{/* <Controller
								render={({ field }) => (
									<Textarea
										{...field}
										fontSize="sm"
										borderColor={theme.bg.primary}
										_placeholder={{
											color: 'blackAlpha.500',
											fontSize: 'sm',
										}}
										defaultValue={description}
										_hover={{}}
										bgColor="white"
										placeholder={translate('exampleDescription')}
										minH="110"
										disabled={!session}
										onChange={editedDescription =>
											setEditedInfo(prevState => ({
												...prevState,
												description: editedDescription.target.value,
											}))
										}
									/>
								)}
								name="description"
								control={control}
							/> */}
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
						isDisabled={
							(editedInfo.logo === company?.logo &&
								editedInfo.name === company?.name &&
								editedInfo.contactEmail === company?.contactEmail &&
								editedInfo.description === company?.description &&
								editedInfo.type === company?.type &&
								editedInfo.network === selectedNetwork.id) ||
							!session
						}
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
						<Text {...labelStyle}>Network *</Text>

						<Tooltip
							label={
								<NetworkTooltip>
									Choose the most suitable network for paying your staff
									efficiently.
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
					{/* <Controller
						name="network"
						control={control}
						render={({ field }) => (
							<Select
								{...field}
								placeholder={translate('pleaseSelect')}
								size="sm"
								onChange={editedNetwork =>
									setEditedInfo(prevState => ({
										...prevState,
										network: {
											label: editedNetwork!.label,
											value: editedNetwork!.value,
											icon: editedNetwork!.icon,
										},
									}))
								}
								chakraStyles={{
									placeholder: base => ({
										...base,
										color: 'blackAlpha.500',
										fontSize: 'sm',
									}),
									control: group => ({
										...group,
										bg: 'white',
										borderRadius: 'base',
										minWidth: '48',
										borderColor: errors.network ? 'red' : theme.bg.primary,
										cursor: 'pointer',
										_hover: {},
									}),
									menuList: group => ({
										...group,
										bg: 'white',
										borderColor: '#121212',
										borderRadius: 'base',
									}),
									option: (item, state) => ({
										...item,
										bg: state.isSelected ? 'gray.50' : 'none',
									}),
								}}
								options={networksType}
								defaultValue={networksType[indexOfCompanyNetwork]}
								isDisabled={!session}
								// eslint-disable-next-line react/no-unstable-nested-components
								formatOptionLabel={network => (
									<Flex gap="2" align="center">
										<Img src={network.icon} boxSize="5" />
										<Text>{network.label}</Text>
									</Flex>
								)}
							/>
						)}
					/> */}
					<Menu>
						<MenuButton
							// defaultValue={networksType[indexOfCompanyNetwork]}
							defaultValue="dasds"
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
							<Flex display={selectedNetwork.icon.length > 1 ? 'none' : 'flex'}>
								{selectedNetwork.name}
							</Flex>
							<Flex
								align="center"
								gap="2"
								display={selectedNetwork.icon.length > 1 ? 'flex' : 'none'}
							>
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
									_hover={{ bg: 'gray.50' }}
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
