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
import useTranslation from 'next-translate/useTranslation';

export const CreateOrganization = () => {
	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<ICreateOrganization>({
		resolver: yupResolver(createOrganizationSchema),
	});
	const { t: translate } = useTranslation('create-organization');

	const handleCreateOrganization = (organizationData: ICreateOrganization) => {
		console.log(organizationData);
	};

	return (
		<OrganizationsProvider>
			<form onSubmit={handleSubmit(handleCreateOrganization)}>
				<FormControl>
					<AppLayout right={<NewOrganizationLinks control={control} />}>
						<OrganizationWhiteBackground />
						<Flex
							direction="column"
							align="flex-start"
							gap="10"
							zIndex="docked"
							pt="6"
							w="100%"
						>
							<Flex px="5">
								<NavigationBack
									href={navigationPaths.dashboard.organizations.home}
								>
									{translate('backToOrganizations')}
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
