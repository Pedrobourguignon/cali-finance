import { Flex, FormControl } from '@chakra-ui/react';
import {
	NewOrganizationLinks,
	NavigationBack,
	CreateOrganizationComponent,
} from 'components';
import { AppLayout, OrganizationWhiteBackground } from 'layouts';
import { createOrganizationSchema, navigationPaths } from 'utils';
import { ICreateOrganization } from 'types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { OrganizationsProvider } from 'contexts';

export const CreateOrganization = () => {
	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<ICreateOrganization>({
		resolver: yupResolver(createOrganizationSchema),
	});

	const handleCreateOrganization = (organizationData: ICreateOrganization) => {
		console.log(organizationData);
	};

	return (
		<OrganizationsProvider>
			<form onSubmit={handleSubmit(handleCreateOrganization)}>
				<FormControl>
					<AppLayout
						right={
							<NewOrganizationLinks
								control={control}
								display={{ md: 'none', lg: 'flex' }}
							/>
						}
					>
						<OrganizationWhiteBackground />
						<Flex
							direction="column"
							gap={{ md: '4', lg: '10' }}
							zIndex="docked"
							pt="6"
							w="100%"
						>
							<Flex w="100%">
								<NavigationBack
									href={navigationPaths.dashboard.organizations.home}
								>
									Back to Companies
								</NavigationBack>
							</Flex>
							<CreateOrganizationComponent errors={errors} control={control} />
						</Flex>
					</AppLayout>
				</FormControl>
			</form>
		</OrganizationsProvider>
	);
};
