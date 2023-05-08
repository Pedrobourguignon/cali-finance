import { Flex } from '@chakra-ui/react';
import { BottomMenuMobile, MobileHeader } from 'components';
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
				w="full"
				bg={theme.text.primary}
				direction="column"
				display={{ base: 'flex', sm: 'none' }}
			>
				<MobileHeader />
				<Flex
					minH="100vh"
					w="full"
					bg={theme.bg.gray2}
					borderTopRadius="3xl"
					px="4"
					pt="4"
					direction="column"
				>
					{children}
				</Flex>
				<Flex>
					<Flex w="full" position="fixed" bottom="0" pt="10">
						<BottomMenuMobile />
					</Flex>
				</Flex>
			</Flex>
		</ProfileProvider>
	);
};

export default MobileLayout;