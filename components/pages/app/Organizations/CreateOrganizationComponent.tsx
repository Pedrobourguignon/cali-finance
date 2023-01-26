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
import { usePicasso } from 'hooks';
import { Control, FieldErrorsImpl, Controller } from 'react-hook-form';
import { Select } from 'chakra-react-select';
import { BsQuestionCircle } from 'react-icons/bs';
import { ICreateOrganization } from 'types';
import useTranslation from 'next-translate/useTranslation';

interface ICreateOrganizationComponent {
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

export const CreateOrganizationComponent: React.FC<
	ICreateOrganizationComponent
> = ({ errors, control }) => {
	const theme = usePicasso();
	const { t: translate } = useTranslation('create-organization');

	const organizationsType: IBasicSelect[] = [
		{ value: 'DAO', label: 'DAO' },
		{ value: translate('financial'), label: translate('financial') },
		{ value: 'e-commerce', label: 'e-commerce' },
	];

	return (
		<Flex w="100%" direction="column" px="6">
			<Flex direction="column" gap="6" mb="14" position="relative">
				<Text color="black" fontSize="xl" fontWeight="medium">
					{translate('createOrganization')}
				</Text>
				<Controller
					render={({ field }) => (
						<Input
							{...field}
							color="black"
							placeholder={translate('organizationName')}
							borderBottomWidth="0,125rem"
							borderBottomColor="black"
							borderRadius="none"
							px="1"
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
				/>
				<Text fontSize="xs" color="red" position="absolute" top="100%">
					{errors.name?.message}
				</Text>
			</Flex>
			<Flex
				py="6"
				w="100%"
				justify="space-between
            "
			>
				<Flex direction="column" gap="8" minW="80">
					<Flex direction="column" color="black" gap="6">
						<Flex direction="column">
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
									/>
								)}
							/>
							<Text fontSize="xs" color="red">
								{errors.type?.message}
							</Text>
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
										_hover={{}}
										bgColor="white"
										placeholder={translate('exampleDescription')}
										minH="110"
									/>
								)}
								name="description"
								control={control}
							/>
						</Flex>
					</Flex>
					<Button
						type="submit"
						bg={theme.bg.primary}
						color="white"
						borderRadius="sm"
						_hover={{}}
						gap="2.5"
						fontWeight="medium"
						fontSize="md"
						lineHeight="6"
					>
						<Text>+</Text>
						<Text>{translate('createOrganization')}</Text>
					</Button>
				</Flex>
				<Flex direction="column" minW="44" color={theme.text.primary}>
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
