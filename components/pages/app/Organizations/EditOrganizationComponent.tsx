import {
	Button,
	Flex,
	Icon,
	Img,
	Input,
	Text,
	Textarea,
	TextProps,
} from '@chakra-ui/react';
import { useOrganizations, usePicasso } from 'hooks';
import { Control, FieldErrorsImpl, Controller } from 'react-hook-form';
import { ICreateOrganization, IEditOrganization, IOrganization } from 'types';
import { Select } from 'chakra-react-select';
import { BsQuestionCircle } from 'react-icons/bs';
import { useState } from 'react';
import { EditOrganizationLink } from 'components';
import useTranslation from 'next-translate/useTranslation';

interface IEditOrganizationComponent {
	control: Control<ICreateOrganization>;
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
	organization: IOrganization;
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

export const EditOrganizationComponent: React.FC<
	IEditOrganizationComponent
> = ({ errors, control, organization }) => {
	const { name, email, description, type, selectedNetwork, logo } =
		organization;
	const theme = usePicasso();
	const { t: translate } = useTranslation('create-organization');
	const { selectedOrganizationLogo } = useOrganizations();
	const [editedInfo, setEditedInfo] = useState<IEditOrganization>({
		name,
		email,
		logo,
		description,
		type: {
			label: type,
			value: type,
		},
		network: {
			label: selectedNetwork,
			value: selectedNetwork,
		},
	} as IEditOrganization);

	const organizationsType: IBasicSelect[] = [
		{ value: 'DAO', label: 'DAO' },
		{ value: translate('financial'), label: translate('financial') },
		{ value: 'e-commerce', label: 'e-commerce' },
	];

	const indexOfOrganizationType = organizationsType.findIndex(
		index => index.value === type
	);
	const indexOfOrganizationNetwork = networksType.findIndex(
		index => index.value === selectedNetwork
	);

	return (
		<Flex direction="column" minW="24.2rem">
			<Flex
				direction="column"
				gap={{ md: '2', lg: '6' }}
				mb={{ md: '8', lg: '14' }}
				position="relative"
			>
				<Text
					color="black"
					fontSize={{ md: 'md', lg: 'xl' }}
					fontWeight="medium"
				>
					{translate('editOrganization')}
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
							px="1"
							fontSize={{ md: 'xl', xl: '2xl' }}
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
											onChange={editedType =>
												setEditedInfo(prevState => ({
													...prevState,
													type: {
														label: editedType!.label,
														value: editedType!.value,
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
													minWidth: '48',
													borderColor: '#121212',
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
											options={organizationsType}
											defaultValue={organizationsType[indexOfOrganizationType]}
										/>
									)}
								/>
								<Text fontSize="xs" color="red">
									{errors.type?.message}
								</Text>
							</Flex>
							<Flex
								direction="column"
								w="100%"
								color={theme.text.primary}
								display={{ md: 'flex', lg: 'none' }}
							>
								<Flex gap="2" mb="2">
									<Text {...labelStyle}>Network *</Text>
									<Icon as={BsQuestionCircle} color="gray.400" />
								</Flex>
								<Controller
									name="network"
									control={control}
									render={({ field }) => (
										<Select
											{...field}
											placeholder="Please select"
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
													minWidth: '48',
													borderColor: '#121212',
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
											defaultValue={networksType[indexOfOrganizationNetwork]}
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
										bgColor="white"
										_hover={{}}
										borderColor={theme.bg.primary}
										defaultValue={email}
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
					<EditOrganizationLink
						control={control}
						display={{ md: 'flex', lg: 'none' }}
					/>
					<Button
						type="submit"
						bg={theme.bg.primary}
						color="white"
						borderRadius="sm"
						_hover={{ opacity: '80%' }}
						_active={{}}
						_focus={{}}
						gap="2.5"
						fontWeight="medium"
						fontSize="md"
						lineHeight="6"
						disabled={
							editedInfo.logo === selectedOrganizationLogo &&
							editedInfo.name === name &&
							editedInfo.email === email &&
							editedInfo.description === description &&
							editedInfo.type.value === type &&
							editedInfo.network.value === selectedNetwork
						}
					>
						<Text>{translate('saveChanges')}</Text>
					</Button>
				</Flex>
				<Flex
					direction="column"
					maxW="48"
					color={theme.text.primary}
					display={{ md: 'none', lg: 'flex' }}
				>
					<Flex gap="2" mb="2">
						<Text {...labelStyle}>{translate('network')}</Text>
						<Icon as={BsQuestionCircle} color="gray.400" />
					</Flex>
					<Controller
						name="network"
						control={control}
						render={({ field }) => (
							<Select
								{...field}
								placeholder={translate('pleaseSelect')}
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
										minWidth: '48',
										borderColor: '#121212',
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
								defaultValue={networksType[indexOfOrganizationNetwork]}
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

export default EditOrganizationComponent;
