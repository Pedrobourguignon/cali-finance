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
import { useCompanies, usePicasso, useProfile } from 'hooks';
import { Control, FieldErrorsImpl, Controller } from 'react-hook-form';
import { Select } from 'chakra-react-select';
import { BsQuestionCircle } from 'react-icons/bs';
import { ICreateCompany, ISocialMedia } from 'types';
import useTranslation from 'next-translate/useTranslation';
import { BlackButton, NetworkTooltip } from 'components';
import { useSession } from 'next-auth/react';
import { useMutation } from 'react-query';
import { IPostCompany } from 'types/interfaces/main-server/ICompany';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { BiGame } from 'react-icons/bi';

export interface ICompany {
	id?: number;
	wallet?: string;
	name?: string;
	contactEmail?: string;
	isPublic?: boolean;
	color?: string;
	logo?: string;
	createdAt?: Date;
	updatedAt?: Date;
	socialMedia?: ISocialMedia[];
}

interface ICreateCompanyComponent {
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

export const CreateCompanyComponent: React.FC<ICreateCompanyComponent> = ({
	errors,
	control,
}) => {
	const theme = usePicasso();
	const { t: translate } = useTranslation('create-company');
	const { data: session } = useSession();
	const { createCompany } = useCompanies();
	const [selectedType, setSelectedType] = useState<string>(
		translate('pleaseSelect')
	);
	const [selectedNetwork, setSelectedNetwork] = useState({
		name: translate('pleaseSelect'),
		icon: '',
	});

	const companiesType: IBasicSelect[] = [
		{ value: 'DAO', label: 'DAO' },
		{ value: translate('financial'), label: translate('financial') },
		{ value: 'e-commerce', label: 'e-commerce' },
	];

	const company: IPostCompany = {
		name: 'Fodase Company',
		email: 'company22@email.com',
		isPublic: true,
		color: '#aaaaaa',
		logo: 'no-logo.png',
		description: 'We are trozorba company',
		network: 1,
		type: 'dao',
		socialMedias: {
			website: 'teste.com',
			instagram: 'company/insta',
			twitter: 'company/twitter',
			telegram: 'company/telegram',
			medium: 'company/medium',
		},
	};

	const { mutate } = useMutation(() => createCompany(company), {
		onSuccess: () => console.log(company),
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
					{translate('createCompany')}
				</Text>
				{/* <Controller
					render={({ field }) => (
						<Input
							{...field}
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
						/>
					)}
					name="name"
					control={control}
				/> */}
				<Text fontSize="xs" color="red" position="absolute" top="100%">
					{errors.name?.message}
				</Text>
			</Flex>
			<Flex py="10" justify="space-between">
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
									Type *
								</Text>
								{/* <Controller
									name="type"
									control={control}
									render={({ field }) => (
										<Select
											{...field}
											placeholder={translate('pleaseSelect')}
											size="sm"
											isDisabled={!session}
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
													_hover: {},
													borderRadius: 'base',
													borderColor: errors.type ? 'red' : theme.bg.primary,
													cursor: 'pointer',
												}),
												menuList: group => ({
													...group,
													bg: 'white',
													boxShadow: 'none',
													borderColor: '#121212',
													borderRadius: 'base',
												}),
												option: (item, state) => ({
													...item,
													bg: state.isFocused ? 'gray.50' : 'none',
												}),
											}}
											options={companiesType}
										/>
									)}
								/> */}
								<Menu>
									<MenuButton
										w={{ md: 'full', lg: '20rem' }}
										border="1px solid black"
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
											selectedType === translate('pleaseSelect')
												? 'blackAlpha.500'
												: theme.text.primary
										}
									>
										<Flex>{selectedType}</Flex>
									</MenuButton>
									<MenuList
										bg="white"
										boxShadow="none"
										borderColor="#121212"
										borderRadius="base"
										w={{ md: 'inherit', lg: '20rem' }}
									>
										{companiesType.map((type, index) => (
											<MenuItem
												key={+index}
												bg="transparent"
												fontSize="sm"
												_hover={{ bg: 'gray.50' }}
												onClick={() => setSelectedType(type.value)}
											>
												{type.value}
											</MenuItem>
										))}
									</MenuList>
								</Menu>
								<Text fontSize="xs" color="red">
									{errors.type?.message}
								</Text>
							</Flex>
							<Flex
								direction="column"
								color={theme.text.primary}
								w="100%"
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
											<Icon
												as={BsQuestionCircle}
												color="gray.400"
												boxSize="0.813rem"
												mt="2"
											/>
										</span>
									</Tooltip>
								</Flex>
								{/* <Controller
									name="network"
									control={control}
									render={({ field }) => (
										<Select
											{...field}
											placeholder="Please select "
											size="sm"
											isDisabled={!session}
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
													borderColor: errors.network
														? 'red'
														: theme.bg.primary,
													cursor: 'pointer',
												}),
												menuList: group => ({
													...group,
													boxShadow: 'none',
													bg: 'white',
													borderColor: '#121212',
													borderRadius: 'base',
												}),
												option: (item, state) => ({
													...item,
													bg: state.isFocused ? 'gray.50' : 'none',
												}),
											}}
											options={networksType}
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
										w="120px"
									>
										{networksType.map((network, index) => (
											<MenuItem
												key={+index}
												bg="transparent"
												fontSize="sm"
												_hover={{ bg: 'gray.50' }}
												onClick={() =>
													setSelectedNetwork({
														name: network.value,
														icon: network.icon,
													})
												}
												gap="2"
											>
												<Img src={network.icon} boxSize="4" />
												{network.value}
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
										borderColor={errors.email ? 'red' : theme.bg.primary}
									/>
								)}
								name="email"
								control={control}
							/> */}
							<Text fontSize="xs" color="red" position="absolute" top="100%">
								{errors.email?.message}
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
										disabled={!session}
										borderColor={theme.bg.primary}
										_placeholder={{
											color: 'blackAlpha.500',
											fontSize: 'sm',
										}}
										_hover={{}}
										bgColor="white"
										placeholder={translate('exampleDescription')}
										minH="7.2rem"
									/>
								)}
								name="description"
								control={control}
							/> */}
						</Flex>
					</Flex>
					<BlackButton
						type="submit"
						gap="2.5"
						disabled={!session}
						fontWeight="medium"
						fontSize="md"
						lineHeight="6"
						display={{ md: 'none', lg: 'flex' }}
						py="2.5"
						borderRadius="sm"
						onClick={() => mutate()}
					>
						<Text>+</Text>
						<Text>{translate('createCompany')}</Text>
					</BlackButton>
				</Flex>
				<Flex
					direction="column"
					color={theme.text.primary}
					display={{ md: 'none', lg: 'flex' }}
					maxW="48"
				>
					<Flex gap="2" align="center">
						<Text {...labelStyle} mb="2">
							{translate('network')}
						</Text>
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
								<Icon
									as={BsQuestionCircle}
									color="gray.400"
									boxSize="0.813rem"
									mb="1"
								/>
							</span>
						</Tooltip>
					</Flex>
					{/* <Controller
						name="network"
						control={control}
						render={({ field }) => (
							<Select
								{...field}
								isDisabled={!session}
								placeholder={translate('pleaseSelect')}
								size="sm"
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
										borderColor: errors.network ? 'red' : theme.bg.primary,
										cursor: 'pointer',
										_hover: {},
									}),
									menuList: group => ({
										...group,
										bg: 'white',
										boxShadow: 'none',
										borderColor: '#121212',
										borderRadius: 'base',
									}),
									option: (item, state) => ({
										...item,
										bg: state.isFocused ? 'gray.50' : 'none',
									}),
								}}
								options={networksType}
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
							w="11.438rem"
							border="1px solid black"
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
							w="120px"
						>
							{networksType.map((network, index) => (
								<MenuItem
									key={+index}
									bg="transparent"
									fontSize="sm"
									_hover={{ bg: 'gray.50' }}
									onClick={() =>
										setSelectedNetwork({
											name: network.value,
											icon: network.icon,
										})
									}
									gap="2"
								>
									<Img src={network.icon} boxSize="4" />
									{network.value}
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
