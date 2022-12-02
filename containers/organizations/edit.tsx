import {
	Button,
	Flex,
	FormControl,
	Img,
	Input,
	Text,
	Textarea,
	TextProps,
} from '@chakra-ui/react';
import { NewOrganizationLinks, NavigationBack } from 'components';
import { usePicasso } from 'hooks';
import { AppLayout } from 'layouts';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { editOrganizationSchema, navigationPaths } from 'utils';
import { Select } from 'chakra-react-select';

interface IEditOrganization {
	name: string;
	type: { label: string; value: string };
	email: string;
	network: { label: string; value: string; icon: string };
	description?: string;
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

const organizationsType: IBasicSelect[] = [
	{ value: 'DAO', label: 'DAO' },
	{ value: 'financial', label: 'financial' },
	{ value: 'e-commerce', label: 'e-commerce' },
];

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

export const EditOrganization: React.FC<IEditOrganization> = ({
	name,
	type,
	email,
	network: actualNetwork,
	description,
}) => {
	const theme = usePicasso();
	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<IEditOrganization>({
		resolver: yupResolver(editOrganizationSchema),
	});

	const handleEditOrganization = (
		editedOrganizationData: IEditOrganization
	) => {
		console.log(editedOrganizationData);
	};

	return (
		<AppLayout right={<NewOrganizationLinks />}>
			<Flex w="100%" bg="white" h="64" position="absolute" />
			<Flex
				direction="column"
				align="flex-start"
				gap="10"
				zIndex="docked"
				pt="6"
			>
				<NavigationBack href={navigationPaths.dashboard.organizations.home}>
					Back to Organizations
				</NavigationBack>
				<Flex w="100%" direction="column" px="6">
					<form onSubmit={handleSubmit(handleEditOrganization)}>
						<FormControl>
							<Flex direction="column" gap="6" mb="14" position="relative">
								<Text color="black" fontSize="xl" fontWeight="medium">
									Edit Organization Information
								</Text>
								<Controller
									render={({ field }) => (
										<Input
											{...field}
											color="black"
											value={name}
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
											<Text {...labelStyle}>Type *</Text>
											<Controller
												name="type"
												control={control}
												render={({ field }) => (
													<Select
														{...field}
														chakraStyles={{
															control: group => ({
																...group,
																bg: 'white',
																minWidth: '48',
																borderColor: '#121212',
															}),
															menuList: group => ({
																...group,
																bg: 'white',
																borderColor: '#121212',
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
											<Text {...labelStyle}>Corporative e-mail *</Text>
											<Controller
												render={({ field }) => (
													<Input
														{...field}
														value={email}
														placeholder="example@organization.io"
														_placeholder={{ color: 'blackAlpha.500' }}
														bgColor="white"
														_hover={{}}
														borderColor={theme.bg.primary}
													/>
												)}
												name="email"
												control={control}
											/>
											<Text
												fontSize="xs"
												color="red"
												position="absolute"
												top="100%"
											>
												{errors.email?.message}
											</Text>
										</Flex>
										<Flex direction="column">
											<Text {...labelStyle}>Description</Text>
											<Controller
												render={({ field }) => (
													<Textarea
														{...field}
														value={description}
														borderColor={theme.bg.primary}
														_placeholder={{ color: 'blackAlpha.500' }}
														_hover={{}}
														bgColor="white"
														placeholder="Hello Org is an organization that..."
														minH="110"
													/>
												)}
												name="description"
												control={control}
											/>
										</Flex>
									</Flex>
									<Button
										// disabled
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
										<Text>Save Changes</Text>
									</Button>
								</Flex>
								<Flex direction="column" minW="44" color={theme.text.primary}>
									<Text {...labelStyle}>Network *</Text>
									<Controller
										name="network"
										control={control}
										render={({ field }) => (
											<Select
												{...field}
												value={actualNetwork}
												chakraStyles={{
													control: group => ({
														...group,
														bg: 'white',
														minWidth: '48',
														borderColor: '#121212',
													}),
													menuList: group => ({
														...group,
														bg: 'white',
														borderColor: '#121212',
													}),
												}}
												placeholder="select"
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
						</FormControl>
					</form>
				</Flex>
			</Flex>
		</AppLayout>
	);
};
