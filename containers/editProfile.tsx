import { Flex } from '@chakra-ui/react';
import { EditProfileComponent } from 'components';
import { AuthProvider, CompaniesProvider, ProfileProvider } from 'contexts';
import { EditProfileLayout, MobileLayout } from 'layouts';
import React from 'react';

export const EditProfileContainer = () => (
	<ProfileProvider>
		<CompaniesProvider>
			<AuthProvider>
				<Flex display={{ base: 'none', md: 'flex' }} direction="column">
					<EditProfileLayout>
						<EditProfileComponent />
					</EditProfileLayout>
				</Flex>
				<Flex display={{ base: 'flex', md: 'none' }} bg="red">
					<MobileLayout>
						<EditProfileComponent />
					</MobileLayout>
				</Flex>
			</AuthProvider>
		</CompaniesProvider>
	</ProfileProvider>
);

export default EditProfileContainer;
