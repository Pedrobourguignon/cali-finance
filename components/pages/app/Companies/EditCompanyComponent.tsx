import {
	Flex,
	Icon,
	Img,
	Input,
	Text,
	Textarea,
	TextProps,
	Tooltip,
} from '@chakra-ui/react';
import { useCompanies, usePicasso } from 'hooks';
import { Control, FieldErrorsImpl, Controller } from 'react-hook-form';
import { ICreateCompany, ICompanyTest } from 'types';
import { Select } from 'chakra-react-select';
import { BsQuestionCircle } from 'react-icons/bs';
import useTranslation from 'next-translate/useTranslation';
import { useEffect } from 'react';
import { BlackButton, NetworkTooltip } from 'components';
import { useSession } from 'next-auth/react';

interface IEditCompanyComponent {
	control: Control<ICreateCompany>;
	errors: Partial<
		FieldErrorsImpl<{
			name: string;
			type: {
				label: string;
				value: string;
			};
			email: string;
			network: {
				label: string;
				value: string;
				icon: string;
			};
			description: string;
			logo: string;
			socialMedias: {
				website: string;
				instagram: string;
				twitter: string;
				telegram: string;
				medium: string;
			};
		}>
	>;
	company: ICompanyTest;
}

interface INetworkSelect {
	value: string;
	label: string;
	icon: string;
}

interface IBasicSelect {
	value: string;
	label: string;
}

const networksType: INetworkSelect[] = [
	{ value: 'Ethereum', label: 'Ethereum', icon: '/images/eth.png' },
	{ value: 'Polygon', label: 'Polygon', icon: '/images/polygon.png' },
	{ value: 'BNB Chain', label: 'BNB Chain', icon: '/images/bnbchain.png' },
];

const labelStyle: TextProps = {
	color: 'black',
	fontSize: 'sm',
	fontWeight: 'medium',
};

export const EditCompanyComponent: React.FC<IEditCompanyComponent> = ({
	errors,
	control,
	company,
}) => {
	const {
		name,
		email,
		description,
		type,
		selectedNetwork,
		picture,
		socialMedias,
	} = company;
	const theme = usePicasso();
	const { t: translate } = useTranslation('create-company');
	const { setEditedInfo, editedInfo, selectedCompany } = useCompanies();
	const { data: session } = useSession();

	useEffect(() => {
		setEditedInfo({
			name,
			email,

			picture,
			description,
			type,
			selectedNetwork,
			socialMedias,
		});
	}, []);

	const companiesType: IBasicSelect[] = [
		{ value: 'DAO', label: 'DAO' },
		{ value: translate('financial'), label: translate('financial') },
		{ value: 'e-commerce', label: 'e-commerce' },
	];

	const indexOfCompanyType = companiesType.findIndex(
		index => index.value === type
	);
	const indexOfCompanyNetwork = networksType.findIndex(
		index => index.value === selectedNetwork
	);

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
				<Controller
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
								<Controller
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
								/>
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

								<Controller
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
								/>
								<Text fontSize="xs" color="red">
									{errors.type?.message}
								</Text>
							</Flex>
						</Flex>
						<Flex direction="column" position="relative">
							<Text {...labelStyle} mb="2">
								{translate('corporativeEmail')}
							</Text>
							<Controller
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
							/>
							<Text fontSize="xs" color="red" position="absolute" top="100%">
								{errors.email?.message}
							</Text>
						</Flex>
						<Flex direction="column">
							<Text {...labelStyle} mb="2">
								{translate('description')}
							</Text>
							<Controller
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
						disabled={
							(editedInfo.picture === selectedCompany.picture &&
								editedInfo.name === name &&
								editedInfo.email === email &&
								editedInfo.description === description &&
								editedInfo.type === type &&
								editedInfo.selectedNetwork === selectedNetwork) ||
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
					<Controller
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
					/>
					<Text fontSize="xs" color="red">
						{errors.type?.message}
					</Text>
				</Flex>
			</Flex>
		</Flex>
	);
};

export default EditCompanyComponent;
