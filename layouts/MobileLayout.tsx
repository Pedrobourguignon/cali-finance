import { Flex } from '@chakra-ui/react';
import { MenuMobile, MobileHeader } from 'components';
import { ProfileProvider } from 'contexts';
import { usePicasso } from 'hooks';
import React from 'react';

interface IMobileLayout {
	children?: JSX.Element | JSX.Element[];
}

export const MobileLayout: React.FC<IMobileLayout> = ({ children }) => {
	const theme = usePicasso();
	return (
		<ProfileProvider>
			<Flex
				bg={theme.text.primary}
				direction="column"
				display={{ base: 'flex', sm: 'none' }}
			>
				<MobileHeader />
				<Flex
					w="full"
					h="100%"
					bg={theme.bg.gray2}
					borderTopRadius="3xl"
					px="4"
					pt="4"
					direction="column"
				>
					{children}
				</Flex>
				<MenuMobile />
			</Flex>
		</ProfileProvider>
	);
};

export default MobileLayout;
