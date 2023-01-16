import { EditProfileComponent } from 'components';
import { ProfileProvider, TeamsProvider } from 'contexts';
import { AppLayout } from 'layouts';
import React from 'react';

export const EditProfileContainer = () => (
	<ProfileProvider>
		<TeamsProvider>
			<AppLayout>
				<EditProfileComponent />
			</AppLayout>
		</TeamsProvider>
	</ProfileProvider>
);

export default EditProfileContainer;
