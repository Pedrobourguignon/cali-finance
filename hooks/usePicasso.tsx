import { useColorModeValue } from '@chakra-ui/react';
import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs';

const usePicasso = () => {
	const theme = {
		text: {
			mono: useColorModeValue('black', 'black'),
			gray: useColorModeValue('#9B93AB', '#9B93AB'),
			green: useColorModeValue('#9B93AB', '#2ECC71'),
			red: useColorModeValue('#9B93AB', '#E17055'),
			black: useColorModeValue('#010D0C', '#010D0C'),
		},
		branding: {
			blue: '#1A94E1',
			cyan: '#02E4D1',
			red: '#E83151',
			royal: '#0B132B',
		},
		icon: {
			theme: useColorModeValue(BsFillMoonFill, BsFillSunFill),
		},
		shadow: {
			gray: '2px 2px 4px rgba(255, 255, 255, 0.1);',
			blue: '0px 0px 4px #1A94E1;',
			red: '0px 0px 10px rgba(232, 49, 81, 0.5)',
		},
		bg: {
			primary: '#121212',
			secondary: useColorModeValue('gray.200', '#100F12'),
			card: useColorModeValue('gray.100', '#333333'),
			gray: '#6C657A',
			black: '#191919',
			modal: useColorModeValue('white', 'white'),
			gradient:
				'linear-gradient(180.04deg, #FFFFFF 29.33%, rgba(255, 255, 255, 0) 150.28%);',
		},
	};

	return theme;
};

export { usePicasso };
