import { Flex, FormControl } from '@chakra-ui/react';
import {
	NavigationBack,
	ActiveTeamsBar,
	OrganizationsHeader,
	CreateTeamComponent,
} from 'components';
import { AppLayout } from 'layouts';
import { createOrganizationSchema, navigationPaths } from 'utils';
import { ICreateOrganization } from 'types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { OrganizationsProvider } from 'contexts';

export const CreateTeamsContainer = () => {
	const {
		handleSubmit,
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
					<AppLayout right={<ActiveTeamsBar />}>
						<Flex w="100%" bg="white" h="64" position="absolute" />
						<Flex
							direction="column"
							align="flex-start"
							gap="10"
							zIndex="docked"
							w="100%"
						>
							<Flex direction="column" w="full" align="start" pt="4">
								<OrganizationsHeader />
							</Flex>

							<Flex direction="column" w="full" pl="6">
								<CreateTeamComponent />
							</Flex>
						</Flex>
					</AppLayout>
				</FormControl>
			</form>
		</OrganizationsProvider>
	);
};
