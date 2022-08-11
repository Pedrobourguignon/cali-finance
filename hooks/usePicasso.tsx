import { useColorModeValue } from '@chakra-ui/react'
import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs'

const usePicasso = () => {
	const theme = {
		text: {
			mono: useColorModeValue('black', 'white'),
			gray: useColorModeValue('#9B93AB', '#9B93AB'),
			green: useColorModeValue('#9B93AB', '#2ECC71'),
			red: useColorModeValue('#9B93AB', '#E17055'),
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
			blue: '0px 0px 9px #1A94E1;',
			red: '0px 0px 10px rgba(232, 49, 81, 0.5)',
		},
		bg: {
			primary: useColorModeValue('blackAlpha.50', '#282729'),
			secondary: useColorModeValue('gray.300', '#100F12'),
			container: useColorModeValue('gray.700', '#282729'),
			gradient:
				'linear-gradient(112.87deg, rgba(26, 29, 225, 0.1) 0%, rgba(16, 15, 18, 0.1) 32.29%, rgba(16, 15, 18, 0.1) 66.15%, rgba(2, 228, 209, 0.1) 100%);',
		},
	}

	return theme
}

export { usePicasso }
