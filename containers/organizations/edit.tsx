import { Flex, FormControl } from '@chakra-ui/react';
import {
	NavigationBack,
	EditOrganizationComponent,
	EditOrganizationLink,
} from 'components';
import { AppLayout, OrganizationWhiteBackground } from 'layouts';
import { editOrganizationSchema, navigationPaths } from 'utils';
import { IEditOrganization } from 'types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useOrganizations } from 'hooks';
import useTranslation from 'next-translate/useTranslation';

export const EditOrganization = () => {
	const { t: translate } = useTranslation('create-organization');
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
	const { selectedOrganization } = useOrganizations();
	return (
		<form onSubmit={handleSubmit(handleEditOrganization)}>
			<FormControl>
				<AppLayout right={<EditOrganizationLink control={control} />}>
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
						<EditOrganizationComponent
							errors={errors}
							control={control}
							organization={selectedOrganization}
						/>
					</Flex>
				</AppLayout>
			</FormControl>
		</form>
	);
};
