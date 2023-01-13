import { EditProfileComponent } from 'components';
import { ProfileProvider } from 'contexts';
import { AppLayout } from 'layouts';
import React from 'react';

export const EditProfileContainer = () => (
	<ProfileProvider>
		<AppLayout>
			<EditProfileComponent />
		</AppLayout>
	</ProfileProvider>
);

export default EditProfileContainer;
