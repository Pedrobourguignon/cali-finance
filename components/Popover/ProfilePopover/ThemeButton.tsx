import { Button, Icon, useColorMode } from '@chakra-ui/react';
import { usePicasso } from 'hooks';

export const ThemeButton = () => {
	const theme = usePicasso();
	const { toggleColorMode } = useColorMode();
	return (
		<Button
			bgColor="transparent"
			gap="4"
			onClick={toggleColorMode}
			fontWeight="400"
		>
			<Icon
				as={theme.icon.theme}
				p="2"
				w="max-content"
				h="max-content"
				bgColor={theme.bg.primary}
				borderRadius="full"
			/>
			Theme
		</Button>
	);
};
