import { useColorModeValue } from '@chakra-ui/react';
import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs';

const usePicasso = () => {
	const theme = {
		text: {
			white: useColorModeValue('#FFFFFF', '#FFFFFF'),
			mono: useColorModeValue('black', 'black'),
			gray: useColorModeValue('#718096', '#718096'),
			green: useColorModeValue('#9B93AB', '#2ECC71'),
			red: useColorModeValue('#9B93AB', '#E17055'),
			black: useColorModeValue('#010D0C', '#010D0C'),
			black3: '#0F0F0F',
			primary: '#121212',
			black2: useColorModeValue('#1A202C', '#1A202C'),
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
			white2: '#F7FAFC',
			primary: '#121212',
			secondary: useColorModeValue('gray.200', '#100F12'),
			card: useColorModeValue('gray.100', '#333333'),
			gray: '#6C657A',
			gray2: '#EDF2F7',
			black: '#191919',
			modal: useColorModeValue('white', 'white'),
			gradient:
				'linear-gradient(178.33deg, #FFFFFF 19.26%, rgba(255, 255, 255, 0) 142.45%);',
			select: '#191919',
			dashboard: '#EDF2F7',
		},
	};

	return theme;
};

export { usePicasso };
