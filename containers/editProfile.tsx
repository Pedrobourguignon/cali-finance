import { Flex } from '@chakra-ui/react';
import { AlertsComponent, EditProfileComponent } from 'components';
import { ProfileProvider, TeamsProvider } from 'contexts';
import { EditProfileLayout, MobileLayout } from 'layouts';
import React from 'react';

export const EditProfileContainer = () => (
	<ProfileProvider>
		<TeamsProvider>
			<Flex display={{ base: 'none', sm: 'flex' }} direction="column">
				<EditProfileLayout>
					<EditProfileComponent />
				</EditProfileLayout>
			</Flex>
			<Flex display={{ base: 'flex', sm: 'none' }} bg="red">
				<MobileLayout>
					<EditProfileComponent />
				</MobileLayout>
			</Flex>
		</TeamsProvider>
	</ProfileProvider>
);

export default EditProfileContainer;
