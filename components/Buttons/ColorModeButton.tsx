import { Button, Icon, useColorMode } from '@chakra-ui/react';
import { usePicasso } from 'hooks/usePicasso';
import { BsSun } from 'react-icons/bs';
import { MdDarkMode } from 'react-icons/md';

export const ColorModeButton = () => {
	const theme = usePicasso();
	const { colorMode, toggleColorMode } = useColorMode();
	return (
		<Button
			onClick={toggleColorMode}
			borderRadius="30"
			boxSize="10"
			bg={theme.bg.container}
		>
			{colorMode === 'light' ? <Icon as={MdDarkMode} /> : <Icon as={BsSun} />}
		</Button>
	);
};

export default ColorModeButton;
