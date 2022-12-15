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

export const EditOrganization = () => {
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
	const { organizations } = useOrganizations();

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
						<NavigationBack href={navigationPaths.dashboard.organizations.home}>
							Back to Organizations
						</NavigationBack>
						<EditOrganizationComponent
							errors={errors}
							control={control}
							name={organizations[0].name}
							type={organizations[0].type}
							email={organizations[0].email}
							selectedNetwork={organizations[0].selectedNetwork}
							description={organizations[0].description}
							socialMedia={organizations[0].socialMedia[0]}
						/>
					</Flex>
				</AppLayout>
			</FormControl>
		</form>
	);
};
