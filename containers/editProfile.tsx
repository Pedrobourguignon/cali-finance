import { EditProfileComponent } from 'components';
import { ProfileProvider, TeamsProvider } from 'contexts';
import { EditProfileLayout } from 'layouts';
import React from 'react';

export const EditProfileContainer = () => (
	<ProfileProvider>
		<TeamsProvider>
			<EditProfileLayout>
				<EditProfileComponent />
			</EditProfileLayout>
		</TeamsProvider>
	</ProfileProvider>
);

export default EditProfileContainer;
