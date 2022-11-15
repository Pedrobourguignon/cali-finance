import {
	Button,
	Flex,
	FormControl,
	Input,
	Select,
	Text,
	Textarea,
	TextProps,
} from '@chakra-ui/react';
import { NewOrganizationLinks, NavigationBack } from 'components';
import { usePicasso } from 'hooks';
import { AppLayout } from 'layouts';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { createOrganizationSchema, navigationPaths } from 'utils';

interface ICreateOrganization {
	name: string;
	type: string;
	email: string;
	description?: string;
}

const organizationsType = ['DAO', 'financial', 'e-commerce'];

const labelStyle: TextProps = {
	color: 'black',
	fontSize: 'sm',
	fontWeight: 'medium',
};

export const CreateOrganization = () => {
	const theme = usePicasso();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ICreateOrganization>({
		resolver: yupResolver(createOrganizationSchema),
	});

	const handleCreateOrganization = (organizationData: ICreateOrganization) => {
		console.log(organizationData);
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
					<form onSubmit={handleSubmit(handleCreateOrganization)}>
						<FormControl>
							<Flex direction="column" gap="6" mb="14" position="relative">
								<Text color="black" fontSize="xl" fontWeight="medium">
									Create Organization
								</Text>
								<Input
									color="black"
									placeholder="Organization Name *"
									borderBottomWidth="0,125rem"
									borderBottomColor="black"
									borderRadius="none"
									px="1"
									fontSize="2xl"
									_placeholder={{ color: 'blackAlpha.500', fontSize: '2xl' }}
									_hover={{}}
									{...register('name')}
								/>
								<Text fontSize="xs" color="red" position="absolute" top="100%">
									{errors.name?.message}
								</Text>
							</Flex>
							<Flex py="6" w="100%">
								<Flex direction="column" gap="8" minW="80">
									<Flex direction="column" color="black" gap="6">
										<Flex direction="column">
											<Text {...labelStyle}>Type *</Text>
											<Select
												borderColor={theme.bg.primary}
												color="blackAlpha.500"
												bgColor="white"
												_hover={{}}
												{...register('type')}
											>
												<option
													selected
													disabled
													style={{
														background: 'white',
													}}
												>
													Please select an organization type
												</option>
												{organizationsType.map((item, index) => (
													<option
														key={+index}
														style={{
															background: 'white',
															color: 'black',
														}}
													>
														{item}
													</option>
												))}
											</Select>
											<Text fontSize="xs" color="red">
												{errors.type?.message}
											</Text>
										</Flex>
										<Flex direction="column" position="relative">
											<Text {...labelStyle}>Corporative e-mail *</Text>
											<Input
												placeholder="example@organization.io"
												_placeholder={{ color: 'blackAlpha.500' }}
												bgColor="white"
												_hover={{}}
												borderColor={theme.bg.primary}
												{...register('email')}
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
											<Textarea
												borderColor={theme.bg.primary}
												_placeholder={{ color: 'blackAlpha.500' }}
												_hover={{}}
												bgColor="white"
												placeholder="Hello Org is an organization that..."
												minH="110"
												{...register('description')}
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
										<Text>Create Organization</Text>
									</Button>
								</Flex>
							</Flex>
						</FormControl>
					</form>
				</Flex>
			</Flex>
		</AppLayout>
	);
};
